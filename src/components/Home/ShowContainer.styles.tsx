import {createUseStyles} from 'react-jss'

const styles = (posterPath: string) => createUseStyles({
    root: {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${posterPath})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        transition: '0.25s',
        cursor: 'pointer',
        '&:hover': {
            '& $title': {
                opacity: 1,
            }
        },
    },
    title: {
        color: '#fff',
        padding: '15px 0',
        width: '100%',
        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)',
        transition: '0.5s',
        opacity: 0,
    }
});

export default styles;