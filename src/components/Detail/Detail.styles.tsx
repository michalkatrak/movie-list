import {createUseStyles} from 'react-jss'

const styles = createUseStyles({
    root: {
        maxWidth: 1200,
        margin: 'auto',
    },
    button: {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        position: 'absolute',
        right: 15,
        top: 15,
        '&:focus': {
            outline: 'none',
            '& $closeIcon': {
                color: '#fff',
            }
        },
        '&:hover, &:hover:focus': {
            '& $closeIcon': {
                color: '#ccc',
            }
        },
    },
    movieDetail: {
        display: 'flex',
        padding: '70px 30px 0 30px',
        textAlign: 'left',
    },
    closeIcon: {
        fontSize: 30,
        color: '#fff',
    },
    title: {
        marginBottom: 5,
    },
    genres: {
        color: '#ccc',
        fontSize: 12,
        display: 'block',
        marginBottom: 20,
    },
    overview: {
        display: 'block',
        textAlign: 'justify',
        paddingRight: 30,
    },
    data: {
        display: 'block',
        marginTop: 15,
        fontSize: 14,
    },
    poster: {
        width: 350,
        height: 520,
    },
    playButton: {
        marginTop: 100,
        border: 'none',
        background: '#333',
        padding: '15px 40px',
        fontWeight: 'bold',
        color: '#fff',
        cursor: 'pointer',
        '&:hover': {
            background: '#777',
        }
    },
});

export default styles;