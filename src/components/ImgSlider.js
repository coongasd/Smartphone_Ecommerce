import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImgSlider() {
    let settings = {
        dots : true,
        infinite : true,
        speed : 500,
        slideToShow :1,
        slideToScroll: 1,
        autoplay: true
    }

    return (
         <Carousel {...settings}>
            <Wrap>
                <img src="/images/slider/slider1.png" alt=""/>
            </Wrap>
            <Wrap>
                <img src="/images/slider/slider2.png" alt=""/>
            </Wrap>
            <Wrap>
                <img src="/images/slider/slider3.png" alt=""/>
            </Wrap>
        </Carousel>
    )
}

export default ImgSlider
const Carousel = styled(Slider)`
   
    ul li button{
        &:before{
            font-size: 10px;
            color: rgb(150, 158, 171);
        }
    }
   
    .slick-prev:before, .slick-next:before{
        color: black;
    }
    li.slick-active button:before{
        color: black;
    }

    margin: 0 auto;
    width: 50%;
    button {
        z-index: 1;
    }
`
const Wrap = styled.div`
    cursor: pointer;
    img {
        border: 4px solid transparent;
        border-radius:4px;
        width:100%;
        transition-duration: 300ms;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        &:hover{
            border: 4px solid black;
        }
        img{margin-left:auto;margin-right:auto}
    
        
    }
`