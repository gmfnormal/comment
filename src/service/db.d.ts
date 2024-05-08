import Dexie from "dexie";
import { ReplyItem } from '../types/CommentDTO';
declare class CommentDB extends Dexie {
    commentStore: Dexie.Table<ReplyItem, string>;
    constructor();
    addReply(item: ReplyItem): Promise<void>;
    getAllReplies(): Promise<ReplyItem[]>;
    getReplyById(id: string): Promise<ReplyItem>;
    getReplayByIdentifier(identifier: string): Promise<ReplyItem[]>;
    updateReply(item: ReplyItem): Promise<void>;
    deleteReply(id: string): Promise<void>;
}
export default CommentDB;
