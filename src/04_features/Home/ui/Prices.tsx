import React, {useEffect, useState} from 'react';
import {MyH2, MyH4} from "../../../06_shared/ui/headings";
import {MyP2} from "../../../06_shared/ui/paragraph";
import {TShopService, useGetLangQuery, useGetMainInfoQuery} from "../../../05_entities/FetchData";
import {useLangStore} from "../../../05_entities/LangInfo";

type PricesProps = {}

export const Prices: React.FC<PricesProps> = ({}) => {
    const {data} = useGetMainInfoQuery()

    const {content} = useLangStore()

    const [favors, setFavors] = useState<TShopService[]>([])

    const [options, setOptions] = useState<string[]>([])

    useEffect(() => {
        setFavors(data?.services ?? [])
        setOptions(data?.service_disclaimer ?? [])
    }, [data]);

    return (
        <div className="mt-24 w-full overflow-hidden" id="prices">
            <MyH2 styles="uppercase">{content.prices}</MyH2>
            <div className="flex justify-between flex-wrap mt-10
            max-tb:flex-col max-tb:items-center">
                {favors.map((favor, id) => (
                    <div className="w-1/2 flex justify-between pr-10 border-b-[1px]
                        border-solid border-b-black/[0.35] py-5 items-start
                        [&:nth-child(2)]:border-t-black/[0.35] [&:nth-child(2)]:border-t-[1px]
                        first:border-t-black/[0.35] first:border-t-[1px]
                        max-tb:w-full max-tb:first:border-b-transparent"
                         key={id}
                    >
                        <div className="flex flex-col gap-y-2
                        max-ph:basis-[55vw]">
                            <MyH4>{favor.title}</MyH4>
                            <MyP2>{favor.description}</MyP2>
                        </div>
                        <MyH4>€ {favor.price}</MyH4>
                    </div>
                ))}
            </div>
            <ul className="flex flex-col items-start gap-y-2 mt-8">
                {options.map((option, id) => (
                    <li key={id} className="font-montserrat font-light text-base">• {option}</li>
                ))}
            </ul>
        </div>
    );
};