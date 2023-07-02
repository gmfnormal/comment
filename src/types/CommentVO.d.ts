import { ReplyItem } from './CommentDTO';
import { IReplyRequest } from '../service/type';
import { ReactElement } from 'react';
export type CommentPanelReplyItem = Partial<ReplyItem>;

export type UseCommentPanelListProps = {
    identifier: string;
    username: string;
};

export type ReplyType = 'add' | 'reply' | 'delete';

export type TDrawerContext = {
    isDrawerOpen?: boolean;
    setDrawerOpen: (val: boolean) => void;
};

export type TCommentContext = {
    activeId: string;
    data: Record<string, ReplyItem[]>;
    username: string;
    positionList: string[];
    identifier: string;
    ready: boolean;
    success: boolean;
    error: any;
    focusIds: string[];
    setFocusIds: React.Dispatch<React.SetStateAction<string[]>>;
    addComment: (position: string, quote: string) => void;
    removeComment: (params: ReplyItem) => void;
    replyComment: (
        params: Omit<IReplyRequest, 'identifier' | 'username'>,
        type: ReplyType
    ) => Promise<IBaseRes>;
    cleanComment: () => void;
    initPositionList: (positions: string) => void;
    setActiveId: React.Dispatch<React.SetStateAction<string>>;
};

export type TCommentProviderProps = {
    identifier: string;
    username: string;
    onError?: (e: any) => void;
};

export type TCommentWrapperProps = {
    className?: string;
    quote: string;
    position: string;
    children: ReactElement;
};