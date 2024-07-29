import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {langInfoApi, listGalleryApi, loadAlbumApi, mainScheduleApi, orderApi} from "../05_entities/FetchData";

export const appStore = configureStore({
    reducer: {
        [mainScheduleApi.reducerPath]: mainScheduleApi.reducer,
        [langInfoApi.reducerPath]: langInfoApi.reducer,
        [listGalleryApi.reducerPath]: listGalleryApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [loadAlbumApi.reducerPath]: loadAlbumApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(mainScheduleApi.middleware)
            .concat(langInfoApi.middleware)
            .concat(listGalleryApi.middleware)
            .concat(orderApi.middleware)
            .concat(loadAlbumApi.middleware)
})

setupListeners(appStore.dispatch)