import React, { useContext, ReactElement, useEffect, useState, cloneElement } from 'react';
import { TCommentWrapperProps } from '../types/CommentVO';
import { Tooltip, Trigger } from '@arco-design/web-react';
import { CommentContext, DrawerContext } from './Context';
import { CommentIcon } from '../static/Icon';
import { getPanelIdsPosition } from '../utils/usePanel';
import { ID_PREFIX } from '../constants';
import cx from 'classnames';
import './styles/commentWrapper.less';
const CommentWrapperTools = (props: Omit<TCommentWrapperProps, 'children'>): ReactElement => {
    const { quote, position, className = '' } = props;
    const { setDrawerOpen } = useContext(DrawerContext);
    const { addComment } = useContext(CommentContext);
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
    const { initPositionList, data, focusIds, activeId } = useContext(CommentContext);
    const { position } = rest;
    const [selected, setSelected] = useState(false);
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