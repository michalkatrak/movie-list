import React from 'react';
import {IconContext} from 'react-icons';
import {FaSpinner} from 'react-icons/fa';
import styles from './Loading.styles';

const Loading = () => {
    const classes = styles();
    return (
        <div className={classes.root}>
            <IconContext.Provider value={{className: classes.icon}}>
                <FaSpinner />
            </IconContext.Provider>
        </div>
    );
};

export default Loading;