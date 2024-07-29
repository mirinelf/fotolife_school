import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import {AlbumPage} from "./album";
import {HomePage} from "./home";
import {CartPage} from "./cart";
import {NotFoundPage} from "./notFound";
import {CreateAlbumPage} from "./createAlbum";
import {ConfirmPaymentPage} from "./payment/confirm";
import {CancelPaymentPage} from "./payment/cancel";
import {useGetLangQuery} from "../05_entities/FetchData";
import {useLangStore} from "../05_entities/LangInfo";

export const Routing = () => {
    const {data: lang} = useGetLangQuery()

    const {setLang} = useLangStore()

    useEffect(() => {
        lang && setLang(lang.language_code)
    }, [lang]);

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/gallery" element={<AlbumPage/>}/>
            <Route path="/upload-images" element={<CreateAlbumPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/confirm-payment" element={<ConfirmPaymentPage/>}/>
            <Route path="/cancel-payment" element={<CancelPaymentPage/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    );
};