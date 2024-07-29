import React, {useEffect, useState} from 'react';
import {MyH2, MyH4} from "../../../06_shared/ui/headings";
import {Button, ESizes, EType} from "../../../05_entities/Buttons";
import {home} from "../../../06_shared/assets";
import {TMainInfo, useGetLangQuery, useGetMainInfoQuery} from "../../../05_entities/FetchData";
import {useLangStore} from "../../../05_entities/LangInfo";

type BannerProps = {}

export const Banner: React.FC<BannerProps> = ({}) => {
    const {data} = useGetMainInfoQuery()

    const {content} = useLangStore()

    const [mainInfo, setMainInfo] =
        useState<TMainInfo>({} as TMainInfo)

    useEffect(() => {
        data && setMainInfo(data)
    }, [data]);

    return (
        <div className="w-[100wv] relative overflow-hidden flex items-center justify-center bg-primary mt-64 py-12
        max-tb:pt-16 max-tb:pb-64
        max-ph:pt-0 max-ph:mt-32">
            <div className="flex-1 flex flex-col px-[5vw] items-start
            max-ph:mt-16 max-ph:items-center max-ph:text-center">
                <MyH2 styles="text-white mb-4 uppercase w-[79%]">
                    {mainInfo.title_for_about}</MyH2>
                <MyH4 styles="text-white mb-8">{mainInfo.subtitle_for_about}</MyH4>
                <Button size={ESizes.s} type={EType.white} styles={"max-ph:mb-6"}>
                    <a href={mainInfo.info && mainInfo.info.instagram} className="ph:hidden w-[130px] !px-6" target="_blank">
                        {content.subscribe}
                    </a>
                    <a href={mainInfo.info && mainInfo.info.instagram} className="max-ph:hidden" target="_blank">
                        {content.subscribe}
                    </a>
                </Button>
            </div>
            <img src={home.thesisPana} alt="Thesis pana"
                 className="w-1/4 mr-24
                 max-tb:absolute max-tb:right-0 max-tb:bottom-6 max-tb:w-[45%]
                 max-ph:w-[65%] max-ph:translate-x-[5%]"
            />
        </div>
    );
};