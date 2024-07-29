import React from 'react';

type MyH3Props = {
    children: React.ReactNode
    styles?: string
}

export const MyH3: React.FC<MyH3Props> = ({children, styles}) => {
    return (
        <h3 className={`font-montserrat text-2xl font-medium ${styles}`}>
            {children}
        </h3>
    );
};