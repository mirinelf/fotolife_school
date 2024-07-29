import React, {useEffect, useState} from 'react';
import {MyH2, MyH4} from "../../../06_shared/ui/headings";
import {home} from "../../../06_shared/assets";
import {TMainInfo, useGetLangQuery, useGetMainInfoQuery} from "../../../05_entities/FetchData";
import {useLangStore} from "../../../05_entities/LangInfo";

type ContactsProps = {}

export const Contacts: React.FC<ContactsProps> = ({}) => {
    const {data} = useGetMainInfoQuery()

    const {content} = useLangStore()

    const [mainInfo, setMainInfo] =
        useState<TMainInfo>({} as TMainInfo)

    useEffect(() => {
        data && setMainInfo(data)
    }, [data]);

    return (
        <div className="w-full overflow-hidden mt-24 mb-24" id="contacts">
            <MyH2 styles="uppercase">{content.ourContacts}</MyH2>
            <div className="flex flex-wrap mt-8 gap-y-8
            max-tb:flex-col max-tb:mt-12">
                <div className="flex items-center w-1/2">
                    <img src={home.email} alt="Email" className="h-10"/>
                    <MyH4 styles="ml-10
                    max-ph:ml-6">
                        <a href="mailto:fotolife.school@gmail.com">{mainInfo.info?.email}</a>
                    </MyH4>
                </div>
                <div className="flex items-center w-1/2 max-tb:w-full max-tb:ml-3">
                    <img src={home.geo} alt="Email" className="h-10"/>
                    <MyH4 styles="ml-10 w-[52%]
                    max-tb:w-[100%] max-tb:ml-12
                    max-ph:w-[50vw] max-ph:ml-8">
                        <a href={mainInfo.info?.geo_location ?? ''}
                           className="uppercase">
                            {mainInfo.info?.text}</a>
                    </MyH4>
                </div>
                <div className="flex items-center max-tb:ml-2">
                    <img src={home.phone} alt="Email" className="h-10"/>
                    <MyH4 styles="ml-12
                    max-ph:ml-6">
                        <a href="tel:58256779">{mainInfo.info?.phone}</a>
                    </MyH4>
                </div>
            </div>
        </div>
    );
};