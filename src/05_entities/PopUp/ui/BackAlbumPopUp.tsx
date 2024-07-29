import React, {useEffect, useState} from 'react';
import {MyH2} from "../../../06_shared/ui/headings";
import {Button, ESizes, EType} from "../../Buttons";
import {useGetAlbumUploadPhotoQuery} from "../../FetchData";
import {usePopUpStore} from "../model/usePopUpStore";
import {useShopStore} from "../../ShopCart";
import {useLangStore} from "../../LangInfo";

type BackAlbumPopUpProps = {}

export const BackAlbumPopUp: React.FC<BackAlbumPopUpProps> = ({
        
}) => {
    const {lastAlbumId, setIsDifferentAlbums} = usePopUpStore()
    const {clearPurchase} = useShopStore()

    const {data: fetchAlbumData} = useGetAlbumUploadPhotoQuery(lastAlbumId)

    const [nameAlbum, setNameAlbum] =
        useState<string>()

    const {content, setLang} = useLangStore()

    useEffect(() => {
        fetchAlbumData &&
            setNameAlbum(fetchAlbumData.title)
    }, [fetchAlbumData]);

    return (
        <div className="fixed w-full h-full bg-black/[0.65] z-[110] backdrop-blur-sm
        flex justify-center items-center">
            <form className="w-[55vw] py-14 px-12 bg-white rounded-3xl gap-y-6
            flex flex-col items-center text-center
            max-ph:w-[90vw] max-ph:py-7 max-ph:px-6">
                <MyH2 styles="uppercase !text-2xl
                max-ph:!text-xl">{content.noEndingOrder} {nameAlbum}.
                    <br/>{content.continueWorkInThisAlbum}</MyH2>
                <div className="w-full flex justify-between gap-x-6
                max-ph:gap-x-3">
                    <Button size={ESizes.s} type={EType.border} styles="max-ph:!px-4 w-1/2"
                        onClick={() => {
                            window.location.href = '/gallery?album=' + lastAlbumId;
                            setIsDifferentAlbums(false)
                        }}
                    >
                        {content.justBack}
                    </Button>
                    <Button size={ESizes.s} type={EType.blue} styles="max-ph:!px-4 w-1/2"
                        onClick={() => {
                            clearPurchase()
                            setIsDifferentAlbums(false)
                        }}
                    >
                        {content.continueHere}
                    </Button>
                </div>
            </form>
        </div>
    );
};