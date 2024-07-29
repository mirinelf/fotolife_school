import React from 'react';

type MyH4Props = {
    children: React.ReactNode
    styles?: string
    onClick?: (e: React.MouseEvent<HTMLHeadElement>) => void
}

export const MyH4: React.FC<MyH4Props> =
    ({children, styles, onClick}) => {
    return (
        <h4 className={`font-montserrat text-xl ${styles && styles}
        max-ph:text-lg`}
            onClick={onClick}
        >
            {children}
        </h4>
    );
};