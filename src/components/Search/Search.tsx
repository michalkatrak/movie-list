import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router';
import movies from '../../stores/movies';
import {Loading} from '../Loading';
import HeaderWithSearchBox from '../Containers/HeaderWithSearchBox';
import {ShowContainer} from '../Containers';
import styles from './Search.styles';
import {Breakpoint} from '../../types';
import {ResponsiveContainer} from '../ResponsiveContainer';

interface RouteParams {
    query: string,
}

const Search = () => {
    const classes = styles();
    const {query} = useParams<RouteParams>();
    const history = useHistory();
    const [loaded, setLoaded] = useState<boolean>(false);

    const {
        searchResultMovies,
        searchResultSeries,
        search,
    } = useContext(movies);

    useEffect(() => {
        if (!query.length) {
            history.push('/');
            return;
        }

        search(query).then(() => setLoaded(true));
    }, []);

    const calculateShowWidth = (width: number, breakpoint: Breakpoint): number => {
        if (breakpoint === 'lg') {
            return Math.floor(width / 6);
        }
        if (breakpoint === 'md') {
            return Math.floor(width / 4);
        }
        return width;
    };

    return (
        <ResponsiveContainer>
            {(breakpoint, width) =>
                loaded ? (
                    <>
                        <HeaderWithSearchBox title={`Search results for "${query}"`} />
                        {searchResultMovies.length ?
                            (
                                <>
                                    <h3 className={classes.headline}>Movie results</h3>
                                    <div className={classes.showsList}>
                                        {searchResultMovies.map((movie, index) =>
                                            <div
                                                className={classes.showWrapper}
                                                key={index}
                                                style={{
                                                    width: calculateShowWidth(Math.floor(width), breakpoint),
                                                    height: calculateShowWidth(width, breakpoint) * 1.5,
                                                }}
                                            >
                                                <ShowContainer show={movie} />
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : ('')
                        }
                        {searchResultSeries.length ?
                        (
                            <>
                                <h3 className={classes.headline}>Series results</h3>
                                <div className={classes.showsList}>
                                    {searchResultSeries.map((series, index) =>
                                        <div className={classes.showWrapper}
                                             key={index}
                                             style={{
                                                 width: calculateShowWidth(Math.floor(width), breakpoint),
                                                 height: calculateShowWidth(width, breakpoint) * 1.5,
                                             }}
                                        >
                                            <ShowContainer show={series} />
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : ('')
                        }
                    </>
                ) : (
                    <Loading />
                )
            }
        </ResponsiveContainer>
    );
};

export default Search;