import React from 'react';
import classNames from 'classnames';
import {IconContext} from 'react-icons';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import ShowContainer from './ShowContainer';
import {Show} from '../../types';
import styles from './ShowCarousel.styles';

interface Props {
    shows: Show[];
}

const ShowCarousel = (props: Props) => {
    const {shows} = props;
    const classes = styles();

    return (
        <CarouselProvider
            naturalSlideWidth={150}
            naturalSlideHeight={200}
            totalSlides={shows.length}
            visibleSlides={6}
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
    )
};

export default ShowCarousel;