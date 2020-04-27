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
    @observable searchResultMovies: Show[] = [];
    @observable searchResultSeries: Show[] = [];

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
    private mapMoviesResult = (response: AxiosResponse): Show[] => {
        const movies: Show[] = response.data.results.map((movie: any) => ({
            type: 'movie',
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
        }));

        return movies;
    };

    private mapSeriesResult = (response: AxiosResponse): Show[] => {
        const series: Show[] = response.data.results.map((serie: any) => ({
            type: 'series',
            id: serie.id,
            title: serie.name,
            poster_path: serie.poster_path,
        }));

        return series;
    };

    @action
    private getMovies = async (genre?: number): Promise<Show[]> => {
        const response = (await this.requestGet(
            '/movie/popular',
            genre ? `with_genres=${genre}` : null
        ));

        if (!response) {
            throw new Error('Something went wrong catching popular movies.');
        }

        return this.mapMoviesResult(response);
    };

    @action
    private getMovieDetail = async (id: string): Promise<ShowDetail> => {
        const response = (await this.requestGet(`/movie/${id}`)).data;

        if (!response) {
            throw new Error('Something went wrong catching popular movies.');
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
            throw new Error('Something went wrong catching popular movies.');
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
    private getSeries = async (): Promise<Show[]> => {
        const response = (await this.requestGet('/tv/popular'));

        if (!response) {
            throw new Error('Something went wrong catching popular TV series.');
        }

        return this.mapSeriesResult(response);
    };

    @action
    private searchMovies = async (query: string): Promise<Show[]> => {
        const response = (await this.requestGet(
            '/search/movie', `query=${query}`
        ));

        if (!response) {
            throw new Error('Something went wrong searching for movies.');
        }

        return this.mapMoviesResult(response);
    };

    @action
    private searchSeries = async (query: string): Promise<Show[]> => {
        const response = (await this.requestGet(
            '/search/tv', `query=${query}`
        ));

        if (!response) {
            throw new Error('Something went wrong searching for movies.');
        }

        return this.mapSeriesResult(response);
    };

    @action
    public getPopularSeries = async (): Promise<void> => {
        this.popularSeries = await this.getSeries();
    };

    @action
    public getPopularMovies = async (): Promise<void> => {
        this.popularMovies = await this.getMovies();
    };

    @action
    public getFamilyMovies = async (): Promise<void> => {
        this.familyMovies = await this.getMovies(10751);
    };

    @action
    public getDocumentaryMovies = async (): Promise<void> => {
        this.documentaryMovies = await this.getMovies(99);
    };

    @action
    public getShowDetail = async (id: string, type: ShowType): Promise<void> => {
        if (type === 'movie') {
            this.showDetail = await this.getMovieDetail(id);
        } else {
            this.showDetail = await this.getSeriesDetail(id);
        }
    };

    @action
    public search = async (query: string): Promise<void> => {
        this.searchResultMovies = await this.searchMovies(query);
        this.searchResultSeries = await this.searchSeries(query);
    }
}

const moviesStore: Movies = new Movies();

export default createContext(moviesStore);