import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {TReqUploadAlbumPhotos} from "../model/types";

export const loadAlbumApi = createApi({
    reducerPath: 'loadAlbumApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    endpoints: (build) => ({
        uploadAlbumPhotos: build.mutation<void, TReqUploadAlbumPhotos>({
            query: (arg) => ({
                url: '/gallery/upload-photos',
                method: 'POST',
                body: arg
            })
        })
    })
})

export const { useUploadAlbumPhotosMutation}
    = loadAlbumApi