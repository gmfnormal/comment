import React from "react";
import { Avatar } from '@arco-design/web-react'
import './styles/avatar.less'
type Props = {
    username: string
}
export default (props: Props) => {
    const { username } = props
    return <div className="comment-item-avatar">
        <Avatar size={24} style={{ backgroundColor: "#155dff" }}>{username?.substring(username?.length - 2)}</Avatar>
        <div>{username}</div>
    </div>
}