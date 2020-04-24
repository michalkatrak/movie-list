import React from 'react';
import {useHistory} from 'react-router';
import styles from './ShowContainer.styles';
import {Show} from '../../types';
import {createImgURL} from '../../utils';

interface Props {
    show: Show;
}

const ShowContainer = (props: Props) => {
    const {show} = props;
    const history = useHistory();
    const classes = show.poster_path
        ? styles(createImgURL(show.poster_path))()
        : styles(`${process.env.PUBLIC_URL}/img/no-poster.jpg`)();
    const handleClick = () => {
        history.push(`/${show.type}/${show.id}`);
    };
    return (
        <div className={classes.root} onClick={handleClick}>
            <span className={classes.title}>{show.title}</span>
        </div>
    );
};

export default ShowContainer;