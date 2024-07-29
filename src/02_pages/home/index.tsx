import React from 'react';
import {Navbar, NavbarAdaptive} from "../../05_entities/Navbar";
import {Banner, Contacts, Portfolio, Prices, Schedule, Start} from "../../04_features/Home";
import {Footer} from "../../06_shared/ui/footer";
import {PhotoSlider, usePhotoSliderStore} from "../../05_entities/PhotoSlider";
import {ScrollUp} from "../../05_entities/ScrollUp";
import {CookiePopUp} from "../../05_entities/PopUp";

export const HomePage = () => {
    const {isActive} = usePhotoSliderStore()

    if (isActive)
        return <PhotoSlider/>

    return (
        <div className="max-w-[100vw] h-full flex flex-col bg-white">
            <Navbar/>
            <NavbarAdaptive/>
            <CookiePopUp/>
            <div className="mx-[5vw] flex-1 flex flex-col">
                <Start/>
                <Portfolio/>
            </div>
            <Banner/>
            <div className="mx-[5vw] flex-1 flex flex-col">
                <Prices/>
                <Schedule/>
                <Contacts/>
                <ScrollUp/>
                <Footer/>
            </div>
        </div>
    );
};