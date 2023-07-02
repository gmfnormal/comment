export enum EStatus {
    'Show' = 1
}
export type ReplyItem = {
    /** id */
    id: string;
    /** 标识符 */
    identifier: string;
    /** 位置 */
    position: string;
    /** 评论内容描述 */
    quote: string;
    /** 评论块id */
    panel_id: string;
    /** 回复id */
    reply_id: string;
    /** 用户名 */
    username: string;
    /** 邮箱 */
    email?: string;
    /** 评论状态 1: 展示 */
    status: EStatus;
    /** 评论内容 */
    content: string;
    /** 创建时间 */
    created_at: number;
    /** 更新时间 */
    updated_at: number
}