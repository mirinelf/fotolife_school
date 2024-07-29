import React from 'react';
import {album} from "../../../06_shared/assets";

type ShopCartProps = {
    count: number
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const ShopCart: React.FC<ShopCartProps> = ({count, onClick}) => {
    return (
        <div className="relative h-7 w-7 cursor-pointer transition-all ease-in-out duration-500 hover:opacity-80
        max-ph:h-5 max-ph:w-5" onClick={onClick}>
            <div className="w-4 h-4 rounded-full bg-primary text-white
            flex items-center justify-center absolute -right-2 -top-2 text-xs">
                {count}</div>
            <img src={album.shopCart} alt="Show cart"/>
        </div>
    );
};