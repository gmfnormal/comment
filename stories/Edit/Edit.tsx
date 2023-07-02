import React from "react";
import PropTypes from 'prop-types';
import CEdit from '../../src/components/Edit'
import '../../src/style/index.css'
export const defaultProps = {
    initialValue: [
        {
            type: 'paragraph',
            children: [
                {
                    text: '',
                },
            ],
        },
    ],
    placeholder: '回复',
    editableProps: undefined,
    clearOnBlur: false,
    usePlaceHolder: true,
    onEnter: () => { console.log('onEnter') },
    onBlur: () => { console.log('onBlur') },
}

export const Edit = (props) => {
    return <div style={{ width: '300px' }}>
        <CEdit {...props} />
    </div>
}

Edit.propTypes = {
    initialValue: PropTypes.array,
    placeholder: PropTypes.string,
    editableProps: PropTypes.object,
    onEnter: PropTypes.func,
    onBlur: PropTypes.func,
    usePlaceHolder: PropTypes.bool,
    clearOnBlur: PropTypes.bool
}

Edit.defaultProps = defaultProps