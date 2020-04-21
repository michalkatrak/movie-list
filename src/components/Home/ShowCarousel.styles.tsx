import {createUseStyles} from 'react-jss'

const styles = createUseStyles({
    root: {
        position: 'relative',
    },
    button: {
        position: 'absolute',
        backgroundColor: 'transparent',
        border: 'none',
        height: '100%',
        top: 0,
        '&:focus': {
            outline: 'none',
            '& $icon': {
                color: '#ccc',
            }
        },
        '&:hover, &:hover:focus': {
            '& $icon': {
                color: '#fff',
            }
        },
        '&$left': {
            left: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0) 100%)',
        },
        '&$right': {
            right: 0,
            background: 'linear-gradient(270deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0) 100%)',
        },
    },
    icon: {
        color: '#ccc',
        fontSize: 30,
    },
    left: {},
    right: {},
});

export default styles;