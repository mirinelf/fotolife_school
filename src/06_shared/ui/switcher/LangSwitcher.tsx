import React, {useEffect, useRef, useState} from 'react';
import {useGetLangQuery} from "../../../05_entities/FetchData";

type LangSwitcherProps = {
    setLang?: (newLang: string) => void
}

export const LangSwitcher: React.FC<LangSwitcherProps> = ({setLang}) => {
    const [isRuActive, setIsRuActive] =
        useState<boolean>(true)

    const circleRef = useRef<HTMLDivElement>(null)

    const {data} = useGetLangQuery()

    const setLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLang && setLang(!isRuActive ? 'ru' : 'ee')
        setIsRuActive(prevState => !prevState)
    }

    useEffect(() => {
        data && setLang &&
            setLang(data.language_code)
    }, []);

    useEffect(() => {
        data && setIsRuActive(data.language_code === 'ru')
    }, [data]);

    return (
        <div className="bg-primary rounded-full p-1 font-medium text-[12px]
        justify-start w-auto inline-flex relative">
            <div className={`absolute w-6 h-6 rounded-full bg-white transition-all ease-in-out duration-500 left-1
            ${isRuActive ? 'translate-x-0' : 'translate-x-full'}`}
                 ref={circleRef}
            />
            <button className={`rounded-full p-1 w-6 h-6 z-10 transition-all ease-in-out duration-500
            ${isRuActive ? 'text-black' : 'text-white'}`}
                    onClick={setLanguage}
            >
                RU</button>
            <button className={`rounded-full p-1 w-6 h-6 z-10 transition-all ease-in-out duration-500
            ${!isRuActive ? 'text-black' : 'text-white'}`}
                    onClick={setLanguage}
            >
                ET</button>
        </div>
    );
};