import {createUseStyles} from 'react-jss'

const styles = createUseStyles({
    headline: {
        paddingLeft: 30,
    },
    header: {
        paddingRight: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&$mobile': {
            flexDirection: 'column',
        }
    },
    mobile: {},
});

export default styles;