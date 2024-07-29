import React, {useEffect, useState} from 'react';
import {TDay, TScheduleWindow} from "../lib/types";



type BigCalendarProps = {
    startDay: Date
    times: string[]
    scheduleWindows: TScheduleWindow[]
    langIETF: string
}

export const BigCalendar: React.FC<BigCalendarProps> = ({
    startDay,
    times,
    scheduleWindows,
    langIETF
}) => {

    useEffect(() => {
        setDays(() => {
            const tempDate = new Date(startDay.getTime()); // Создаем копию myDt
            return [...Array(6)].map(_ => {
                let weekdayFormat: "long" | "short" | "narrow" | undefined = window.screen.width > 769
                    ? 'long'
                    : 'short'
                let name = new Intl.DateTimeFormat(langIETF, {weekday: weekdayFormat}).format(tempDate);
                const number = parseInt(new Intl.DateTimeFormat(langIETF, {day: "2-digit"}).format(tempDate));
                const date = tempDate.toLocaleDateString('sv-SE');
                tempDate.setDate(tempDate.getDate() + 1);
                name = window.screen.width < 380
                    ? name.slice(0, 2)
                    : name
                return {name, number, date};
            });
        })
    }, [startDay, langIETF])

    const [days, setDays] = useState<TDay[]>(() => {
        const tempDate = new Date(startDay.getTime()); // Создаем копию myDt
        return [...Array(6)].map(_ => {
            const name = new Intl.DateTimeFormat(langIETF, {weekday: 'long'}).format(tempDate);
            const number = parseInt(new Intl.DateTimeFormat(langIETF, {day: "2-digit"}).format(tempDate));
            const date = tempDate.toLocaleDateString('sv-SE');
            tempDate.setDate(tempDate.getDate() + 1);
            return {name, number, date};
        });
    });

    return (
        <div className="w-full mt-12">
            <div className="grid grid-cols-7 gap-0 font-montserrat capitalize
            max-ph:grid-cols-8">
                <div className="col-span-1
                max-ph:col-span-2">
                    <div className="w-full h-20 flex items-center justify-center"/>
                    {times.map((time, id) => (
                        <div className="w-full h-20 flex items-center justify-start
                        max-ph:text-[3vw] max-ph:font-medium max-ph:h-12"
                             key={id}>{time}</div>
                    ))}
                </div>
                <div className="ph:hidden col-span-6 w-full overflow-x-scroll">
                    <div className="grid grid-cols-6 w-[480px]">
                        {days.map((day, rId) => (
                            <div className="col-span-1" key={rId.toString()+day}>
                                <div className={`w-full h-20 flex flex-col align-middle
                            border-t-[1px] border-t-black/[0.35] border-solid'
                            border-r-[1px] border-r-black/[0.35]
                            ${rId === 0 && 'border-l-[1px] border-l-black/[0.35]'}
                            max-ph:h-15`}>
                                    <p className="h-1/2 border-b-[1px] border-solid border-b-black/[0.35]
                                flex items-center justify-center">
                                        {day.number}</p>
                                    <p className="h-1/2 flex items-center justify-center">
                                        {day.name}</p>
                                </div>
                                {times.map((time, cId) => (
                                    <div className={`w-full h-20 border-solid
                                border-t-[1px] border-t-black/[0.35]
                                border-r-[1px] border-r-black/[0.35]
                                max-ph:h-12
                                ${rId === 0 && 'border-l-[1px] border-l-black/[0.35]'}
                                ${scheduleWindows.some(window => window.date === day.date && window.period === time)
                                    && 'bg-primary'}
                                ${cId === times.length-1 && 'border-b-[1px] border-b-black/[0.35]'}`}
                                         key={cId.toString() + time}
                                    >
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {days.map((day, rId) => (
                    <div className="col-span-1 max-ph:hidden" key={rId.toString()+day}>
                        <div className={`w-full h-20 flex flex-col align-middle
                            border-t-[1px] border-t-black/[0.35] border-solid'
                            border-r-[1px] border-r-black/[0.35]
                            ${rId === 0 && 'border-l-[1px] border-l-black/[0.35]'}
                            max-ph:h-15`}>
                                <p className="h-1/2 border-b-[1px] border-solid border-b-black/[0.35]
                                flex items-center justify-center">
                                    {day.number}</p>
                                <p className="h-1/2 flex items-center justify-center">
                                    {day.name}</p>
                        </div>
                        {times.map((time, cId) => (
                            <div className={`w-full h-20 border-solid
                                border-t-[1px] border-t-black/[0.35]
                                border-r-[1px] border-r-black/[0.35]
                                max-ph:h-12
                                ${rId === 0 && 'border-l-[1px] border-l-black/[0.35]'}
                                ${scheduleWindows.some(window => window.date === day.date && window.period === time) 
                                    && 'bg-primary'}
                                ${cId === times.length-1 && 'border-b-[1px] border-b-black/[0.35]'}`}
                                 key={cId.toString() + time}
                            >
                                {scheduleWindows.some(window => window.date === day.date && window.period === time) &&
                                    <div className="max-tb:hidden font-montserrat w-full h-full px-3 normal-case whitespace-normal
                                    font-medium flex flex-col justify-center">
                                        <p className="text-white/[0.5] text-sm">
                                            {scheduleWindows.find(window =>
                                                window.date === day.date && window.period === time)?.title}</p>
                                        <p className="text-white text-base" style={{
                                            lineHeight: '16.94px'
                                        }}>
                                            {scheduleWindows.find(window =>
                                                window.date === day.date && window.period === time)?.comment}</p>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};