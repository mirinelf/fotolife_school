import React from 'react';
import {Navbar, NavbarAdaptive} from "../../../05_entities/Navbar";
import {Payment} from "../../../04_features/Payment";
import {Footer} from "../../../06_shared/ui/footer";

export const ConfirmPaymentPage = () => {
    return (
        <div className="max-w-[100vw] h-screen flex flex-col bg-white">
            <Navbar isEmpty/>
            <NavbarAdaptive/>
            <div className="mx-[5vw] flex-1 flex flex-col justify-between overflow-hidden">
                <Payment/>
                <div className="max-tb:hidden">
                    <Footer/>
                </div>
            </div>
        </div>
    );
};