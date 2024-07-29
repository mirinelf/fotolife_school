import React from 'react';

type BorderButtonProps = {
    children: React.ReactNode
    styles?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const BorderButtonSh: React.FC<BorderButtonProps> =
    ({
         children,
         styles,
         onClick
    }) => {

    return (
        <button className={`${styles} font-montserrat font-medium rounded-full
            border-primary border-2 text-primary
            max-ph:text-xs max-ph:px-4
            hover:opacity-60 transition-all duration-500 ease-in-out`}
                onClick={onClick}
                type="button"
        >
            {children}
        </button>
    );
};