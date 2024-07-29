import React from 'react';

type MyP1Props = {
    children: React.ReactNode
    styles?: string
}

export const MyP1: React.FC<MyP1Props> = ({children, styles}) => {
    return (
        <p className={`text-black font-montserrat mt-[1px] ${styles}
        max-ph:text-[1rem]`}>
            {children}
        </p>
    );
};