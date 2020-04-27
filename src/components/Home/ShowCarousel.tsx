import React from 'react';
import classNames from 'classnames';
import {IconContext} from 'react-icons';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import {ShowContainer} from '../Containers';
import {Breakpoint, Show} from '../../types';
import styles from './ShowCarousel.styles';
import {ResponsiveContainer} from '../ResponsiveContainer';

interface Props {
    shows: Show[];
}

const ShowCarousel = (props: Props) => {
    const {shows} = props;
    const classes = styles();

    const visibleSlides = (breakpoint: Breakpoint): number => {
        if (breakpoint === 'lg') {
            return 6;
        }
        if (breakpoint === 'md') {
            return 4;
        }
        return 1;
    };

    return (
        <ResponsiveContainer>
            {(breakpoint) => (
                <CarouselProvider
                    naturalSlideWidth={150}
                    naturalSlideHeight={200}
                    totalSlides={shows.length}
                    visibleSlides={visibleSlides(breakpoint)}
                    infinite={true}
                    className={classes.root}
                >
                    <Slider>
                        {shows.map((show, index) => (
                            <Slide index={index} key={index}>
                                <ShowContainer show={show} />
                            </Slide>
                        ))}
                    </Slider>
                    <ButtonBack className={classNames(classes.button, classes.left)}>
                        <IconContext.Provider value={{className: classes.icon}}>
                            <FaChevronLeft />
                        </IconContext.Provider>
                    </ButtonBack>
                    <ButtonNext className={classNames(classes.button, classes.right)}>
                        <IconContext.Provider value={{className: classes.icon}}>
                            <FaChevronRight />
                        </IconContext.Provider>
                    </ButtonNext>
                </CarouselProvider>
            )}
        </ResponsiveContainer>
    )
};

export default ShowCarousel;