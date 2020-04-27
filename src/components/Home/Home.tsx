import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './Home.styles';
import movies from '../../stores/movies';
import ShowCarousel from './ShowCarousel';
import {Loading} from '../Loading';
import HeaderWithSearchBox from '../Containers/HeaderWithSearchBox';

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

    const [loaded, setLoaded] = useState<boolean>(false);

    const loadShows = async (): Promise<void> => {
        await Promise.all([
            getPopularSeries(),
            getPopularMovies(),
            getFamilyMovies(),
            getDocumentaryMovies(),
        ]);
        setLoaded(true);
    };

    useEffect(() => {
        loadShows();
    }, []);

    return (
        <>
            {loaded ? (
                        <>
                            <HeaderWithSearchBox/>
                            <h2 className={classes.headline}>Popular Movies</h2>
                            <ShowCarousel shows={popularMovies} />
                            <h2 className={classes.headline}>Popular TV Shows</h2>
                            <ShowCarousel shows={popularSeries} />
                            <h2 className={classes.headline}>Family Movies</h2>
                            <ShowCarousel shows={familyMovies} />
                            <h2 className={classes.headline}>Documentary Movies</h2>
                            <ShowCarousel shows={documentaryMovies} />
                        </>
            ) : (
                <Loading />
            )}
        </>
    );
});

export default Home;