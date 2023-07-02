
import { IReplyRequest, IReplyResponse, ICommentListRequest, ICommentListResponse } from './type'
// 使用indexDB
export const commentList = (params: ICommentListRequest): Promise<ICommentListResponse> => {
    console.log(params, 'params')
    return Promise.resolve({
        code: 0,
        msg: '',
        data: {
            items: []
        }
    })
}
export const commentReply = (params: IReplyRequest): Promise<IReplyResponse> => {
    console.log(params, 'params')
    return Promise.resolve({
        code: 0,
        msg: '',
        data: {
            id: ''
        }
    })
}