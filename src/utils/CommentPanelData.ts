import { commentList, commentReply } from '../service';
import { EStatus, ReplyItem } from '../types/CommentDTO';
import { ReplyType } from '../types/CommentVO';
import { getPanelData, getInsertPanelData, checkInitStatus } from '../utils/usePanel';
import { IReplyRequest } from '../service/type';
import { getDate } from '../utils/common';
import { nanoid } from 'nanoid';

class CommentPanelData {
    identifier: string;
    username: string;
    data: Record<string, ReplyItem[]>;
    activeId: string = '';
    ready = false;
    success = false;
    positionList: string[] = [];
    focusIds = [];
    error: any;
    cb: any[] = [];

    constructor(identifier: string, username: string) {
        this.setData = this.setData.bind(this);
        this.setActiveId = this.setActiveId.bind(this);
        this.setPositionList = this.setPositionList.bind(this);
        this.setReady = this.setReady.bind(this);
        this.setSuccess = this.setSuccess.bind(this);
        this.setError = this.setError.bind(this);
        this.getCommentList = this.getCommentList.bind(this);
        this.replyComment = this.replyComment.bind(this);
        this.addComment = this.addComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.cleanComment = this.cleanComment.bind(this);
        this.initPositionList = this.initPositionList.bind(this);
        this.setFocusIds = this.setFocusIds.bind(this);
        this.watch = this.watch.bind(this);
        this.on = this.on.bind(this);
        this.identifier = identifier;
        this.username = username;
        if (identifier && username) {
            this.getCommentList();
        } else {
            this.setReady(true);
            this.setError(new Error('identifier or username is empty'));
        }
    }

    watch(cb) {
        this.cb = [...this.cb, cb];
    }

    on(name) {
        this.cb?.forEach((fn) => {
            fn?.(this, name);
        });
    }

    setFocusIds(focusIds: string[]) {
        this.focusIds = focusIds;
        this.on('setFocusIds');
    }

    setData(data: Record<string, ReplyItem[]>) {
        this.data = data;
        this.on('setData');
    }
    setActiveId(id: string) {
        this.activeId = id;
        this.on('setActiveId');
    }
    setPositionList(position: string) {
        this.positionList = [...this.positionList, position];
        this.on('setPositionList');
    }
    setReady(status: boolean) {
        this.ready = status;
        this.on('setReady');
    }
    setSuccess(status: boolean) {
        this.success = status;
        this.on('setSuccess');
    }
    setError(data: any) {
        this.data = data;
        this.on('setError');
    }

    async getCommentList() {
        try {
            const res = await commentList({
                identifier: this.identifier,
            });
            const { code, msg, data: _data } = res;
            if (code === 0) {
                const { items } = _data;
                this.setData(getPanelData(items));
                this.setSuccess(true);
            } else {
                this.setSuccess(false);
                this.setError(new Error(msg));
            }
        } catch (e) {
            console.error(e);
            this.setSuccess(false);
            this.setError(e);
        } finally {
            this.setReady(true);
            this.on('getCommentList');
        }
    }

    async replyComment(params: Omit<IReplyRequest, 'identifier' | 'username'>, type: ReplyType) {
        const { identifier } = this;
        const { username } = this;
        const { data } = this;
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
                this.setData(newData);
            }
            return { code, msg };
        } catch (e) {
            console.error(e);
            return { code: -1, msg: e };
        } finally {
            this.on('replyComment');
        }
    }

    addComment(position: string, quote: string) {
        const { identifier, username, data } = this;
        const newPanelId = nanoid();

        this.setData({
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
                    email: `${username}@bytedance.com`,
                    status: EStatus.Show,
                    content: '',
                    quote,
                    created_at: parseInt(`${new Date().valueOf() / 1000}`),
                    updated_at: parseInt(`${new Date().valueOf() / 1000}`),
                },
            ],
        });
        this.setActiveId(newPanelId);
        this.on('addComment');
    }

    removeComment(params: ReplyItem) {
        const { data } = this;
        const { id } = params;
        const newData = Object.keys(data).reduce((pre, cur) => {
            const newPanelData = data[cur]?.filter((val) => val.id !== id);
            if (newPanelData?.length > 0) {
                return { ...pre, [cur]: newPanelData };
            }
            return pre;
        }, {});
        this.setData(newData);
        this.on('removeComment');
    }

    cleanComment() {
        const { data } = this;
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
        this.setData(newData);
        this.on('cleanComment');
    }

    // TODO 闭包 + 防抖
    initPositionList(position: string) {
        this.setPositionList(position);
        this.on('initPositionList');
    }
}

class CommentDrawerData {
    isDrawerOpen = false;
    cb: any[] = [];
    constructor() {
        this.setDrawerOpen = this.setDrawerOpen.bind(this);
        this.watch = this.watch.bind(this);
        this.on = this.on.bind(this);
    }
    watch(cb) {
        this.cb = [...this.cb, cb];
    }

    on(name) {
        this.cb?.forEach((fn) => {
            fn?.(this, name);
        });
    }
    setDrawerOpen(status: boolean) {
        this.isDrawerOpen = status;
        this.on('setDrawerOpen');
    }
}
// TODO 以SDK的方式提供使用，无需关注具体框架
export default class CommentData {
    identifier: string;
    username: string;
    commentPanelData: any;
    commentDrawerData: any;
    constructor(identifier: string, username: string) {
        this.identifier = identifier;
        this.username = username;
        const commentPanelData = new CommentPanelData(this.identifier, this.username);
        const commentDrawerData = new CommentDrawerData();
        this.commentPanelData = commentPanelData;
        this.commentDrawerData = commentDrawerData;
    }

    init(cb?: any) {
        (window as any).__commentPanelData = this.commentPanelData;
        (window as any).__commentDrawerData = this.commentDrawerData;
        cb?.();
    }
}