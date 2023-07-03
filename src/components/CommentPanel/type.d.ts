import { CommentPanelReplyItem } from '../../types/CommentVO';
export interface ReplyParams {
    reply_id: string;
    content: string;
    username: string;
}
export type Props = {
    quote: string;
    panelId?: string;
    username: string;
    replyList: CommentPanelReplyItem[];
    active?: boolean;
    focus?: boolean;
    onActive?: (panel_id: string) => void;
    onReply?: (params: ReplyParams) => Promise<any>;
    onBlur?: () => void;
    onClick?: () => void;
    classNames?: string;
};
export type ReplyProps = {
    onClick?: () => void;
    [key: string]: any;
};
