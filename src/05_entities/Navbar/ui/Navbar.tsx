import React, {useEffect, useState} from 'react';
import {Button, ESizes, EType} from "../../Buttons";
import {LangSwitcher} from "../../../06_shared/ui/switcher";
import {TMainInfo, useGetLangQuery, useGetMainInfoQuery, useSetLanguageMutation} from "../../FetchData";
import {ShopCart, useShopStore} from "../../ShopCart";
import {useLocation, useNavigate} from "react-router-dom";
import {home} from "../../../06_shared/assets";
import {useNavbarStore} from "../lib/useNavbarStore";
import {usePopUpStore} from "../../PopUp";
import {useLangStore} from "../../LangInfo";
import {usePhotoSliderStore} from "../../PhotoSlider";

type NavbarProps = {
    isActiveCart?: boolean
    isEmpty?: boolean
}

type TData = {
    companyName: string
    portfolio: string
    favors: string
    contacts: string
    facebook: string
}

export const Navbar: React.FC<NavbarProps> = ({isActiveCart, isEmpty}) => {
    const [setLang] = useSetLanguageMutation()
    const {data: lang} = useGetLangQuery()
    const {data} = useGetMainInfoQuery()

    const navigate = useNavigate()
    const location = useLocation()

    const {purchases} = useShopStore()
    const {setIsActive} = useNavbarStore()
    const {content, setLang: setLangStore} = useLangStore()
    const {setIsActive: setIsActivePhotoSlider, photos, setActiveId} = usePhotoSliderStore()

    const [mainInfo, setMainInfo] =
        useState<TMainInfo>({} as TMainInfo)

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

    useEffect(() => {
        data && setMainInfo(data)
    }, [data]);

    return (
        <nav className="flex flex-col sticky top-0 z-[100] pt-[20px] bg-white/[0.8]
        w-full px-[5vw] backdrop-blur-md">
            <ul className="flex items-center">
                <a href="" onClick={(e) => {
                    e.preventDefault()
                    navigate('/')
                }} className="font-montserratAlternates font-medium text-3xl
                max-ph:text-lg max-ph:text-center">
                    {content.companyName}</a>
                <div className="ml-auto flex gap-x-[40px] items-center max-tb:hidden">
                    {!isEmpty && <>
                            <a href="" onClick={(e) => {
                                e.preventDefault()
                                navigate('/#portfolio')
                            }} className="font-montserrat transition-all ease-in-out duration-500
                            border-b border-transparent hover:border-current">
                                {content.portfolio}</a>
                            <a href="" onClick={(e) => {
                                e.preventDefault()
                                navigate('/#prices')
                            }} className="font-montserrat transition-all ease-in-out duration-500
                            border-b border-transparent hover:border-current">
                                {content.favors}</a>
                            <a href="" onClick={(e) => {
                                e.preventDefault()
                                navigate('/#contacts')
                            }} className="font-montserrat transition-all ease-in-out duration-500
                            border-b border-transparent hover:border-current">
                                {content.contacts}</a>
                            {isActiveCart &&
                                <ShopCart count={Object.keys(purchases).length}
                                          onClick={(e) => {
                                              e.preventDefault()
                                              setIsActive(false)
                                              navigate('/cart')
                                          }}
                                />}
                            <Button size={ESizes.s} type={EType.border}>
                                <a href={mainInfo.info && mainInfo.info.facebook} target="_blank">
                                    {content.facebook}
                                </a>
                            </Button>
                            <LangSwitcher setLang={handleSetLang}/>
                        </>}
                </div>
                <div className="tb:hidden ml-auto items-center flex gap-x-8
                max-ph:gap-x-6">
                    {isActiveCart &&
                        <ShopCart count={Object.keys(purchases).length}
                                  onClick={() => navigate('/cart')}
                        />}
                    <button onClick={() => setIsActive(true)}>
                        <img src={home.burger} alt="Img burger"
                             className="max-ph:w-[7vw]"
                        />
                    </button>
                </div>
            </ul>
            <div className="w-full h-[1px] mt-[20px] bg-black/[0.35]"/>
        </nav>
    );
};