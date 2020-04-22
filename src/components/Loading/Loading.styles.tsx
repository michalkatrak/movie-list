import {createUseStyles} from 'react-jss'

const styles = createUseStyles({
    '@keyframes icon-spin': {
        from: {transform: 'rotate(0deg)'},
        to: {transform: 'rotate(359deg)'},
    },
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 50,
        animation: '$icon-spin 2s infinite linear',
    },
});

export default styles;