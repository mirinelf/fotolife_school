import React from 'react';
import {Navbar, NavbarAdaptive} from "../../05_entities/Navbar";
import {Cart} from "../../04_features/Cart";
import {Footer} from "../../06_shared/ui/footer";
import {CartPopUp} from "../../05_entities/PopUp";
import {CartSlider, usePhotoSliderStore} from "../../05_entities/PhotoSlider";

export const CartPage = () => {
    const {isActive} = usePhotoSliderStore()

    if (isActive)
        return <CartSlider/>

    return (
        <div className="max-w-[100vw] h-full flex flex-col bg-white relative">
            <Navbar isActiveCart/>
            <NavbarAdaptive/>
            <div className="mx-[5vw] flex-1 flex flex-col overflow-hidden gap-y-24">
                <Cart/>
                <Footer/>
            </div>
            <CartPopUp/>
        </div>
    );
};