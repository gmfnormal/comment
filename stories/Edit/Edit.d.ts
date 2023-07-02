import React from "react";
import PropTypes from 'prop-types';
import '../../src/style/index.css';
export declare const defaultProps: {
    initialValue: {
        type: string;
        children: {
            text: string;
        }[];
    }[];
    placeholder: string;
    editableProps: any;
    clearOnBlur: boolean;
    usePlaceHolder: boolean;
    onEnter: () => void;
    onBlur: () => void;
};
export declare const Edit: {
    (props: any): React.JSX.Element;
    propTypes: {
        initialValue: PropTypes.Requireable<any[]>;
        placeholder: PropTypes.Requireable<string>;
        editableProps: PropTypes.Requireable<object>;
        onEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        usePlaceHolder: PropTypes.Requireable<boolean>;
        clearOnBlur: PropTypes.Requireable<boolean>;
    };
    defaultProps: {
        initialValue: {
            type: string;
            children: {
                text: string;
            }[];
        }[];
        placeholder: string;
        editableProps: any;
        clearOnBlur: boolean;
        usePlaceHolder: boolean;
        onEnter: () => void;
        onBlur: () => void;
    };
};
