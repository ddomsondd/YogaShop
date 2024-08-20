import React from "react";
import Newsletter from "../Components/Newsletter/Newsletter";
import AboutYoga from "../Components/About/AboutYoga/AboutYoga";
import Pluses from "../Components/About/Pluses/Pluses";
import OurShop from "../Components/About/OurShop/OurShop";
import Hero from "../Components/About/Hero/Hero";

const About = () => {
    return (
        <div>
            <Hero/>
            <AboutYoga/>
            <Pluses/>
            <OurShop/>
            <Newsletter/> 
        </div>
    )
}

export default About;