import React from 'react';
import './CustomSpinner.scss';

const CustomSpinner = (props) => {
    const {width, height} = props;
    const style = {
        width: width ? `${width}px` : `50px` ,
        height : height ? `${height}px` : `50px`
    }
    return (
        <div className='custom-spinner-container'>
            <div style={style} className='custom-spinner'>
            </div>
        </div>
    );
};

export default CustomSpinner;