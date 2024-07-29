import React, {useEffect, useState} from 'react';
import {MyP1} from "../paragraph";
import {useGetLangQuery, useGetMainInfoQuery} from "../../../05_entities/FetchData";
import {useLangStore} from "../../../05_entities/LangInfo";

type FooterProps = {}

const fetchInfo = {
    "email": "fotolife.school@gmail.com",
    "phone": "+37258256779",
    "text": "PHOTOBOUTIQUE OU Reg №: 12430562\r\nEE491010220236822220 \r\nTallinn, 10113",
    "privacy_policy": "/media/privacy_policy/privacy_policy.pdf",
    "facebook": "https://www.facebook.com/FotolifeSchool",
    "instagram": "https://www.instagram.com/fotolife_sport/",
    "geo_location": "https://www.google.com/maps?q=59.437,24.7535"
}

type TInfo = typeof fetchInfo

export const Footer: React.FC<FooterProps> = ({}) => {
    const {data} = useGetMainInfoQuery()
    const {data: lang} = useGetLangQuery()

    const {content, setLang} = useLangStore()

    const [info, setInfo] =
        useState<TInfo>({} as TInfo)

    useEffect(() => {
        data && setInfo(data.info)
    }, [data]);

    useEffect(() => {
        lang && setLang(lang.language_code)
    }, [lang]);

    return (
        <footer className="py-[20px] flex justify-between items-center
        border-solid border-t-[1px] border-t-black/[0.35]
        max-tb:flex-col max-tb:items-start max-tb:gap-y-3
        max-ph:whitespace-nowrap">
            <a href="" className="font-montserratAlternates font-medium text-3xl
            max-ph:text-2xl">
                {content.companyName}</a>
            <div className="flex flex-col gap-y-1 items-end justify-center
            max-tb:flex-row max-tb:w-full max-tb:justify-between
            max-ph:flex-col">
                <MyP1>
                    <a href={process.env.REACT_APP_SERVER_URL + info.privacy_policy}
                       target="_blank"
                    >
                        {content.privacy}</a>
                </MyP1>
                <MyP1>{content.allRightSecure}</MyP1>
            </div>
        </footer>
    );
};