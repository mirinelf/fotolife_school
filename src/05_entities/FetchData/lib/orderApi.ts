import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {TOrder, TRespCreateOrder} from "../model/types";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL}),
    endpoints: (build) => ({
        createOrder: build.mutation<TRespCreateOrder, TOrder>({
            query: (body) => ({
                url: '/shop/order',
                method: 'POST',
                body
            }),
        })
    })
})

export const {useCreateOrderMutation} = orderApi