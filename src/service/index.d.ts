import { IReplyRequest, IReplyResponse, ICommentListRequest, ICommentListResponse } from './type';
export declare const commentList: (params: ICommentListRequest) => Promise<ICommentListResponse>;
export declare const commentReply: (params: IReplyRequest) => Promise<IReplyResponse>;
