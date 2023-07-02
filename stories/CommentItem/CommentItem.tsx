import React from "react";
import PropTypes from 'prop-types';
import CCommentItem from '../../src/components/CommentItem'
import "@arco-design/web-react/dist/css/arco.css";
import '../../src/style/index.css'
export const defaultProps = {
    username: "郭明飞",
    date: 1686310231,
    content: '[{"type":"paragraph","children":[{"text":"这是一个测试"}]},{"type":"paragraph","children":[{"text":"换行输入"}]},{"type":"paragraph","children":[{"text":"提醒"}]}]'
}

export const CommentItem = (props) => {
    return <CCommentItem {...props} />
}

CommentItem.propTypes = {
    username: PropTypes.string,
    date: PropTypes.number,
    content: PropTypes.string
}

CommentItem.defaultProps = defaultProps