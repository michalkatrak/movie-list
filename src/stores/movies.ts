import {createContext} from 'react';
import {action, observable} from 'mobx';
import Axios, {AxiosResponse} from 'axios';
import {Show, ShowDetail, ShowType} from '../types';
import {createApiURL} from '../utils'

class Movies {
    @observable popularMovies: Show[] = [];
    @observable popularSeries: Show[] = [];
    @observable familyMovies: Show[] = [];
    @observable documentaryMovies: Show[] = [];
    @observable showDetail: ShowDetail = null;

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
        }));

        return movies;
    };

    @action
    private getMovieDetail = async (id: string): Promise<ShowDetail> => {
        const response = (await this.requestGet(`/movie/${id}`)).data;

        if (!response) {
            console.error('Something went wrong catching popular movies.');
        }

        const genres = response.genres.map((genre: any) => genre.name);

        const detail: ShowDetail = {
            type: 'movie',
            id: response.id,
            title: response.title,
            overview: response.overview,
            original_language: response.original_language,
            genres,
            year: new Date (response.release_date).getFullYear(),
            poster_path: response.poster_path,
        };

        return detail;
    };

    @action
    private getSeriesDetail = async (id: string): Promise<ShowDetail> => {
        const response = (await this.requestGet(`/tv/${id}`)).data;

        if (!response) {
            console.error('Something went wrong catching popular movies.');
        }

        const genres = response.genres.map((genre: any) => genre.name);

        const detail: ShowDetail = {
            type: 'series',
            id: response.id,
            title: response.name,
            overview: response.overview,
            original_language: response.original_language,
            genres,
            year: new Date (response.first_air_date).getFullYear(),
            poster_path: response.poster_path,
        };

        return detail;
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

    @action
    public getShowDetail = async (id: string, type: ShowType): Promise<void> => {
        if (type === 'movie') {
            this.showDetail = await this.getMovieDetail(id);
        } else {
            this.showDetail = await this.getSeriesDetail(id);
        }
    };
}

const moviesStore: Movies = new Movies();

export default createContext(moviesStore);