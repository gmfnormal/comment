import React, { useContext } from 'react';
import { TCommentWrapperProps } from '../types/CommentVO';
import { Tooltip } from '@arco-design/web-react';
import { CommentContext } from './Context';
import ReplyCount from '../static/reply_count.svg';
import { getPositionPanelIds, getSum } from '../utils/usePanel';
import './styles/commentCount.less';

export default (props: Pick<TCommentWrapperProps, 'position'>) => {
    const { data, setFocusIds } = useContext(CommentContext);
    const { position } = props;
    const panelIds = getPositionPanelIds(data, position);
    return panelIds?.length > 0 ? (
        <Tooltip content={`共有${getSum(data, [position])}条评论`}>
            <div
                className="comment-count-container"
                onClick={() => {
                    setFocusIds(panelIds);
                }}
            >
                <ReplyCount />
                <span className="comment-count-container_count">{getSum(data, [position])}</span>
            </div>
        </Tooltip>
    ) : null;
};