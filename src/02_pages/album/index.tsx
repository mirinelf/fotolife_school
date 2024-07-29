import React, {useEffect, useState} from 'react';
import {Navbar} from "../../05_entities/Navbar";
import {PhotoAlbum} from "../../04_features/Album";
import {Footer} from "../../06_shared/ui/footer";
import {AlbumPopUp, BackAlbumPopUp, usePopUpStore} from "../../05_entities/PopUp";
import {useParams, useSearchParams} from "react-router-dom";
import {TPayment, useLazyGetGalleryAlbumPhotoTypesQuery} from "../../05_entities/FetchData";
import {NotFoundPage} from "../notFound";
import {AlbumSlider, usePhotoSliderStore} from "../../05_entities/PhotoSlider";

export const AlbumPage = () => {
    const [searchParams] = useSearchParams()

    const [trigger, {isError}] =
        useLazyGetGalleryAlbumPhotoTypesQuery()

    const {isActive, setIsActive} = usePhotoSliderStore()

    const {isDifferentAlbums} = usePopUpStore()

    useEffect(() => {
        searchParams && searchParams.get('album') !== null &&
            trigger(searchParams.get('album')!)
        setIsActive(false)
    }, [searchParams]);

    if (isError)
        return <NotFoundPage/>

    if (isActive)
        return <AlbumSlider/>

    return (
        <div className="max-w-[100vw] h-full flex flex-col bg-white">
            <Navbar isActiveCart/>
            <div className="mx-[5vw] flex-1 flex flex-col">
                <PhotoAlbum/>
                <Footer/>
            </div>
            <AlbumPopUp/>
            {isDifferentAlbums && (
                <BackAlbumPopUp/>
            )}
        </div>
    );
};