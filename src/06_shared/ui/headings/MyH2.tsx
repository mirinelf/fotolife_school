import React from 'react';

type MyH2Props = {
    children: React.ReactNode
    styles?: string
}

export const MyH2: React.FC<MyH2Props> = ({children, styles}) => {
    return (
        <h2 className={`font-robotoFlex font-semibold text-5xl w-full ${styles && styles} leading-[76.27px]
        max-ph:text-3xl`}
        >
            {children}
        </h2>
    );
};