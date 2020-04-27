import {createUseStyles} from 'react-jss'

const styles = createUseStyles({
    root: {
        height: 40,
        display: 'flex',
    },
    input: {
        background: '#000',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRight: 'none',
        color: '#fff',
        height: 40,
        width: 300,
        padding: '0 15px',
        '&:focus': {
            outline: 'none',
            borderColor: '#fff',
            '& + $button': {
                borderColor: '#fff',
            },
        }
    },
    button: {
        background: '#000',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderLeft: 'none',
        color: '#fff',
        height: 40,
        width: 40,
        cursor: 'pointer',
        '&:focus': {
            outline: 'none',
        }
    }
});

export default styles;