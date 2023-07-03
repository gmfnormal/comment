import React, { useRef } from 'react';
import Edit, { InitialValue } from '../Edit';
import { getCalendarTime } from '../../utils/common'
import { Props } from './type';
import { safeJsonParse } from '../../utils/common'
import { useHover } from 'ahooks';
import DefaultAvatar from './defaultAvatar';
import './styles/index.less';
export default (props: Props) => {
    const { avatar, date, content, moreAction, username } = props;
    const ref = useRef(null);
    const hover = useHover(ref);
    return (
        <div className="comment-item" ref={ref}>
            <div className="comment-item-info">
                {avatar ?? <DefaultAvatar username={username} />}
                {date && (
                    <span className="comment-item-info-date">
                        {getCalendarTime(`${date}000`)}
                    </span>
                )}
                {hover && content && moreAction}
            </div>
            <div className="comment-item-content">
                {content && (
                    <Edit
                        initialValue={content ? safeJsonParse(content) : InitialValue}
                        editableProps={{ readOnly: true }}
                    />
                )}
            </div>
        </div>
    );
};