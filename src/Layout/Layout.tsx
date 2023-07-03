import React, { FC, useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Tooltip, Spin } from '@arco-design/web-react';
import { IconDoubleRight, IconClose } from '@arco-design/web-react/icon';
import { CommentContext, DrawerContext } from './Context';
import { CommentIcon } from '../static/Icon';
import CommentPanel from '../components/CommentPanel';
import { getSum, checkInitStatus, scrollScreen } from '../utils/usePanel';
import { LAYOUT_ID, DRAWER_ID, SCROLL_DRAWER_ID, SCROLL_AREA_ID } from '../constants';
import './styles/index.less';
import '../style/index.less';
import { EStatus } from '@/types/CommentDTO';
const CommentLayout: FC = ({ children }) => {
    const {
        ready,
        success,
        data,
        activeId,
        username,
        positionList,
        focusIds,
        setActiveId,
        setFocusIds,
        replyComment,
        cleanComment,
    } = useContext(CommentContext);
    const { isDrawerOpen, setDrawerOpen } = useContext(DrawerContext);

    function openDrawer(): void {
        setDrawerOpen(true);
    }

    useEffect(() => {
        if (activeId || focusIds?.length > 0) {
            if (activeId === '' && focusIds?.length > 0) {
                setDrawerOpen(true);
                scrollScreen(focusIds[0], 'select');
            } else {
                setDrawerOpen(true);
                scrollScreen(activeId, 'active');
            }
        }
    }, [activeId, focusIds]);

    useEffect(() => {
        const dom = document.querySelector('body');
        function handle(e: MouseEvent) {
            const paths = Array.from(e.composedPath() || []);
            if (!paths.length) {
                return;
            }
            const isInner = paths.some((item: Element) => {
                const classList = Array.from(item.classList || []);
                return classList.includes('comment-panel');
            });
            if (!isInner) {
                setActiveId?.('');
                setFocusIds?.([]);
            }
        }
        dom?.addEventListener('click', handle);
        return () => {
            dom?.removeEventListener('click', handle);
        };
    }, []);

    return (
        <div className="comment-layout" id={LAYOUT_ID}>
            <CSSTransition
                timeout={160}
                in={isDrawerOpen}
                classNames="comment-layout-container__area"
                id={SCROLL_AREA_ID}
            >
                <div className="comment-layout-container__area">{children}</div>
            </CSSTransition>
            {positionList.length > 0 && (
                <div className="comment-layout__btn">
                    <Tooltip content={ready ? (success ? '展开评论' : '加载失败') : '加载中'}>
                        {ready ? (
                            success ? (
                                <CommentIcon
                                    width={14}
                                    height={14}
                                    onClick={openDrawer}
                                    className="comment-layout__btn__icon"
                                />
                            ) : (
                                <div className="comment-layout__btn__icon">
                                    <IconClose style={{ color: 'red' }} />
                                </div>
                            )
                        ) : (
                            <div className="comment-layout__btn__icon">
                                <Spin loading={true} />
                            </div>
                        )}
                    </Tooltip>
                </div>
            )}

            <CSSTransition classNames="comment-layout__drawer" timeout={160} in={isDrawerOpen}>
                <div className="comment-layout__drawer" id={SCROLL_DRAWER_ID}>
                    <div className="comment-layout__drawer__header">
                        {/* 通过data算总数 */}
                        <span className="comment-layout__drawer__header__text">
                            评论（{getSum(data, positionList)}）
                        </span>
                        <Tooltip content="收起评论">
                            <IconDoubleRight
                                className="comment-layout__drawer__header__btn"
                                onClick={() => setDrawerOpen(false)}
                            />
                        </Tooltip>
                    </div>
                    <div id={DRAWER_ID} className="comment-layout__drawer__container">
                        {data &&
                            Object.keys(data)
                                .sort((x, y) => {
                                    const indexX = positionList.findIndex((v) => {
                                        return v === data[x]?.[0]?.position;
                                    });
                                    const indexY = positionList.findIndex((v) => {
                                        return v === data[y]?.[0]?.position;
                                    });
                                    return indexX - indexY;
                                })
                                .map((panelId) => {
                                    const panelData = data[panelId];
                                    const { quote, position } = panelData?.[0];
                                    if (!positionList.includes(position)) {
                                        return null;
                                    }
                                    const isInit = checkInitStatus(panelData);
                                    return (
                                        <CommentPanel
                                            key={panelId}
                                            quote={quote}
                                            panelId={panelId}
                                            username={username}
                                            replyList={panelData}
                                            active={panelId === activeId}
                                            focus={focusIds?.includes(panelId)}
                                            onClick={() => {
                                                setFocusIds([panelId]);
                                            }}
                                            onActive={() => {
                                                setActiveId(panelId);
                                            }}
                                            onReply={async ({ reply_id, content }) => {
                                                try {
                                                    const res = await replyComment(
                                                        {
                                                            position,
                                                            reply_id,
                                                            panel_id: panelId,
                                                            content,
                                                            quote,
                                                            status: EStatus.Show,
                                                        },
                                                        isInit ? 'add' : 'reply'
                                                    );
                                                    const { code, msg } = res;
                                                    if (code !== 0) {
                                                        throw new Error(msg);
                                                    }
                                                } catch (e) {
                                                    throw e;
                                                }
                                            }}
                                            onBlur={() => {
                                                setActiveId('');
                                                cleanComment();
                                            }}
                                        />
                                    );
                                })}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default CommentLayout;