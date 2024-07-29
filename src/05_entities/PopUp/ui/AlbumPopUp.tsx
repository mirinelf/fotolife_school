import React, {useEffect, useState} from 'react';
import {MyH2} from "../../../06_shared/ui/headings";
import {Button, ESizes, EType} from "../../Buttons";
import {MyP1} from "../../../06_shared/ui/paragraph";
import {Counter} from "../../../06_shared/ui/counter";
import {usePopUpStore} from "../model/usePopUpStore";
import {useNavigate} from "react-router-dom";
import {TPurchase, useShopStore} from "../../ShopCart";
import {TShopService, useGetLangQuery, useGetShopServicesQuery} from "../../FetchData";
import {Navbar} from "../../Navbar";
import {useLangStore} from "../../LangInfo";

type AlbumPopUpProps = {}

export const AlbumPopUp: React.FC<AlbumPopUpProps> = ({}) => {
    const {isActiveAlbum, setIsActiveAlbum, activeId} = usePopUpStore()
    const {purchases, setService, setSum} = useShopStore()
    const {content} = useLangStore()

    const {data: fetchShopServices} = useGetShopServicesQuery()

    const [shopServices, setShopServices] =
        useState<TShopService[]>(fetchShopServices ?? [])

    const navigate = useNavigate()

    const handleContinueVue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsActiveAlbum(false, activeId)
    };

    const handleCreateOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate('/cart')
        setIsActiveAlbum(false, activeId)
    };

    useEffect(() => {
        fetchShopServices &&
            setShopServices(fetchShopServices)
    }, [fetchShopServices]);

    const handleAddService = (serviceId: number, newValue: number) => {
        setService(activeId, serviceId, newValue)
        const newSum = Object.keys(purchases[activeId].services).reduce((sum, serKey) => {
            const shopServicePrice = shopServices.find(shopService =>
                shopService.id === parseInt(serKey))?.price ?? '0'
            sum+=parseFloat(shopServicePrice)*purchases[activeId].services[parseInt(serKey)]
            return sum
        }, 0)
        setSum(activeId, newSum)
    };

    return (
        <div className={`fixed z-[80] bg-black/[0.5] w-full h-full justify-center items-center
        ${isActiveAlbum ? 'flex' : 'hidden'}`}
        >
            <form className="flex flex-col bg-white py-8 rounded-3xl gap-y-8 items-center text-center w-[550px]
            max-tb:w-full max-tb:h-full max-tb:rounded-none
            max-ph:gap-y-12"
                  onSubmit={(e) => {
                      e.preventDefault()
                  }}
            >
                <div className="tb:hidden w-full -mt-8">
                    <Navbar isActiveCart/>
                </div>
                <MyH2 styles="text-[31px] uppercase !leading-[38.09px]
                max-tb:ml-[1vw] max-tb:w-full
                max-ph:w-[80%] max-ph:ml-0 max-ph:text-[20px]">
                    {content.choose}<br/> {content.formatPhoto}
                </MyH2>
                <div className="flex-1 flex flex-col gap-y-6
                max-tb:gap-y-12 max-tb:mt-8
                max-ph:gap-y-8">
                    {shopServices.map(shopService => purchases[activeId] &&
                        shopService.photo_type === purchases[activeId].photoType && (
                            <div className="flex justify-between" key={shopService.id}>
                                <MyP1 styles="text-xl mr-6">{shopService.title}</MyP1>
                                <Counter value={0} key={activeId + shopService.id}
                                         updateValue={(newValue) =>
                                             handleAddService(shopService.id, newValue)}/>
                            </div>
                        ))}
                </div>
                <div className="flex gap-x-2">
                    <Button size={ESizes.s} type={EType.border} styles="px-[18px]"
                            onClick={handleContinueVue}>
                        {content.continueView}
                    </Button>
                    <Button size={ESizes.s} type={EType.blue} styles="px-[18px]"
                            onClick={handleCreateOrder}>
                        {content.checkOut}
                    </Button>
                </div>
            </form>
        </div>
    );
};