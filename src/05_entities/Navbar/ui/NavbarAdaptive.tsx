import React, {useEffect, useState} from 'react';
import {home} from "../../../06_shared/assets";
import {Button, ESizes, EType} from "../../Buttons";
import {LangSwitcher} from "../../../06_shared/ui/switcher";
import {useGetLangQuery, useSetLanguageMutation} from "../../FetchData";
import {useLocation, useNavigate} from "react-router-dom";
import {useNavbarStore} from "../lib/useNavbarStore";
import {usePopUpStore} from "../../PopUp";
import {usePhotoSliderStore} from "../../PhotoSlider";
import {useLangStore} from "../../LangInfo";

type NavbarAdaptiveProps = {}

export const NavbarAdaptive: React.FC<NavbarAdaptiveProps> = ({}) => {
    const [setLang] = useSetLanguageMutation()
    const {data: lang} = useGetLangQuery()

    const navigate = useNavigate()
    const location = useLocation()

    const {setIsActive, isActive} = useNavbarStore()
    const {content, setLang: setLangStore} = useLangStore()

    const handleSetLang = (newLang: string) => {
        setLang(newLang)
    }

    useEffect(() => {
        if (location.hash === '#portfolio') {
            const portfolioRef = document.getElementById('portfolio')
            portfolioRef && portfolioRef.scrollIntoView({behavior: 'smooth'})
        }

        if (location.hash === '#prices') {
            const portfolioRef = document.getElementById('prices')
            portfolioRef && portfolioRef.scrollIntoView({behavior: 'smooth'})
        }

        if (location.hash === '#contacts') {
            const portfolioRef = document.getElementById('contacts')
            portfolioRef && portfolioRef.scrollIntoView({behavior: 'smooth'})
        }
    }, [location]);

    useEffect(() => {
        lang && setLangStore(lang.language_code)
    }, [lang]);

    if (!isActive)
        return <></>

    return (
        <div className={`${isActive ? 'flex' : 'hidden'} fixed top-0 right-0 z-[100] w-full h-full`}>
            <div className="flex-1 bg-black/[0.5] max-ph:hidden" onClick={() => setIsActive(false)}></div>
            <div className="w-1/2 h-full bg-white px-[5vw] pt-[20px] flex flex-col gap-y-6
            max-ph:w-full">
                <div className="flex flex-col">
                    <div className="w-full flex">
                        <a href="" onClick={(e) => {
                            e.preventDefault()
                            navigate('/')
                            setIsActive(false)
                        }} className="font-montserratAlternates font-medium text-3xl
                            max-ph:text-lg max-ph:text-center">
                            {content.companyName}</a>
                        <button className="ml-auto" onClick={() => {
                            setIsActive(false)
                            console.log('close')
                        }}>
                            <img src={home.close} alt="Close img"/>
                        </button>
                    </div>
                    <div className="w-full h-[1px] mt-[20px] bg-black"/>
                </div>
                <ul className="flex flex-col gap-y-6 items-start
                max-ph:items-center">
                    <a onClick={(e) => {
                        e.preventDefault()
                        navigate('/#portfolio')
                        setIsActive(false)
                    }} className="font-montserrat text-xl font-semibold cursor-pointer">
                        {content.portfolio}</a>
                    <a onClick={(e) => {
                        e.preventDefault()
                        navigate('/#prices')
                        setIsActive(false)
                    }} className="font-montserrat text-xl font-semibold cursor-pointer">
                        {content.favors}</a>
                    <a onClick={(e) => {
                        e.preventDefault()
                        navigate('/#contacts')
                        setIsActive(false)
                    }} className="font-montserrat text-xl font-semibold cursor-pointer">
                        {content.contacts}</a>
                    <Button size={ESizes.s} type={EType.border}>
                        {content.facebook}
                    </Button>
                    <LangSwitcher setLang={handleSetLang}/>
                </ul>
            </div>
        </div>
    );
};