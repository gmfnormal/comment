import React from "react";
import PropTypes from 'prop-types';
import "@arco-design/web-react/dist/css/arco.css";
import '../../src/style/index.css';
import { CommentPanelReplyItem } from '../../src/types/CommentVO';
export declare const REPLY_CONTENT = "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\u8FD9\u91CC\u7684\u6570\u5B57\u542B\u4E49\u6CA1\u6709\u770B\u660E\u767D\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"1. \u4E3A\u4EC0\u4E48\u662F\u8D1F\u6570\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"2. \u770B\u7740\u683C\u5F0F\u4E0D\u5BF9\"}]}]";
export declare const REPLY_ITEM: CommentPanelReplyItem;
export declare const defaultProps: {
    username: string;
    date: number;
    content: string;
};
export declare const CommentItem: {
    (props: any): React.JSX.Element;
    propTypes: {
        username: PropTypes.Requireable<string>;
        date: PropTypes.Requireable<number>;
        content: PropTypes.Requireable<string>;
    };
    defaultProps: {
        username: string;
        date: number;
        content: string;
    };
};
