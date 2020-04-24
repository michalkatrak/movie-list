import React, {useEffect, useState} from 'react';
import {Breakpoint} from '../../types';
import {breakpointsEnum} from '../constants';

interface Props {
    children: (breakpoint: Breakpoint) => JSX.Element,
}

const ResponsiveContainer = (props: Props) => {
    const {children} = props;

    const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < breakpointsEnum.sm) {
                return setBreakpoint('sm');
            }
            if (window.innerWidth < breakpointsEnum.md) {
                return setBreakpoint('md');
            }
            if (window.innerWidth < breakpointsEnum.lg) {
                return setBreakpoint('lg');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
    });

    return (children(breakpoint));
};

export default ResponsiveContainer;
