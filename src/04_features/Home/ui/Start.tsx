import React, {useEffect, useState} from 'react';
import {Button, ESizes, EType} from "../../../05_entities/Buttons";
import {home} from "../../../06_shared/assets";
import {MyH2, MyH4} from "../../../06_shared/ui/headings";
import {TMainInfo, useGetLangQuery, useGetMainInfoQuery} from "../../../05_entities/FetchData";
import {useLocation, useNavigate} from "react-router-dom";
import {useLangStore} from "../../../05_entities/LangInfo";

type StartProps = {}

export const Start: React.FC<StartProps> = () => {
    const [mainInfo, setMainInfo] =
        useState<TMainInfo>({} as TMainInfo)

    const {data: fetchMainInfo} = useGetMainInfoQuery()

    const {content} = useLangStore()

    const navigate = useNavigate()

    useEffect(() => {
        fetchMainInfo && setMainInfo(fetchMainInfo)
    }, [fetchMainInfo]);

    return (
        <div className="flex w-full py-[25vh] relative overflow-hidden
        max-tb:flex-col max-tb:gap-y-12 max-tb:py-[10vh]">
            <div className="flex flex-col items-start w-[55vw]
            max-ph:items-center max-ph:text-center max-tb:w-auto">
                <MyH2 styles="mb-4 max-tb:w-[400px]
                max-ph:w-[80vw]">
                    {mainInfo.title}
                </MyH2>
                <MyH4 styles="w-[500px] mb-10
                max-ph:w-[90vw]">
                    {mainInfo.description}
                </MyH4>
                <Button size={ESizes.s} type={EType.blue} onClick={(e) => {
                    e.preventDefault()
                    navigate('#contacts')
                }}
                        styles={'max-ph:!px-6 max-ph:!text-lg'}
                >
                    {content.makeFavor}
                </Button>
            </div>
            <img src={home.students} alt="People image"
                 className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw]
                 max-tb:relative max-tb:top-0 max-tb:translate-y-0 max-tb:w-auto"/>
        </div>
    );
};