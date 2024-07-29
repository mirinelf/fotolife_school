import React, {useEffect, useState} from 'react';
import {BigCalendar, Pagination} from "../../../05_entities/BigCalendar";
import {MyH2} from "../../../06_shared/ui/headings";
import {useGetLangQuery, useGetMainScheduleQuery} from "../../../05_entities/FetchData";
import {TSchedule} from "../../../05_entities/FetchData";
import {useLangStore} from "../../../05_entities/LangInfo";

type ScheduleProps = {

}

export const Schedule: React.FC<ScheduleProps> = ({}) => {
    const [times, setTimes] = useState<string[]>([
        '8:00-10:00',
        '10:00-12:00',
        '12:00-14:00',
        '14:00-16:00',
        '16:00-18:00',
        '18:00-20:00',
        '20:00-22:00',
    ])
    const [scheduleWindows, setScheduleWindows] =
        useState<TSchedule[]>([])
    const [startDay, setStartDay] = useState<Date>(new Date())
    const [nameMonth, setNameMonth] =
        useState<string>('')
    const [isStartDayNow, setIsStartDayNow] =
        useState(true)
    const [langIETF, setLangIETF] =
        useState<string>('ru-RU')

    const {data} = useGetMainScheduleQuery(new Date().toLocaleDateString('sv-SE'))
    const {data: lang} = useGetLangQuery()

    const {content} = useLangStore()

    useEffect(() => {
        data && setScheduleWindows(data);
    }, [data])

    useEffect(() => {
        const startMonth = startDay.toLocaleDateString(langIETF, {month: 'long'})
        const endMonth = new Date(startDay.getTime()+1000*60*60*24*5)
            .toLocaleDateString(langIETF, {month: 'long'})

        startMonth === endMonth
            ? setNameMonth(startMonth)
            : setNameMonth(startMonth + ' / ' + endMonth)

        startDay.getDate() === new Date().getDate()
            && startDay.getMonth() === new Date().getMonth()
            && startDay.getFullYear() === new Date().getFullYear()
            ? setIsStartDayNow(true)
            : setIsStartDayNow(false)
    }, [startDay, langIETF]);

    useEffect(() => {
        if (lang) {
            lang.language_code === 'ru' &&
                setLangIETF('ru-RU')

            lang.language_code === 'ee' &&
                setLangIETF('lv-LV')
        }
    }, [lang]);

    const onClickLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStartDay(prevState => prevState.getDate() === new Date().getDate()
            ? prevState
            : new Date(prevState.getTime() - 1000 * 60 * 60 * 24 * 6)
        )
    }

    const onClickRight = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsStartDayNow(false)
        setStartDay(prevState => new Date(prevState.getTime() + 1000 * 60 * 60 * 24 * 6))
    }

    return (
        <div className="w-full overflow-hidden mt-24">
            <MyH2 styles="uppercase">{content.schedule}</MyH2>
            <Pagination onClickLeft={onClickLeft}
                        onClickRight={onClickRight}
                        isStartDayNow={isStartDayNow}
            >
                {nameMonth}
            </Pagination>
            <BigCalendar
                startDay={startDay}
                times={times}
                scheduleWindows={scheduleWindows}
                langIETF={langIETF}
            />
        </div>
    );
};