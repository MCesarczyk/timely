import { useState, useEffect } from "react";

export const useCurrentDate = (isCounting: boolean = false) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const clockInterval = setInterval(() => {
            isCounting && setDate(new Date());
        }, 1_000);

        return () => {
            clearInterval(clockInterval);
        };
    }, []);

    return date;
};
