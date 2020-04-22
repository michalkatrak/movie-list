export interface Show {
    type: ShowType,
    id: number,
    title: string,
    poster_path: string,
}

export interface ShowDetail {
    type: 'movie' | 'series',
    id: number,
    title: string,
    overview: string,
    original_language: string,
    genres: string[],
    year: number,
    poster_path: string,
}

export type ShowType = 'movie' | 'series';
