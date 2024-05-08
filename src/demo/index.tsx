import React from "react"
import CommentContext from '../Layout/Context'
import CommentLayout from '../Layout/Layout'
import CommentWrapper from "../Layout/Wrapper"

export default () => {
    return <div id="root" style={{ height: "100vh", width: '100vw' }}>
        <CommentContext identifier="demo" username="Usr" useIndexedDB={true}>
            <CommentLayout>
                <div style={{ height: '800px', width: '100%' }}>
                    <CommentWrapper quote="这里是要评论的内容" position="uuid">
                        <div style={{ width: '140px' }}>这里是要评论的内容</div>
                    </CommentWrapper>
                </div>
            </CommentLayout>
        </CommentContext>
    </div>
}