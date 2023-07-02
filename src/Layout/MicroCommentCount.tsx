import React, { useState } from 'react';
import { TCommentWrapperProps } from '../types/CommentVO';
import { Tooltip } from '@arco-design/web-react';
import ReplyCount from '../static/reply_count.svg';
import { getPositionPanelIds, getSum } from '../utils/usePanel';
import './styles/commentCount.less';
import { ReplyItem } from '../types/CommentDTO';

export default (props: Pick<TCommentWrapperProps, 'position'>) => {
    if (!(window as any).__commentPanelData) {
        return null;
    }
    const { position } = props;
    const [data, setData] = useState<Record<string, ReplyItem[]>>();
    const { setFocusIds, watch } = (window as any).__commentPanelData;

    const panelIds = getPositionPanelIds(data, position);
    watch?.((v, name) => {
        switch (name) {
            case 'setData':
            case 'setReady':
                const { ready, data: _data } = v;
                if (ready && _data) {
                    setData(_data);
                }
            default:
        }
    });
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