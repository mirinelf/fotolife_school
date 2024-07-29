import React from 'react';
import {ESizes, EType} from "../model/sizes";
import {BorderButtonSh, FillButtonSh} from "../../../06_shared/ui/buttons";

type ButtonProps = {
    size: ESizes
    type: EType
    children: React.ReactNode
    styles?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({
    size,
    type,
    children,
    onClick,
    styles
}) => {

    const returnButton = (styles: string) => {
        if (type === EType.blue)
            return (
                <FillButtonSh styles={`${styles} bg-primary text-white`} onClick={onClick}
                >
                    {children}
                </FillButtonSh>
            )

        if (type === EType.white)
            return (
                <FillButtonSh styles={`${styles} bg-white text-primary`} onClick={onClick}
                >
                    {children}
                </FillButtonSh>
            )

        if (type === EType.green)
            return (
                <FillButtonSh styles={`${styles} bg-green text-white`} onClick={onClick}
                >
                    {children}
                </FillButtonSh>
            )

        return (
            <BorderButtonSh styles={styles} onClick={onClick}>
                {children}
            </BorderButtonSh>
        )
    }

    if (size === ESizes.s)
        return returnButton(`${styles} p-btnS `)

    return returnButton(`${styles} p-btnX `)
};