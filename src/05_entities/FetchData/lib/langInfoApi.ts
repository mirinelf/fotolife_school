import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    TGalleryAlbumPhotoTypes,
    TGalleryPortfolioPhotoType,
    TMainInfo,
    TPayment, TRespAlbumUploadPhoto,
    TRespLanguageCode,
    TShopService
} from "../model/types";

export const langInfoApi = createApi({
    reducerPath: 'langInfoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        credentials: 'include'
    }),
    tagTypes: ['Lang'],
    endpoints: (build) => ({
        getMainInfo: build.query<TMainInfo, void>({
            query: () => ({
                url: '/main/info',
                credentials: 'include'
            }),
            providesTags: ['Lang']
        }),
        getLang: build.query<TRespLanguageCode, void>({
            query: () => ({
                url: '/main/language'
            }),
            providesTags: ['Lang']
        }),
        getGalleryPortfolioPhotoTypes: build.query<TGalleryPortfolioPhotoType[], void>({
            query: () => ({
                url: '/gallery/photo-types'
            }),
            providesTags: ['Lang']
        }),
        getGalleryAlbumPhotoTypes: build.query<TGalleryAlbumPhotoTypes, string>({
            query: (album_id) => ({
                url: `/gallery/album/${album_id}`
            }),
            providesTags: ['Lang']
        }),
        getAlbumUploadPhoto: build.query<TRespAlbumUploadPhoto, string>({
            query: (uid) => ({
                url: '/gallery/album-upload-photo/'+uid
            }),
            providesTags: ['Lang']
        }),
        getShopServices: build.query<TShopService[], void>({
            query: () => ({
                url: `/shop/services`
            }),
            providesTags: ['Lang']
        }),
        getConfirmPayment: build.query<void, TPayment>({
            query: ({paymentId}) => ({
                url: '/shop/confirm-payment',
                params: {
                    paymentId
                }
            }),
            providesTags: ['Lang']
        }),
        getCancelPayment: build.query<void, TPayment>({
            query: ({paymentId}) => ({
                url: '/shop/cancel-payment',
                params: {
                    paymentId
                }
            }),
            providesTags: ['Lang']
        }),
        setLanguage: build.mutation<void, string>({
            query: (lang) => ({
                url: `/main/language/${lang}`,
                method: 'POST',
            }),
            invalidatesTags: ['Lang']
        })
    })
})

export const {
    useSetLanguageMutation,
    useGetMainInfoQuery,
    useGetGalleryAlbumPhotoTypesQuery,
    useLazyGetGalleryAlbumPhotoTypesQuery,
    useGetGalleryPortfolioPhotoTypesQuery,
    useGetShopServicesQuery,
    useGetAlbumUploadPhotoQuery,
    useLazyGetAlbumUploadPhotoQuery,
    useGetCancelPaymentQuery,
    useGetConfirmPaymentQuery,
    useLazyGetCancelPaymentQuery,
    useLazyGetConfirmPaymentQuery,
    useGetLangQuery
} = langInfoApi