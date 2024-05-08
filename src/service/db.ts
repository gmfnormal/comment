import Dexie from "dexie";
import { ReplyItem } from '../types/CommentDTO'

class CommentDB extends Dexie {
    commentStore!: Dexie.Table<ReplyItem, string>

    constructor() {
        super('repliesDB');
        this.version(1).stores({
            commentStore: 'id, identifier'
        });
        this.commentStore = this.table('commentStore');
    }

    // 添加回复  
    async addReply(item: ReplyItem) {
        await this.commentStore.put(item);
    }

    // 获取所有回复  
    async getAllReplies() {
        return this.commentStore.toArray();
    }

    // 根据id获取回复  
    async getReplyById(id: string) {
        return this.commentStore.get(id);
    }

    async getReplayByIdentifier(identifier: string) {
        return this.commentStore.where('identifier').equals(identifier).toArray();
    }

    // 更新回复  
    async updateReply(item: ReplyItem) {
        // 如果id不存在，put方法会抛出一个错误，可通过传入{ force: true }进行处理
        await this.commentStore.put(item);
    }

    // 删除回复  
    async deleteReply(id: string) {
        await this.commentStore.delete(id);
    }

}

export default CommentDB