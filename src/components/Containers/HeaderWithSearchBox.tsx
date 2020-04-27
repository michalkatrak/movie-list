import React from 'react';
import classNames from 'classnames';
import {SearchBox} from '../SearchBox';
import {ResponsiveContainer} from '../ResponsiveContainer';
import styles from './HeaderWithSearchBox.styles';

interface Props {
    title?: string
}

const HeaderWithSearchBox = (props: Props) => {
    const classes = styles();
    const {title} = props;

    return (
        <ResponsiveContainer>
            {(breakpoint) => (
                <div className={classNames(classes.header, {
                    [classes.mobile]: breakpoint !== 'lg',
                })}>
                    <h1 className={classes.headline}>{title ? title : 'Movie Player'}</h1>
                    <SearchBox />
                </div>
            )}
        </ResponsiveContainer>
    );
};

export default HeaderWithSearchBox;