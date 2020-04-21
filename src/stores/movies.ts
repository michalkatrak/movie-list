import {createContext} from 'react';
import {action, observable} from 'mobx';
import Axios, {AxiosResponse} from 'axios';
import {Show} from '../types';
import {createApiURL} from '../utils'

class Movies {
    @observable popularMovies: Show[] = [];
    @observable popularSeries: Show[] = [];
    @observable familyMovies: Show[] = [];
    @observable documentaryMovies: Show[] = [];

    @action
    private requestGet = async (url: string, query?: string): Promise<AxiosResponse> => {
        try {
            const response: AxiosResponse = await Axios.request({
                url: createApiURL(url, query),
                method: 'get',
            });

            return response;
        } catch (err) {
            console.error(err);
            return err;
        }
    };

    @action
    private getMoviesByGenre = async (genre: number): Promise<Show[]> => {
        const response = (await this.requestGet('/movie/popular', `with_genres=${genre}`)).data;

        if (!response) {
            console.error('Something went wrong catching popular movies.');
        }

        const movies: Show[] = response.results.map((movie: any) => ({
            type: 'movie',
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            release_date: new Date(movie.release_date),
        }));

        return movies;
    };

    @action
    public getPopularMovies = async (): Promise<void> => {
        const response = (await this.requestGet('/movie/popular')).data;

        if (!response) {
            console.error('Something went wrong catching popular movies.');
        }

        const movies: Show[] = response.results.map((movie: any) => ({
            type: 'movie',
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            release_date: new Date(movie.release_date),
        }));

        this.popularMovies = movies;
    };

    @action
    public getPopularSeries = async (): Promise<void> => {
        const response = (await this.requestGet('/tv/popular')).data;

        if (!response) {
            console.error('Something went wrong catching popular TV series.');
        }

        const series: Show[] = response.results.map((serie: any) => ({
            type: 'series',
            id: serie.id,
            title: serie.name,
            poster_path: serie.poster_path,
            overview: serie.overview,
            release_date: new Date(serie.first_air_date),
        }));

        this.popularSeries = series;
    };

    @action
    public getFamilyMovies = async (): Promise<void> => {
        this.familyMovies = await this.getMoviesByGenre(10751);
    };

    @action
    public getDocumentaryMovies = async (): Promise<void> => {
        this.documentaryMovies = await this.getMoviesByGenre(99);
    };
}

const moviesStore: Movies = new Movies();

export default createContext(moviesStore);