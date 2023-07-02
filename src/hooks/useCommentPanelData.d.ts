/// <reference types="react" />
import { ReplyItem } from '../types/CommentDTO';
import { UseCommentPanelListProps, ReplyType } from '../types/CommentVO';
import { IReplyRequest } from '../service/type';
declare const _default: (props: UseCommentPanelListProps) => ({
    ready: boolean;
    error: any;
    success: boolean;
    activeId?: undefined;
    data?: undefined;
    positionList?: undefined;
    focusIds?: undefined;
    setActiveId?: undefined;
    setFocusIds?: undefined;
    replyComment?: undefined;
    addComment?: undefined;
    removeComment?: undefined;
    cleanComment?: undefined;
    initPositionList?: undefined;
} | {
    activeId: string;
    data: Record<string, ReplyItem[]>;
    positionList: string[];
    focusIds: string[];
    ready?: undefined;
    error?: undefined;
    success?: undefined;
    setActiveId?: undefined;
    setFocusIds?: undefined;
    replyComment?: undefined;
    addComment?: undefined;
    removeComment?: undefined;
    cleanComment?: undefined;
    initPositionList?: undefined;
} | {
    setActiveId: import("react").Dispatch<import("react").SetStateAction<string>>;
    setFocusIds: import("react").Dispatch<import("react").SetStateAction<string[]>>;
    replyComment: (params: Omit<IReplyRequest, 'identifier' | 'username'>, type: ReplyType) => Promise<{
        code: number;
        msg: any;
    }>;
    addComment: (position: string, quote: string) => void;
    removeComment: (params: ReplyItem) => void;
    cleanComment: () => void;
    initPositionList: (position: any) => void;
    ready?: undefined;
    error?: undefined;
    success?: undefined;
    activeId?: undefined;
    data?: undefined;
    positionList?: undefined;
    focusIds?: undefined;
})[];
export default _default;
