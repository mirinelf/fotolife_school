import React, {ButtonHTMLAttributes} from 'react';

type BlueButtonProps = {
    children: React.ReactNode
    styles?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const FillButtonSh: React.FC<BlueButtonProps> =
    ({children, styles, onClick}) => {
    return (
        <button className={`${styles} font-montserrat font-medium whitespace-nowrap
        rounded-3xl
        max-ph:px-2 max-ph:text-xs
        max-ph:py-3
        hover:opacity-80 transition-all duration-500 ease-in-out`}
                onClick={onClick}
                type="button"
        >
            {children}
        </button>
    );
};