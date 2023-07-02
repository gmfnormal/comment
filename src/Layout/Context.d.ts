import React, { FC } from 'react';
import { TDrawerContext, TCommentContext, TCommentProviderProps } from '../types/CommentVO';
export declare const DrawerContext: React.Context<TDrawerContext>;
export declare const DrawerProvider: FC;
export declare const CommentContext: React.Context<TCommentContext>;
declare const CommentProvider: FC<TCommentProviderProps>;
export default CommentProvider;
