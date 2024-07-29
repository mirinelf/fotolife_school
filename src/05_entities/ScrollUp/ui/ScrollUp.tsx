import React from 'react';
import {home} from "../../../06_shared/assets";

type ScrollUpProps = {}

export const ScrollUp: React.FC<ScrollUpProps> = ({}) => {
    const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        window.scroll({top: 0, behavior: 'smooth'})
    };

    return (
        <button className="ml-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center my-8"
                onClick={handleClickButton}
        >
            <img src={home.up} alt="Button scroll up"/>
        </button>
    );
};