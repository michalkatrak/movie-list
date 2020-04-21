export const createApiURL = (path: string, query?: string): string => {
    const queryString = query ? `&${query}` : '';
    return `${process.env.REACT_APP_API_URL}${path}?api_key=${process.env.REACT_APP_API_KEY}${queryString}`;
};

export const createImgURL = (path: string): string => {
    return `http://image.tmdb.org/t/p/w342${path}`;
};
