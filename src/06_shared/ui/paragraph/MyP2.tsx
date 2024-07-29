import React from 'react';

type MyPProps = {
    children: React.ReactNode
    styles?: string
}

export const MyP2: React.FC<MyPProps> = ({children, styles}) => {
    return (
        <p className={`font-montserrat text-xs ${styles}`}>
            {children}
        </p>
    );
};