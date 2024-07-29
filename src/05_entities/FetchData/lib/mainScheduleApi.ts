import {TSchedule} from "../model/types";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type TScheduleResp = TSchedule[]

export const mainScheduleApi = createApi({
    reducerPath: 'scheduleApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    endpoints: (builder) => ({
        getMainSchedule: builder.query<TSchedule[], string>({
            query: (date__gte) => ({
                url: '/main/schedule',
                params: {
                    date__gte
                }
            })
        }),
    }),
})

export const {useGetMainScheduleQuery} = mainScheduleApi