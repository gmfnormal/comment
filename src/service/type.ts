import { IBaseRes } from '../types/common';
import { ReplyItem, EStatus } from '../types/CommentDTO';

export interface ICommentListRequest {
    identifier: string
}

export interface ICommentListResponse extends IBaseRes {
    data: {
        items: ReplyItem[]
    }
}

export interface IReplyRequest {
    username: string;
    identifier: string;
    position: string;
    reply_id: string;
    panel_id: string;
    content: string;
    quote: string;
    status: EStatus;
}

export interface IReplyResponse extends IBaseRes {
    data: {
        id: string;
    }
}