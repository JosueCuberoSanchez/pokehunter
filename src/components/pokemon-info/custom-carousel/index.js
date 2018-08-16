/**
 * Carousel component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

import { pokemonSprites, pokemonSpritesDefault } from '../../../proptypes/index'

import './custom-carousel.scss';
import connect from "react-redux/es/connect/connect";

const CustomCarousel = ({frontDefault, backDefault, frontShiny, backShiny}) => {

        const images = [
            {
                original: frontDefault,
                thumbnail: frontDefault,
                description: 'Front default'
            },
            {
                original: backDefault,
                thumbnail: backDefault,
                description: 'Back default'
            },
            {
                original: frontShiny,
                thumbnail: frontShiny,
                description: 'Front shiny'
            },
            {
                original: backShiny,
                thumbnail: backShiny,
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

const mapStateToProps = state => {
    return {
        frontDefault: state.pokemon.sprites.frontDefault,
        backDefault: state.pokemon.sprites.backDefault,
        frontShiny: state.pokemon.sprites.frontShiny,
        backShiny: state.pokemon.sprites.backShiny
    };
};

export default connect(mapStateToProps)(CustomCarousel);