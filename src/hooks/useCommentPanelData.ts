import { useCallback, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { commentList, commentReply } from '../service';
import { EStatus, ReplyItem } from '../types/CommentDTO';
import { UseCommentPanelListProps, ReplyType } from '../types/CommentVO';
import { getPanelData, getInsertPanelData, checkInitStatus } from '../utils/usePanel';
import { IReplyRequest } from '../service/type';
import { getDate } from '../utils/common';
import { nanoid } from 'nanoid';
export default (props: UseCommentPanelListProps) => {
    const { identifier, username } = props;
    const [activeId, setActiveId] = useState('');
    const [focusIds, setFocusIds] = useState<string[]>([]);
    const [data, setData] = useState<Record<string, ReplyItem[]>>();
    const [ready, setReady] = useState(false);
    const [success, setSuccess] = useState(false);
    const [positionList, setPositionList] = useState<string[]>([]);
    const [error, setError] = useState<any>();
    const getCommentList = useCallback(async () => {
        try {
            const res = await commentList({
                identifier,
            });
            const { code, msg, data: _data } = res;
            if (code === 0) {
                const { items } = _data;
                unstable_batchedUpdates(() => {
                    setData(getPanelData(items));
                    setSuccess(true);
                });
            } else {
                unstable_batchedUpdates(() => {
                    setSuccess(false);
                    setError(new Error(msg));
                });
            }
        } catch (e) {
            console.error(e);
            unstable_batchedUpdates(() => {
                setSuccess(false);
                setError(e);
            });
        } finally {
            setReady(true);
        }
    }, [identifier]);

    const replyComment = useCallback(
        async (params: Omit<IReplyRequest, 'identifier' | 'username'>, type: ReplyType) => {
            try {
                const res = await commentReply({
                    ...params,
                    identifier,
                    username,
                });
                const { code, msg, data: _data } = res;
                if (code === 0) {
                    const { id } = _data;
                    const newDataItem = {
                        ...params,
                        identifier,
                        username,
                        id,
                        created_at: getDate(),
                        updated_at: getDate(),
                    };
                    const newData = getInsertPanelData(newDataItem, data, type);
                    setData(newData);
                }
                return { code, msg };
            } catch (e) {
                console.error(e);
                return { code: -1, msg: e };
            }
        },
        [identifier, data, username]
    );

    // 新增评论临时内容
    const addComment = (position: string, quote: string) => {
        const newPanelId = nanoid();
        unstable_batchedUpdates(() => {
            setData({
                ...data,
                [newPanelId]: [
                    {
                        // 随机创建，最终请求成功后使用服务端返回的id
                        id: 'CreateTempId',
                        identifier,
                        username,
                        position,
                        panel_id: newPanelId,
                        reply_id: '',
                        email: '',
                        status: EStatus.Show,
                        content: '',
                        quote,
                        created_at: parseInt(`${new Date().valueOf() / 1000}`),
                        updated_at: parseInt(`${new Date().valueOf() / 1000}`),
                    },
                ],
            });
            setActiveId(newPanelId);
        });
    };

    const removeComment = (params: ReplyItem) => {
        const { id } = params;
        const newData = Object.keys(data).reduce((pre, cur) => {
            const newPanelData = data[cur]?.filter((val) => val.id !== id);
            if (newPanelData?.length > 0) {
                return { ...pre, [cur]: newPanelData };
            }
            return pre;
        }, {});
        setData(newData);
    };

    /**
     * 未提交内容失焦后删除
     */
    const cleanComment = () => {
        const newData = Object.keys(data).reduce((pre, cur) => {
            const curData = data[cur];
            if (!checkInitStatus(curData)) {
                return {
                    ...pre,
                    [cur]: data[cur],
                };
            }
            return pre;
        }, {});
        setData(newData);
    };

    // 如何处理成只init一次
    // 去重暂不需要，理论上不会出现重复position
    let positions = [];
    const initPositionList = (position) => {
        positions = [...positions, position];
        return ((positions) => {
            setPositionList(positions);
        })(positions);
    };

    useEffect(() => {
        if (identifier && username) {
            getCommentList();
        } else {
            unstable_batchedUpdates(() => {
                setReady(true);
                setError(new Error('identifier or username is empty'));
            });
        }
    }, []);

    useEffect(() => {
        setFocusIds([]);
    }, [activeId]);

    return [
        { ready, error, success },
        { activeId, data, positionList, focusIds },
        {
            setActiveId,
            setFocusIds,
            replyComment,
            addComment,
            removeComment,
            cleanComment,
            initPositionList,
        },
    ];
};