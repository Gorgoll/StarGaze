import { useState, useEffect } from "react";

export function useDateHandler() {
    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        return `${hour}:${minute.toString().padStart(2, "0")}`;
    };

    const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOfDay(getTimeOfDay());
        }, 60_000);
        return () => clearInterval(interval);
    }, []);

    return timeOfDay;
}

export default function useDecimalHour(){
    const rawTime = useDateHandler();

    const [hStr, mStr] = rawTime.split(":");
    return parseInt(hStr, 10) + parseInt(mStr, 10) / 60;
}
