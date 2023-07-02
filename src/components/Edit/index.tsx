import React, { forwardRef, useCallback, useState, useImperativeHandle, useMemo } from 'react';
import { createEditor, Descendant, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';
import { Props } from './type';
import DefaultElement from './components/DefaultElement';
import Paragraph from './components/Paragraph';
import { useShiftDown } from '../../hooks';
import cx from 'classnames';
import './styles/index.less';

export const InitialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            {
                text: '',
            },
        ],
    },
];
/**
 * 后续拓展节点内容
 * @param props
 * @param ref
 * @returns
 */
const Edit = (props: Props, ref: any) => {
    const {
        initialValue = InitialValue,
        placeholder = '回复',
        usePlaceHolder,
        editableProps = {},
        clearOnBlur,
        onEnter,
        onBlur,
    } = props;
    const { readOnly } = editableProps;
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [value, setValue] = useState<Descendant[]>(initialValue);
    const [focused, setFocused] = useState(false);
    const hasShift = useShiftDown(false);
    useImperativeHandle(ref, () => ({
        editor,
    }));

    const renderElement = useCallback((props: RenderElementProps) => {
        const { element } = props;
        switch (element.type) {
            case 'paragraph':
                return <Paragraph {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    /**
     * removeNodes源码
     * slate/packages/slate/src/interfaces/transforms/general.ts
     * 删除是找到父节点删除当前的元素，如果想整个删除需要让数据结构变成一个二维数组，暂时不这么处理
     */
    const reset = () => {
        while (editor.children.length > 1) {
            editor.deleteBackward('block');
        }
        editor.deleteBackward('block');
    };

    /**
     * 空文本不允许执行onEnter
     * @returns 是否为空
     */
    const isEmpty = () => {
        return (
            editor.children.length === 1 &&
            Array.from(Node.texts(editor)).length === 1 &&
            Node.string(editor) === ''
        );
    };

    return (
        <div
            className={
                readOnly
                    ? ''
                    : cx(
                        'comment-edit',
                        focused ? 'comment-edit__focus' : 'comment-edit__blur'
                    )
            }
        >
            <Slate
                editor={editor}
                initialValue={value}
                onChange={(v) => {
                    setValue(v);
                }}
            >
                <Editable
                    {...editableProps}
                    renderElement={renderElement}
                    // 使用placeholder后会导致全选删除后中文输入有问题
                    {...(usePlaceHolder ? { placeholder } : {})}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !hasShift) {
                            event.preventDefault();
                            if (!isEmpty()) {
                                // TODO 失败后是否标红提醒
                                onEnter?.({
                                    value,
                                    success() {
                                        reset();
                                    },
                                });
                            }
                        }
                    }}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                        onBlur?.();
                        clearOnBlur && reset();
                    }}
                />
            </Slate>
        </div>
    );
};

export default forwardRef(Edit);