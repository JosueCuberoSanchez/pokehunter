/**
 * Carousel component.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import './custom-carousel.scss';

class CustomCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            frontDefault: props.sprites[0],
            backDefault: props.sprites[1],
            frontShiny: props.sprites[2],
            backShiny: props.sprites[3]
        };
    }

    render() {

        const images = [
            {
                original: this.state.frontDefault,
                thumbnail: this.state.frontDefault,
                description: 'Front default'
            },
            {
                original: this.state.backDefault,
                thumbnail: this.state.backDefault,
                description: 'Back default'
            },
            {
                original: this.state.frontShiny,
                thumbnail: this.state.frontShiny,
                description: 'Front shiny'
            },
            {
                original: this.state.backShiny,
                thumbnail: this.state.backShiny,
                description: 'Back shiny'
            }
        ];

        return (
            <ImageGallery items={images} infinite={true} autoPlay={true}/>
        )
    }
}

export default CustomCarousel;