import React, {useEffect, useState, useRef} from 'react';
import {Breakpoint} from '../../types';
import {breakpointsEnum} from '../constants';

interface Props {
    children: (breakpoint: Breakpoint, width?: number) => JSX.Element,
}

const ResponsiveContainer = (props: Props) => {
    const {children} = props;

    const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');
    const [width, setWidth] = useState<number>();

    const container = useRef(null);


    useEffect(() => {
        let throttled: boolean = false;
        const handleResize = () => {
            if (!throttled) {
                setWidth(container.current.clientWidth);
                if (width < breakpointsEnum.sm) {
                    return setBreakpoint('sm');
                }
                if (width < breakpointsEnum.md) {
                    return setBreakpoint('md');
                }
                if (width < breakpointsEnum.lg) {
                    return setBreakpoint('lg');
                }
            }
            throttled = true;
            setTimeout(function() {
                throttled = false;
            }, 250);
        };
        handleResize();
        window.addEventListener('resize', handleResize, );
    });

    return (
        <div ref={container}>
            {children(breakpoint, width)}
        </div>
    );
};

export default ResponsiveContainer;
