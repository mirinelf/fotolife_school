import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TListGalleryAlbum, TListGalleryPortfolio} from "../model/types";

export const listGalleryApi = createApi({
    reducerPath: 'listGalleryPortfolioApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    endpoints: (build) => ({
        getGalleryPortfolio: build.query<TListGalleryPortfolio,
            {photo_type: number, page_size: number, page: number}>({
            query: ({photo_type, page, page_size}) => ({
                url: '/main/portfolio',
                params: {
                    photo_type,
                    page,
                    page_size
                }
            })
        }),
        getGalleryAlbum: build.query<TListGalleryAlbum,
            {album: string, photo_type: number, page_size: number, page: number}>({
            query: ({album, photo_type, page, page_size}) => ({
                url: '/gallery',
                params: {
                    album,
                    photo_type,
                    page,
                    page_size
                }
            })
        })
    })
})

export const {useGetGalleryPortfolioQuery, useGetGalleryAlbumQuery,
    useLazyGetGalleryPortfolioQuery, useLazyGetGalleryAlbumQuery} = listGalleryApi