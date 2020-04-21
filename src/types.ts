export interface Show {
    type: 'movie' | 'series',
    id: number,
    title: string,
    poster_path: string,
    overview: string,
    release_date: Date,
}