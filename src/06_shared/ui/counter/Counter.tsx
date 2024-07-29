import React, {useEffect, useState} from 'react';
import {cart} from "../../assets";

type CounterProps = {
    value: number
    updateValue: (newValue: number) => void
}

export const Counter: React.FC<CounterProps> = ({value, updateValue}) => {
    const [counterValue, setCounterValue] =
        useState<number>(value)

    useEffect(() => {
        updateValue(counterValue)
    }, [counterValue]);

    const handleOnClickMinus = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setCounterValue(prevState => prevState-1 < 0 ? 0 : --prevState)
    };

    const handleOnClickPlus = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setCounterValue(prevState => ++prevState)
    };

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        parseInt(e.target.value) && setCounterValue(parseInt(e.target.value))
    };

    return (
        <div className="inline-flex gap-x-3 items-center">
            <button className="py-1"
                    onClick={handleOnClickMinus}
            >
                <img src={cart.minus} alt="Count minus" className="h-0.5"/>
            </button>
            <input type="text" className="outline-none w-12 text-center py-1 px-2
                            bg-transparent border-black/[0.5] border-[1px] border-solid rounded-xl"
                   placeholder="0"
                   onChange={handleChangeValue}
                   value={counterValue}
            />
            <button onClick={handleOnClickPlus}>
                <img src={cart.plus} alt="Count plus" className="h-2.5"/>
            </button>
        </div>
    );
};