import React from 'react';

type MyInputProps = {
    placeholder: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    isError?: boolean
    textError?: string
}

export const MyInput: React.FC<MyInputProps> =
    ({placeholder,
         onChange,
         isError, textError}) => {
    return (
        <>
            <input type="text" placeholder={placeholder}
                   onChange={onChange}
                   className={`outline-none py-2 px-6 bg-transparent 
               ${isError ? 'border-red/[0.5]' : 'border-black/[0.5]'} border-[1px] border-solid rounded-full`}/>
            {isError && <p className="text-red/[0.5] -mt-2 ml-2 text-xs
            max-ph:-mt-1">*{textError}</p>}
        </>
    );
};