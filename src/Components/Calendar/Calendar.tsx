import React, {useContext, useEffect, useState} from "react";
import {BackCalendar} from "../Icons/BackCalandar/BackCalendar";
import {NextCalendar} from "../Icons/BackCalandar/NextCalendar";
import {Event} from "../../Models/Event";
import {EventTypes} from "../../Models/EventTypes";
import {useMediaQuery} from "usehooks-ts";
import {Colors} from "../../Models/Colors";
import {ColorContext} from "../../Router/AppRouter";

interface CalendarProps {
    events: Event[];
    onEventClick: (evt: Event) => void;
    className?: string;
}

interface Placeholder {
    day?: number;
    otherMonth: boolean;
    events?: Event[];
}

const DAYS_PER_WEEK = 7;
const CALENDAR_SPOTS = 42;

export function Calendar({events, onEventClick, className}: CalendarProps) {
    const color = useContext(ColorContext);

    const weekDays = [
        {long: "Domingo", short: "Dom"},
        {long: "Segunda", short: "Seg"},
        {long: "Terça", short: "Ter"},
        {long: "Quarta", short: "Qua"},
        {long: "Quinta", short: "Qui"},
        {long: "Sexta", short: "Sex"},
        {long: "Sábado", short: "Sab"},
    ];

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthLong, setMonthLong] = useState(
        new Date(year, month, 1).toLocaleDateString("default", {
            month: "long",
        }),
    );

    const [popUpOpened, setPopUpOpened] = useState("disabled");

    const [placeHolders, setPlaceholders] = useState<{key: number, value: Placeholder[]}[]>([]);
    const matches = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        const calendar = createCalendar();
        setPlaceholders(calendar);
        setMonthLong(
            new Date(year, month, 1).toLocaleDateString("default", {
                month: "long",
            }),
        );
        // eslint-disable-next-line
    }, [month, year, events]);

    useEffect(() => {
        setPopUpOpened("disabled");
    }, [month]);

    const createCalendar = () => {
        const aux: Placeholder[] = [];

        const prevMonthNumberOfDays = new Date(year, month, 0).getDate();

        const remainingNumberOfDays = new Date(year, month, 1).getDay();

        const currentMonthNumberOfDays = new Date(
            year,
            month === 11 ? 0 : month + 1,
            0,
        ).getDate();

        for (
            let i = prevMonthNumberOfDays - remainingNumberOfDays + 1;
            i <= prevMonthNumberOfDays;
            i++
        ) {
            aux.push({
                day: i,
                otherMonth: true,
                events: events.filter((event) => {
                    const startDate = new Date(event.year, event.month, event.startDay);
                    const endDate = new Date(
                        event.year,
                        event.month,
                        event.startDay + event.duration,
                    );

                    const currentDate = new Date(year, month - 1, i);

                    return currentDate >= startDate && currentDate < endDate;
                }),
            });
        }

        for (let i = 1; i <= currentMonthNumberOfDays; i++) {
            aux.push({
                day: i,
                otherMonth: false,
                events: events.filter((event) => {
                    const startDate = new Date(event.year, event.month, event.startDay);
                    const endDate = new Date(
                        event.year,
                        event.month,
                        event.startDay + event.duration,
                    );

                    const currentDate = new Date(year, month, i);

                    return currentDate >= startDate && currentDate < endDate;
                }),
            });
        }

        for (let i = 1; aux.length < CALENDAR_SPOTS; i++) {
            aux.push({
                day: i,
                otherMonth: true,
                events: events.filter((event) => {
                    const startDate = new Date(event.year, event.month, event.startDay);
                    const endDate = new Date(
                        event.year,
                        event.month,
                        event.startDay + event.duration,
                    );

                    const currentDate = new Date(year, month + 1, i);

                    return currentDate >= startDate && currentDate < endDate;
                }),
            });
        }

        return Array.from({length: Math.ceil(aux.length / DAYS_PER_WEEK)}, (_, index) =>
        { return  {key: index, value: aux.slice(index * DAYS_PER_WEEK, index * DAYS_PER_WEEK + DAYS_PER_WEEK)};}
        );
    };

    const onBackMonth = () => {
        if (month === 0) {
            setYear((yr) => yr - 1);
        }
        setMonth((month) => (month === 0 ? 11 : month - 1));
    };

    const onNextMonth = () => {
        if (month === 11) {
            setYear((yr) => yr + 1);
        }
        setMonth((month) => {
            return month === 11 ? 0 : month + 1;
        });
    };

    const changeMonth = (monthToPut: number, yearToPut: number) => {
        setMonth(monthToPut);
        setYear(yearToPut);
    };
    const eventClick = (evt: Event) => {
        setPopUpOpened("disabled");
        changeMonth(evt.month, evt.year);
        onEventClick(evt);
    };
    const showEvents = (events?: Event[]) => {
        if (!events || events.length === 0) return;

        const hasActivity: boolean[] = [];

        const emptySpace = <div className=" w-full h-1 md:h-3 mb-1 bg-transparent"></div>;



        return (
            <div className="flex flex-col  ">
                {events.map((evt) => {
                    switch (evt.type) {
                        case EventTypes.REGIONAL:
                            hasActivity[1] = true;
                            return (
                                <div
                                    className={`w-full h-1 md:h-3 ${Colors.background(color)} cursor-pointer`}
                                    onClick={() => matches && eventClick(evt)}
                                    key={evt.id}
                                ></div>
                            );
                        case EventTypes.NATIONAL:
                            hasActivity[2] = true;
                            return (
                                <div key={evt.id}>
                                    {!hasActivity[1] && emptySpace}
                                    <div
                                        className="w-full h-1 md:h-3 bg-primary cursor-pointer"
                                        onClick={() => matches && eventClick(evt)}
                                    ></div>
                                </div>
                            );
                        case EventTypes.INTERNATIONAL:
                            return (
                                <div key={evt.id}>
                                    {!hasActivity[1] && !hasActivity[2] && emptySpace}
                                    {!hasActivity[2] && emptySpace}
                                    <div
                                        className="w-full h-1 md:h-3 bg-purple-800 cursor-pointer"
                                        onClick={() => matches && eventClick(evt)}
                                    ></div>
                                </div>
                            );
                        default:
                            return <></>;
                    }
                })}
            </div>
        );
    };

    const openPopUpEvent = (day: Placeholder, obj: {key: number, value: Placeholder[]}) => {
        setPopUpOpened(`${day.day}_${obj.key}`);
    };

    const activityColorDot = (type: EventTypes) => {
        switch (type) {
            case EventTypes.REGIONAL:
                return <div className={`w-1.5 h-4 rounded-2xl mr-2 ${Colors.background(color)}`}></div>;
            case EventTypes.NATIONAL:
                return <div className="w-1.5 h-4 rounded-2xl mr-2 bg-primary"></div>;
            case EventTypes.INTERNATIONAL:
                return <div className="w-1.5 h-4 rounded-2xl mr-2 bg-purple-800"> </div>;
        }
    };

    return (
        <div className={className}>
            <div className="w-full flex justify-between items-center">
                <BackCalendar color={color} onClick={onBackMonth} />
                <h1 className="font-bold text-xl">
                    {monthLong} - {year}
                </h1>
                <NextCalendar color={color} onClick={onNextMonth} />
            </div>
            <div className="w-full flex items-center justify-around">
                {weekDays.map((day) => (
                    <div className="w-full h-full flex items-center justify-center py-4" key={day.long}>
                        {matches ? day.long : day.short}
                    </div>
                ))}
            </div>
            <div className="h-5/6 w-full flex flex-col ">
                {placeHolders.map((obj) => (
                    <div className="w-full h-1/6 flex justify-between items-center border-gray-500 border-opacity-40 border-b border-x first:border-t first:rounded-t-2xl last:rounded-b-2xl" key={obj.key}>
                        {obj.value.map((day, index) => (
                            <div className="relative w-full h-full border-r last:border-r-0 border-gray-500 border-opacity-40 py-2 cursor-pointer md:cursor-default"
                                key={`${obj.key}_${day.day}`}
                                onClick={() => !matches && day.events && day.events.length > 0 && popUpOpened !== `${day.day}_${obj.key}` && openPopUpEvent(day, obj)}>
                                <p
                                    className={`text-center cursor-default ${
                                        day.otherMonth && "text-gray-300"
                                    } ${matches ? "text-base" : "text-xs"}`}
                                >
                                    {day.day}
                                </p>
                                {showEvents(day.events)}
                                {popUpOpened === `${day.day}_${obj.key}` &&
                                    <div className={`absolute flex flex-col items-center z-50 w-40 bg-white p-2 -translate-x-14 ${index == 0 && "translate-x-2"} ${index == obj.value.length -1 && "-translate-x-24"}`} key={`${day.day}_${obj.key}_popup`}>
                                        {day.events?.map((event) => {
                                            return <div key={event.id} className="w-full flex items-center justify-center py-2 px-2 rounded-lg text-xs whitespace-nowrap text-center font-bold active:bg-primary active:text-white cursor-pointer" onClick={() => eventClick(event)}>
                                                {activityColorDot(event.type)}
                                                {event.name}
                                            </div>;
                                        })}
                                    </div>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
