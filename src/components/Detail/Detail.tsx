import React, {useEffect, useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useParams, useHistory} from 'react-router';
import {IconContext, } from 'react-icons';
import {FaTimes} from 'react-icons/fa';
import styles from './Detail.styles';
import movies from '../../stores/movies';
import {ShowType} from '../../types';
import {Loading} from '../Loading';
import {createImgURL} from '../../utils';
import noPoster from '../../img/no-poster.jpg';

interface RouteParams {
    showType: string,
    id: string,
}

const Detail = observer(() => {
    const classes = styles();
    const [loaded, setLoaded] = useState<boolean>(false);
    const {getShowDetail, showDetail} = useContext(movies);
    const {id, showType} = useParams<RouteParams>();
    const history = useHistory();
    const type: ShowType = showType === 'movie' ? 'movie' : 'series';

    const handleClose = () => {
        history.push('/');
    };

    useEffect(() => {
        getShowDetail(id, type).then(() => setLoaded(true));
    }, []);

    return (
        <div className={classes.root}>
            <button className={classes.button} onClick={handleClose}>
                <IconContext.Provider value={{className: classes.closeIcon}}>
                    <FaTimes />
                </IconContext.Provider>
            </button>
            {loaded ? (
                <div className={classes.movieDetail}>
                    <div>
                        <h2 className={classes.title}>{showDetail.title}({showDetail.year})</h2>
                        <span className={classes.genres}>({showDetail.genres.join(', ')})</span>
                        <span className={classes.overview}>{showDetail.overview}</span>
                        <span className={classes.data}>Original language: {showDetail.original_language}</span>
                    </div>
                    <img
                        src={showDetail.poster_path ? createImgURL(showDetail.poster_path) : noPoster}
                        className={classes.poster}
                        alt="Movie poster"
                    />
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
});

export default Detail;