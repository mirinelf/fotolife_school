import React from 'react';

type MyTextAreaProps = {
    placeholder: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    isError?: boolean
    textError?: string
}

export const MyTextArea: React.FC<MyTextAreaProps> =
    ({placeholder, onChange, isError, textError}) => {
    return (
        <>
            <textarea placeholder={placeholder} onChange={onChange}
                      className="outline-none py-2 px-6
               bg-transparent border-black/[0.5] border-[1px] border-solid rounded-3xl resize-none">
            </textarea>
            {isError && <p className="text-red/[0.5] -mt-2 ml-2 text-xs
            max-ph:-mt-1 w-[80%]">*{textError}</p>}
        </>
    );
};