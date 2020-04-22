import {createUseStyles} from 'react-jss'

const styles = createUseStyles({
    button: {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 999,
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
    closeIcon: {
        fontSize: 30,
        color: '#fff',
    },
    videoContainer: {
        height: '100vh',
    },
    video: {
        width: '100%',
    }
});

export default styles;