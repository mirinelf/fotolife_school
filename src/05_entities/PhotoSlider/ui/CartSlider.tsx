import React, {useEffect, useState} from 'react';
import {photoSlider} from "../../../06_shared/assets";
import {usePhotoSliderStore} from "../model/usePhotoSliderStore";
import {MyH3} from "../../../06_shared/ui/headings/MyH3";
import {MyP1} from "../../../06_shared/ui/paragraph";
import {Counter} from "../../../06_shared/ui/counter";
import {Button, ESizes, EType} from "../../Buttons";
import {useShopStore} from "../../ShopCart";
import {TShopService, useGetShopServicesQuery} from "../../FetchData";
import {useNavigate} from "react-router-dom";
import {useAlbumStore} from "../../../04_features/Album";
import {Navbar, NavbarAdaptive} from "../../Navbar";
import {validateName} from "../../../04_features/Cart";
import {useLangStore} from "../../LangInfo";

type CartSliderProps = {}

export const CartSlider: React.FC<CartSliderProps> = ({}) => {
    const {data} = useGetShopServicesQuery()

    const {activeMenu} = useAlbumStore()
    const {setIsActive, photos, activeId, setActiveId, isActive} = usePhotoSliderStore()
    const {addPurchase, setService, isEmpty, delPurchaseById, purchases} = useShopStore()
    const {content} = useLangStore()

    const navigate = useNavigate()

    const [shopServices, setShopServices] =
        useState<TShopService[]>([])

    useEffect(() => {
        !purchases[activeId] && setIsActive(false)
    }, []);

    useEffect(() => {
        data && setShopServices(data)
    }, [data]);

    const handleLastImg = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const currId = photos.findIndex(photo => photo.id === activeId)
        if (currId === 0) {
            const currFile = photos.at(-1)!
            setActiveId(currFile.id)
            isEmpty(activeId as string) && delPurchaseById(activeId as string)
            addPurchase(currFile.id as string, activeMenu, currFile.file)
        } else {
            const currFile = photos[currId-1]
            setActiveId(photos[currId-1].id)
            isEmpty(activeId as string) && delPurchaseById(activeId as string)
            addPurchase(currFile.id as string, activeMenu, currFile.file)
        }
    };

    const handleNextImg = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const currId = photos.findIndex(photo => photo.id === activeId)
        if (currId + 1 === photos.length) {
            const currFile = photos.at(0)!
            setActiveId(currFile.id)
            isEmpty(activeId as string) && delPurchaseById(activeId as string)
            addPurchase(currFile.id as string, activeMenu, currFile.file)
        } else {
            const currFile = photos[currId+1]
            setActiveId(currFile.id)
            isEmpty(activeId as string) && delPurchaseById(activeId as string)
            addPurchase(currFile.id as string, activeMenu, currFile.file)
        }
    };

    const handleAddService = (newValue: number, serviceId: number) => {
        setService(activeId as string, serviceId, newValue)
    };

    const handleCloseSlider = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        isEmpty(activeId as string) && delPurchaseById(activeId as string)
        setIsActive(false)
    };

    return (
        <div className="fixed w-full h-full bg-white z-50 flex justify-between px-10 py-20 gap-x-8
        max-tb:flex-col max-tb:p-0">
            <button onClick={handleLastImg} className="max-tb:hidden">
                <img src={photoSlider.arrowLeft} alt="Arrow left"
                     className="h-[4vw] transition-all ease-in-out duration-500 hover:opacity-80"/>
            </button>
            <div className="tb:hidden">
                <Navbar isActiveCart/>
                <NavbarAdaptive/>
            </div>
            <div className="flex items-center gap-x-12 overflow-hidden justify-center
            max-tb:flex-col max-tb:gap-y-12 max-tb:overflow-auto max-tb:px-[5vw] max-tb:py-12 max-tb:justify-start
            max-ph:py-6 max-ph:gap-y-6">
                <MyH3 styles="max-ph:text-2xl max-ph:text-center hidden max-ph:block">
                    {validateName(photos.find(photo => photo.id === activeId)!.file)}</MyH3>
                <img src={photos.find(photo => photo.id === activeId)!.file}
                     alt="Album img"
                     className="w-1/2
                     max-tb:w-full"
                />
                <div className="flex flex-col gap-y-12
                max-ph:gap-y-6">
                    <MyH3 styles="max-ph:hidden text-3xl text-center">
                        {validateName(photos.find(photo => photo.id === activeId)!.file)}</MyH3>
                    {shopServices.map(shopService => shopService.photo_type === photos[0].photoType && (
                        <div className="flex justify-between
                        max-ph:gap-x-8" key={activeId + shopService.id.toString()}>
                            <MyP1 styles="text-xl">{shopService.title}</MyP1>
                            <Counter value={purchases[activeId].services[shopService.id] ?? 0}
                                     key={activeId + shopService.id.toString() + shopService.photo_type}
                                     updateValue={(newValue) =>
                                         handleAddService(newValue, shopService.id)}/>
                        </div>
                    ))}
                    <div className="flex justify-between gap-x-6 whitespace-nowrap
                    max-ph:gap-x-1">
                        <Button size={ESizes.s} type={EType.border} onClick={() => {
                            delPurchaseById(activeId as string)
                            setIsActive(false)
                        }}>
                            {content.delCart}
                        </Button>
                        <Button size={ESizes.s} type={EType.blue} onClick={() => {
                            setIsActive(false)
                        }}>
                            {content.goToCart}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex items-center
            max-tb:hidden">
                <button onClick={handleNextImg}>
                    <img src={photoSlider.arrowRight} alt="Arrow right"
                         className="h-[4.5vw] transition-all ease-in-out duration-500 hover:opacity-80"/>
                </button>
                <button className="absolute right-10 top-20" onClick={handleCloseSlider}>
                    <img src={photoSlider.close} alt="Close"
                         className="transition-all ease-in-out duration-500 hover:opacity-80"/>
                </button>
            </div>
        </div>
    );
};