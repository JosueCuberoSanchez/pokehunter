/**
 * Carousel component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'

import { pokemonSprites, pokemonSpritesDefault } from '../../../proptypes/index'

import './custom-carousel.scss';

const CustomCarousel = ({sprites}) => {

        function getImages() {
            if(sprites.backDefault !== null) { // some pokemon dont have back sprites
                return [
                    {
                        original: sprites.frontDefault,
                        thumbnail: sprites.frontDefault,
                        description: 'Front default'
                    },
                    {
                        original: sprites.backDefault,
                        thumbnail: sprites.backDefault,
                        description: 'Back default'
                    },
                    {
                        original: sprites.frontShiny,
                        thumbnail: sprites.frontShiny,
                        description: 'Front shiny'
                    },
                    {
                        original: sprites.backShiny,
                        thumbnail: sprites.backShiny,
                        description: 'Back shiny'
                    }
                ]
            } else {
                return [
                    {
                        original: sprites.frontDefault,
                        thumbnail: sprites.frontDefault,
                        description: 'Front default'
                    },
                    {
                        original: sprites.frontShiny,
                        thumbnail: sprites.frontShiny,
                        description: 'Front shiny'
                    }
                ]
            }
        }

        return <ImageGallery items={getImages()} infinite={true} autoPlay={true}/>;

};

CustomCarousel.propTypes = {
    sprites: pokemonSprites
};

CustomCarousel.defaultProps = {
    sprites: pokemonSpritesDefault
};

export default CustomCarousel;