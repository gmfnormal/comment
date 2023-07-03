import React, { useState } from "react";
import PropTypes from 'prop-types';
import CCommentPanel from '../../src/components/CommentPanel'
import "@arco-design/web-react/dist/css/arco.css";
import '../../src/style/index.css';
import { CommentPanelReplyItem } from '../../src/types/CommentVO';
import { EStatus } from '../../src/types/CommentDTO';
export const REPLY_CONTENT =
    '[{"type":"paragraph","children":[{"text":"这里的数字含义没有看明白"}]},{"type":"paragraph","children":[{"text":"1. 为什么是负数"}]},{"type":"paragraph","children":[{"text":"2. 看着格式不对"}]}]';
export const REPLY_ITEM: CommentPanelReplyItem = {
    username: '郭明飞',
    email: 'gmfnormal@gmail.com',
    identifier: 'test',
    position: 'test',
    panel_id: 'test',
    reply_id: 'test',
    status: EStatus.Show,
    content: '',
    id: 'test',
};
export const defaultProps = {
    quote: "这是个测试",
    panelId: "test",
    position: "test",
    username: "guomingfei"
}

export const CommentPanel = (props) => {
    const [active, setActive] = useState(false);
    const [replyList, setReplyList] = useState([REPLY_ITEM]);
    return (
        <CCommentPanel
            replyList={replyList}
            active={active}
            onActive={() => {
                setActive(true);
            }}
            onReply={async ({ reply_id, content, username }) => {
                const newData = {
                    ...REPLY_ITEM,
                    content,
                    username,
                    reply_id,
                    created_at: parseInt(`${new Date().valueOf() / 1000}`),
                };
                setReplyList(
                    replyList.length <= 1 && replyList[0].content === '' ? [newData] : [...replyList, newData]
                );
            }}
            {...props}
        />
    )
}


CommentPanel.propTypes = {
    username: PropTypes.string,
    date: PropTypes.number,
    content: PropTypes.string
}

CommentPanel.defaultProps = defaultProps