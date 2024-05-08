
import { ReplyItem } from '../types/CommentDTO'
import { IReplyRequest, IReplyResponse, ICommentListRequest, ICommentListResponse } from './type'
import { noSpecialCharater } from '../utils/nanoid'
import { getDate } from '../utils/common'

const nanoid = noSpecialCharater()
export const commentList = async (params: ICommentListRequest): Promise<ICommentListResponse> => {
    const dbInstance = (window as any).__commentDbInstance
    if (dbInstance) {
        try {
            const res = await dbInstance.getReplayByIdentifier(params.identifier) as ReplyItem[]
            return {
                code: 0,
                msg: '',
                data: {
                    items: res
                }
            }
        } catch (e) {
            throw (e)
        }
    }
    return Promise.resolve({
        code: 0,
        msg: '',
        data: {
            items: []
        }
    })
}
export const commentReply = async (params: IReplyRequest): Promise<IReplyResponse> => {
    const dbInstance = (window as any).__commentDbInstance
    if (dbInstance) {
        try {
            const id = nanoid()
            const created_at = getDate()
            console.log({
                ...params,
                created_at,
                id,
            })
            await dbInstance.addReply({
                ...params,
                created_at,
                id,
            }) as ReplyItem[]
            return {
                code: 0,
                msg: '',
                data: {
                    id
                }
            }
        } catch (e) {
            throw (e)
        }
    }
    return Promise.resolve({
        code: 0,
        msg: '',
        data: {
            id: ''
        }
    })
}