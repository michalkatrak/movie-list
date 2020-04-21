import React from 'react';
import styles from './ShowContainer.styles';
import {Show} from '../../types';
import {createImgURL} from '../../utils';
import noPoster from '../../img/no-poster.jpg'

interface Props {
    show: Show;
}

const ShowContainer = (props: Props) => {
    const {show} = props;
    const classes = show.poster_path
        ? styles(createImgURL(show.poster_path))()
        : styles(noPoster)();
    return (
        <div className={classes.root}>
            <span className={classes.title}>{show.title}</span>
        </div>
    );
};

export default ShowContainer;