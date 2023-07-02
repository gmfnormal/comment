import React from "react";
import PropTypes from 'prop-types';
import "@arco-design/web-react/dist/css/arco.css";
import '../../src/style/index.css';
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
