/**
 * Carousel component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

import { pokemonSprites, pokemonSpritesDefault } from '../../../proptypes/index'

import './custom-carousel.scss';

const CustomCarousel = ({pokemonSprites}) => {

        const images = [
            {
                original: pokemonSprites.frontDefault,
                thumbnail: pokemonSprites.frontDefault,
                description: 'Front default'
            },
            {
                original: pokemonSprites.backDefault,
                thumbnail: pokemonSprites.backDefault,
                description: 'Back default'
            },
            {
                original: pokemonSprites.frontShiny,
                thumbnail: pokemonSprites.frontShiny,
                description: 'Front shiny'
            },
            {
                original: pokemonSprites.backShiny,
                thumbnail: pokemonSprites.backShiny,
                description: 'Back shiny'
            }
        ];

        return <ImageGallery items={images} infinite={true} autoPlay={true}/>;

};

CustomCarousel.propTypes = {
    pokemonSprites: pokemonSprites
};

CustomCarousel.defaultProps = {
    pokemonSprites: pokemonSpritesDefault
};

export default CustomCarousel;