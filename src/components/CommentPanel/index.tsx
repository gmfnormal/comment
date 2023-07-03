import React, { useState, useRef, useEffect } from 'react';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import CommentItem from '../CommentItem';
import { Props, ReplyProps } from './type';
import cx from 'classnames';
import './styles/index.less';
import Edit from '../Edit';
import { Tooltip } from '@arco-design/web-react';
import ReplyIcon from '../../static/reply.svg';
import ReplyIconHover from '../../static/reply_hover.svg';
import { useHover } from 'ahooks';
import { ID_PREFIX } from '../../constants';
import { nanoid } from 'nanoid';

const Reply = (props: ReplyProps) => {
    const ref = useRef(null);
    const hover = useHover(ref);

    return (
        <div ref={ref}>
            {hover ? (
                <ReplyIconHover className="reply-list-action-reply" {...props} />
            ) : (
                <ReplyIcon className="reply-list-action-reply" {...props} />
            )}
        </div>
    );
};

export default (props: Props) => {
    const {
        quote,
        replyList,
        classNames,
        panelId = nanoid(),
        username,
        active,
        focus,
        onActive,
        onReply,
        onBlur,
        onClick,
    } = props;
    const ref = useRef(null);
    const hover = useHover(ref);
    const editRef = useRef(null);
    const [replyId, setReplyId] = useState<string>(replyList[0]?.id || '');
    const isSelect = active || focus;
    useEffect(() => {
        if (active) {
            ReactEditor.focus(editRef?.current?.editor);
            Transforms.select(editRef?.current?.editor, { offset: 0, path: [0, 0] });
        }
    }, [active]);
    return (
        <div
            className={cx(
                isSelect ? 'comment-panel comment-panel-active' : 'comment-panel',
                classNames
            )}
            id={`${ID_PREFIX}${panelId}_panel`}
            onClick={() => {
                onClick?.();
            }}
        >
            <div className="comment-panel__header">
                <div className="comment-panel__quote">
                    <span>{quote}</span>
                </div>
            </div>
            <div className="reply-list">
                {replyList.map((val) => {
                    const { username: item_username, content, created_at, id } = val;
                    return (
                        <CommentItem
                            content={content}
                            username={item_username}
                            date={created_at}
                            moreAction={
                                <Tooltip content="回复" position="top">
                                    <Reply
                                        className="reply-list-action-reply"
                                        onClick={() => {
                                            setReplyId(id);
                                            onActive?.(panelId);
                                        }}
                                    />
                                </Tooltip>
                            }
                        />
                    );
                })}
            </div>
            <div
                className={
                    active
                        ? 'comment-panel__placeholder__with__edit'
                        : 'comment-panel__placeholder'
                }
                ref={ref}
            >
                {hover && !active && (
                    <span
                        className="comment-panel__placeholder__text"
                        onClick={() => {
                            onActive?.(panelId);
                        }}
                    >
                        回复...
                    </span>
                )}
                <div
                    className={
                        active
                            ? 'comment-panel__placeholder__edit'
                            : 'comment-panel__placeholder__edit__hidden'
                    }
                    id={`${ID_PREFIX}${panelId}_edit`}
                >
                    <Edit
                        key={panelId}
                        ref={editRef}
                        onEnter={async ({ value, success, fail }) => {
                            try {
                                const res = await onReply?.({
                                    content: JSON.stringify(value),
                                    reply_id: replyId,
                                    username,
                                });
                                success?.(res);
                            } catch (e) {
                                fail?.(e);
                            }
                        }}
                        onBlur={() => {
                            onBlur?.();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};