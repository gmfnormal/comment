import React from 'react';
import { TCommentWrapperProps } from '../types/CommentVO';
import './styles/commentWrapper.less';
declare const CommentWrapper: ({ children, ...rest }: TCommentWrapperProps) => React.JSX.Element;
export default CommentWrapper;
