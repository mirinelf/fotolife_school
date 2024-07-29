import React from 'react';
import {home} from "../../../06_shared/assets";

type PaginationProps = {
    children: React.ReactNode
    onClickLeft: (e: React.MouseEvent<HTMLButtonElement>) => void
    onClickRight: (e: React.MouseEvent<HTMLButtonElement>) => void
    isStartDayNow?: boolean
}

export const Pagination: React.FC<PaginationProps> = ({children, onClickRight, onClickLeft, isStartDayNow}) => {
    return (
        <div className="w-full flex items-center mt-12">
            {!isStartDayNow && <button onClick={onClickLeft}>
                <img src={home.left} alt="Left" className="h-10 opacity-[0.35]
                max-ph:h-5"/>
            </button>}
            <h3 className="text-4xl font-montserrat capitalize ml-auto mr-auto
            max-ph:text-2xl">{children}</h3>
            <button onClick={onClickRight}>
                <img src={home.right} alt="Right" className="h-10 opacity-[0.35]
                max-ph:h-5"/>
            </button>
        </div>
    );
};