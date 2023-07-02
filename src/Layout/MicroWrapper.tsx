import React, { useState, ReactElement, useEffect, cloneElement } from 'react';
import { TCommentWrapperProps } from '../types/CommentVO';
import { ReplyItem } from '../types/CommentDTO';
import { Tooltip, Trigger } from '@arco-design/web-react';
import { CommentIcon } from '../static/Icon';
import { getPanelIdsPosition } from '../utils/usePanel';
import cx from 'classnames';
import './styles/commentWrapper.less';
import { ID_PREFIX } from '../constants';

const CommentWrapperTools = (props: Omit<TCommentWrapperProps, 'children'>): ReactElement => {
    const { quote, position, className = '' } = props;
    const { setDrawerOpen } = (window as any).__commentDrawerData;
    const { addComment } = (window as any).__commentPanelData;

    const handleReply = () => {
        addComment(position, quote);
        setDrawerOpen(true);
    };
    return (
        <div className={cx('comment-layout-container__area__wrapper__tools', className)}>
            <Tooltip content="评论">
                <CommentIcon
                    width={14}
                    height={14}
                    onClick={handleReply}
                    className="comment-layout-container__area__wrapper__tools__reply"
                />
            </Tooltip>
        </div>
    );
};

const CommentWrapper = ({ children, ...rest }: TCommentWrapperProps) => {
    if (!(window as any).__commentPanelData || !(window as any).__commentDrawerData) {
        return <>{children}</>;
    }
    const [data, setData] = useState<Record<string, ReplyItem[]>>();
    const [activeId, setActiveId] = useState('');
    const [focusIds, setFocusIds] = useState([]);
    const [selected, setSelected] = useState(false);
    const { initPositionList, watch } = (window as any).__commentPanelData;
    const { position } = rest;
    watch?.((v, name) => {
        switch (name) {
            case 'setData':
            case 'setReady':
                const { ready, data: _data } = v;
                if (ready && _data) {
                    setData(_data);
                }
            case 'setActiveId':
                setActiveId(v.activeId);
            case 'setFocusIds':
                setFocusIds(v.focusIds);
            default:
        }
    });
    useEffect(() => {
        initPositionList?.(position);
    }, []);

    useEffect(() => {
        const curPosition = getPanelIdsPosition(data, activeId, focusIds);
        if (curPosition === position) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [focusIds, activeId]);

    return (
        <Trigger
            popup={() => <CommentWrapperTools {...rest} />}
            trigger="hover"
            getPopupContainer={(node) => {
                return node.parentNode as Element;
            }}
            autoFitPosition={false}
            autoFixPosition={false}
            popupAlign={{
                right: [-45, 5],
            }}
            position="rt"
        >
            {cloneElement(children as ReactElement, {
                id: `${ID_PREFIX}wrapper-${position}`,
                className: cx(
                    'comment-wrapper',
                    (children as ReactElement).props.className,
                    selected ? 'comment-wrapper-selected' : ''
                ),
            })}
        </Trigger>
    );
};

export default CommentWrapper;