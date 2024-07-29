import React, {useEffect, useState} from 'react';
import {MyH2} from "../../../06_shared/ui/headings";
import {MyP1} from "../../../06_shared/ui/paragraph";
import {Button, ESizes, EType} from "../../Buttons";
import {useGetLangQuery, useGetMainInfoQuery} from "../../FetchData";
import {useLangStore} from "../../LangInfo";
import {usePopUpStore} from "../model/usePopUpStore";

type CookiePopUpProps = {}

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

export const CookiePopUp: React.FC<CookiePopUpProps> = ({

}) => {
    const {data} = useGetMainInfoQuery()
    const {data: lang} = useGetLangQuery()
    const [isAcceptCookie, setIsAcceptCookie] =
        useState(Boolean(document.cookie))

    const {isAcceptCookie: isCookieStore, setIsAcceptCookie: setIsCookieStore} = usePopUpStore()
    const {content, setLang} = useLangStore()

    const [info, setInfo] =
        useState<TInfo>({} as TInfo)

    useEffect(() => {
        data &&
            setInfo(data.info)
    }, [data]);

    useEffect(() => {
        lang &&
            setLang(lang.language_code)
    }, [lang]);

    if (isCookieStore) {
        return <></>
    }

    return (
        <div className="fixed w-full h-full bg-black/[0.65] z-[110] backdrop-blur-sm
        flex justify-center items-center">
            <form className="w-[45vw] py-14 px-12 bg-white rounded-3xl gap-y-6
            flex flex-col items-center text-center
            max-ph:w-[75vw] max-ph:py-7">
                <MyH2 styles="uppercase !text-4xl
                max-ph:!text-3xl">{content.cookieTitle}</MyH2>
                <MyP1 styles="max-ph:!text-sm"
                >{content.cookieParagraph}</MyP1>
                <a href={process.env.REACT_APP_SERVER_URL + info.privacy_policy}
                   target="_blank"
                   className="text-primary underline
                   max-ph:!text-sm">
                    {content.morePrivacyPolitic}
                </a>
                <Button size={ESizes.s} type={EType.blue} styles="max-ph:!px-4"
                        onClick={() => {
                            setIsAcceptCookie(true)
                            setIsCookieStore(true)
                        }}>
                    {content.agreeAndClose}
                </Button>
            </form>
        </div>
    );
};