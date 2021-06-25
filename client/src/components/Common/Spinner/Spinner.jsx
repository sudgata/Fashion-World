import React from 'react';
import './Spinner.scss';

const Spinner = ({ text }) => {
    return (
        <div>
            <div className='spinner-container'>
                {
                    text && <div className='spinner-text'>{text}</div>
                }
                <div className='spinner'>
                </div>
            </div>
        </div>
    );
};

export default Spinner;