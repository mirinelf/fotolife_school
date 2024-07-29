import React, {useEffect, useMemo, useState} from 'react';
import {MyH2, MyH4} from "../../../06_shared/ui/headings";
import {MyP1} from "../../../06_shared/ui/paragraph";
import {cart} from "../../../06_shared/assets";
import {Counter} from "../../../06_shared/ui/counter";
import {Button, ESizes, EType} from "../../../05_entities/Buttons";
import {usePopUpStore} from "../../../05_entities/PopUp";
import {TShopService, useGetShopServicesQuery} from "../../../05_entities/FetchData";
import {TPurchase, useShopStore} from "../../../05_entities/ShopCart";
import {useNavigate} from "react-router-dom";
import {validateName} from "../lib/validateName";
import {usePhotoSliderStore} from "../../../05_entities/PhotoSlider";
import {useLangStore} from "../../../05_entities/LangInfo";

type CartProps = {}

export const Cart: React.FC<CartProps> = ({}) => {
    const {setIsActiveCart} = usePopUpStore()
    const {setPhotos, setActiveId, setIsActive} = usePhotoSliderStore()
    const {purchases, setService, delPurchaseById,
        setSum, albumId} = useShopStore()
    const {content} = useLangStore()
    
    const {data: fetchShopServices} = useGetShopServicesQuery()

    const [errors, setErrors] =
        useState<Map<string, boolean>>(new Map())

    const [shopServices, setShopServices] =
        useState<TShopService[]>([])

    const navigate = useNavigate()

    const totalSum = useMemo<number>(() => {
        return Object.keys(purchases).reduce((sum, purKey) => {
            return sum+=purchases[purKey].sum
        }, 0)
    }, [purchases])

    const handleCreateOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        Object.keys(purchases).reduce((isOpenPopUp, purKey) => {
            if (purchases[purKey].sum === 0) {
                setErrors(prevState => new Map(prevState.set(purKey, true)))
                return false
            }
            setErrors(prevState => {
                const newState = new Map(prevState);
                newState.delete(purKey);
                return newState
            })
            return isOpenPopUp && true
        }, true) && setIsActiveCart(true)
    };

    const handleAddService = (purKey: string, idService: number, newValue: number) => {
        setService(purKey, idService, newValue)
        const newSum = Object.keys(purchases[purKey].services).reduce((sum, serKey) => {
            const shopServicePrice = shopServices.find(shopService =>
                shopService.id === parseInt(serKey))?.price ?? '0'
            sum+=parseFloat(shopServicePrice)*purchases[purKey].services[parseInt(serKey)]
            return sum
        }, 0)
        setSum(purKey, newSum)
    }

    useEffect(() => {
        setIsActiveCart(false)

        !albumId &&
            navigate('/notFoundAlbum')
    }, []);

    useEffect(() => {
        fetchShopServices && setShopServices(fetchShopServices)
    }, [fetchShopServices]);

    const handleDelOrder = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        delPurchaseById(id)
    };

    return (
        <>
            <div className="flex flex-col mb-24 max-tb:hidden">
                <div className="flex items-center mt-12">
                    <MyH2 styles="uppercase">{content.cart}</MyH2>
                    <button className="cursor-pointer" onClick={(e) =>
                        navigate(`/gallery?album=${albumId}`)}>
                        <MyP1 styles="w-[150px] opacity-50">{content.back}</MyP1>
                    </button>
                </div>
                <div className="grid grid-cols-10 mt-6">
                    <div className="col-span-2 flex flex-col">
                        <MyH4 styles="font-medium border-solid border-b-black/[0.35] border-b-[1px]
                    py-4 text-end px-6">{content.name}</MyH4>
                    </div>
                    <div className="col-span-3">
                        <MyH4 styles="font-medium border-solid border-b-black/[0.35] border-b-[1px]
                    py-4 px-6">{content.format}</MyH4>
                    </div>
                    <div className="col-span-1">
                        <MyH4 styles="font-medium border-solid border-b-black/[0.35] border-b-[1px]
                    py-4 px-6 text-end">{content.price}</MyH4>
                    </div>
                    <div className="col-span-2 text-center">
                        <MyH4 styles="font-medium border-solid border-b-black/[0.35] border-b-[1px]
                    py-4 px-6">{content.count}</MyH4>
                    </div>
                    <div className="col-span-2">
                        <MyH4 styles="font-medium border-solid border-b-black/[0.35] border-b-[1px]
                    py-4 px-6">{content.totalPrice}</MyH4>
                    </div>
                </div>
                {Object.keys(purchases).length === 0 &&
                    <div className="flex my-24 text-center">
                        <MyH2>{content.notFoundFavors}</MyH2>
                    </div>
                }
                {Object.keys(purchases).map((purKey, id) => (
                    <React.Fragment key={purKey}>
                        <div className={`grid grid-cols-10 mt-6 ${!errors.has(purKey) &&
                        'border-solid border-b-black/[0.35] border-b-[1px] pb-6'}`} key={purKey}>
                            <div className="col-span-2 flex flex-col px-6 gap-y-8">
                                <div className="flex justify-between">
                                    <MyP1>{id + 1 < 10 && "0"}{id + 1}</MyP1>
                                    <MyP1>{validateName(purchases[purKey].file)}</MyP1>
                                </div>
                                <img src={purchases[purKey].file} alt="Cart image"
                                     className="w-1/2 ml-auto rounded-2xl"
                                     onClick={() => {
                                         setActiveId(purKey)
                                         setPhotos(Object.keys(purchases).map(purKey =>
                                             ({id: purKey, photoType: purchases[purKey].photoType, file: purchases[purKey].file})))
                                         setIsActive(true)
                                     }}
                                />
                            </div>
                            <div className="col-span-3 flex flex-col px-6 gap-y-8">
                                {shopServices.map(shopService => purchases[purKey] &&
                                    shopService.photo_type === purchases[purKey].photoType && (
                                        <MyP1 key={shopService.id + purKey}>{shopService.title}</MyP1>
                                    ))}
                            </div>
                            <div className="col-span-1 flex flex-col px-6 gap-y-8 text-end font-semibold">
                                {shopServices.map(shopService => purchases[purKey] &&
                                    shopService.photo_type === purchases[purKey].photoType && (
                                        <MyP1 key={shopService.id + purKey}>€ {shopService.price}</MyP1>
                                    ))}
                            </div>
                            <div className="col-span-2 flex flex-col px-6 gap-y-[21px] items-center">
                                {shopServices.map(shopService => purchases[purKey] &&
                                    shopService.photo_type === purchases[purKey].photoType && (
                                        <Counter value={purchases[purKey].services[shopService.id]}
                                                 key={purKey + shopService.id}
                                                 updateValue={(newValue) =>
                                                     handleAddService(purKey, shopService.id, newValue)}/>
                                    ))}
                            </div>
                            <div className="col-span-2 flex px-6 gap-y-8 font-semibold items-start">
                                <MyP1>€ {purchases[purKey].sum}</MyP1>
                                <button className="ml-auto mt-2" onClick={(e) =>
                                    handleDelOrder(e, purKey)}>
                                    <img src={cart.close} alt="Close shop" className="w-1/2"/>
                                </button>
                            </div>
                        </div>
                        <div className={`grid grid-cols-10 border-solid border-b-black/[0.35] border-b-[1px] py-6
                            ${errors.has(purKey) ? 'opacity-100' : 'opacity-0 py-0 h-0'}
                            transition-all ease-in-out duration-500`}>
                            <div className="col-span-1 px-6"></div>
                            <div className="col-span-9 bg-red text-white px-3 py-1 rounded-xl">
                                <MyP1 styles="text-white text-lg">{content.warningChooseFormat}</MyP1>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
                <div className="flex justify-between items-center mt-6">
                    {Object.keys(purchases).length !== 0 &&
                        <>
                            <MyH2 styles="uppercase">{content.total}: € {totalSum.toFixed(2)}</MyH2>
                            <Button size={ESizes.s} type={EType.blue} styles="rounded-full"
                                    onClick={handleCreateOrder}>
                                <p className="py-1 px-10 text-base">{content.confirmFavor}</p>
                            </Button>
                        </>}
                </div>
            </div>
            <div className="tb:hidden flex flex-col">
                <div className="flex items-center mt-12">
                    <MyH2 styles="uppercase">{content.cart}</MyH2>
                    <button className="cursor-pointer" onClick={(e) =>
                        navigate(`/gallery?album=${albumId}`)}>
                        <MyP1 styles="w-[150px] opacity-50">{content.back}</MyP1>
                    </button>
                </div>
                <div className="flex flex-col mt-12">
                    {Object.keys(purchases).map((purKey, id) => (
                        <div className="flex flex-col border-solid border-b-[1px] border-b-black
                    first:border-t-[1px] first:border-t-black py-6 gap-y-6"
                             key={purKey}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <MyP1 styles="text-xl">{id + 1 < 10 && "0"}{id + 1}</MyP1>
                                <img src={purchases[purKey].file} alt="Img cart" className="w-1/6 rounded-2xl"
                                     onClick={() => {
                                         setActiveId(purKey)
                                         setPhotos(Object.keys(purchases).map(purKey =>
                                             ({
                                                 id: purKey,
                                                 photoType: purchases[purKey].photoType,
                                                 file: purchases[purKey].file
                                             })))
                                         setIsActive(true)
                                     }}
                                />
                                <div className="flex flex-col gap-y-6">
                                    <MyP1>{validateName(purchases[purKey].file)}</MyP1>
                                    <MyP1 styles="text-xl font-semibold">{content.totalPrice}: € {purchases[purKey].sum}</MyP1>
                                </div>
                                <button onClick={(e) =>
                                    handleDelOrder(e, purKey)}>
                                    <img src={cart.close} alt="Close shop" className="w-[3vw]"/>
                                </button>
                            </div>
                            {shopServices.map(shopService => purchases[purKey] &&
                                shopService.photo_type === purchases[purKey].photoType && (
                                    <div className="flex justify-between items-center"
                                         key={purKey + shopService.id}
                                    >
                                        <MyP1 styles="text-xl basis-1/3
                                        max-ph:basis-1/3">{shopService.title}</MyP1>
                                        <MyP1 styles="font-semibold text-xl mx-3">€ {shopService.price}</MyP1>
                                        <Counter value={purchases[purKey].services[shopService.id]}
                                                 key={purKey + shopService.id}
                                                 updateValue={(newValue) =>
                                                     handleAddService(purKey, shopService.id, newValue)}/>
                                    </div>
                                )
                            )}
                            <div className={`flex bg-red rounded-3xl px-5 py-2 justify-center text-center
                            ${errors.has(purKey) ? 'opacity-100' : 'opacity-0 px-0 py-0 max-h-0'}
                            transition-all ease-in-out duration-500`}>
                                <MyP1 styles="text-white text-xl">{content.warningChooseFormat}</MyP1>
                            </div>
                        </div>
                    ))}
                </div>
                {Object.keys(purchases).length === 0 && (
                    <div className="py-24">
                        <MyH2 styles="text-center -ml-[1vw]">{content.emptyCart}</MyH2>
                    </div>
                )}
                <div className="flex justify-between items-center mt-12
                max-ph:flex-col max-ph:justify-center max-ph:text-center max-ph:gap-y-6">
                    {Object.keys(purchases).length !== 0 &&
                        <>
                            <MyH2 styles="uppercase">{content.total}: € {totalSum.toFixed(2)}</MyH2>
                            <Button size={ESizes.s} type={EType.blue} onClick={handleCreateOrder}
                                    styles={'!px-6'}
                            >
                                {content.confirmFavor}</Button>
                        </>}
                </div>
            </div>
        </>
    );
};