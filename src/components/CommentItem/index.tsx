import React, { useRef } from 'react';
import Edit, { InitialValue } from '../Edit';
import Dayjs from 'dayjs';
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
                        {Dayjs(Number(`${date}000`)).format('YYYY年MM月DD日 HH:mm')}
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