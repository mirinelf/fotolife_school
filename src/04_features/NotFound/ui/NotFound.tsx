import React from 'react';
import {MyH2} from "../../../06_shared/ui/headings";
import {Button, ESizes, EType} from "../../../05_entities/Buttons";
import {notFound} from "../../../06_shared/assets";
import {useNavigate} from "react-router-dom";
import {useLangStore} from "../../../05_entities/LangInfo";

type NotFoundProps = {}

export const NotFound: React.FC<NotFoundProps> = ({}) => {
    const navigate = useNavigate()

    const {content} = useLangStore()

    return (
        <div className="flex w-full py-[25vh] relative overflow-hidden
        max-tb:flex-col max-tb:py-[0vw] max-tb:items-center max-tb:justify-center max-tb:gap-y-4">
            <div className="flex flex-col items-start gap-y-8
            max-tb:justify-center max-tb:items-center">
                <MyH2 styles="max-tb:ml-[3vw] max-tb:w-[60vw] max-tb:text-center">{content.notFoundPage}</MyH2>
                <div className="max-tb:hidden">
                    <Button size={ESizes.s} type={EType.blue}
                            onClick={(e) => navigate('/')}>
                        {content.backMain}
                    </Button>
                </div>
            </div>
            <img src={notFound.visual} alt="Success payment"
                 className="absolute h-[90%] right-0 top-1/2 -translate-y-1/2
                 max-tb:relative max-tb:top-0 max-tb:translate-y-0 max-tb:h-[50%] max-tb:-mt-12"/>
            <div className="tb:hidden">
                <Button size={ESizes.s} type={EType.blue}
                        onClick={(e) => navigate('/')}>
                    {content.backMain}
                </Button>
            </div>
        </div>
    );
};