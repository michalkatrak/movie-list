import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './Home.styles';
import movies from '../../stores/movies';
import ShowCarousel from './ShowCarousel';

const Home = observer(() => {
    const classes = styles();
    const {
        getPopularMovies,
        getPopularSeries,
        getFamilyMovies,
        getDocumentaryMovies,
        popularSeries,
        popularMovies,
        familyMovies,
        documentaryMovies,
    } = useContext(movies);

    useEffect(() => {
        getPopularSeries();
        getPopularMovies();
        getFamilyMovies();
        getDocumentaryMovies();
    }, []);

    return (
        <>
            <h1 className={classes.headline}>Michal Movie Player</h1>
            <h2 className={classes.headline}>Popular Movies</h2>
            <ShowCarousel shows={popularMovies} />
            <h2 className={classes.headline}>Popular TV Shows</h2>
            <ShowCarousel shows={popularSeries} />
            <h2 className={classes.headline}>Family Movies</h2>
            <ShowCarousel shows={familyMovies} />
            <h2 className={classes.headline}>Documentary Movies</h2>
            <ShowCarousel shows={documentaryMovies} />
        </>
    );
});

export default Home;