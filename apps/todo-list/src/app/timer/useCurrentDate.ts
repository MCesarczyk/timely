import { useState, useEffect } from "react";

export const useCurrentDate = (isCounting: boolean = false) => {
    const [date, setDate] = useState<number>(Date.now());

    useEffect(() => {
        if (isCounting) {
            setDate(Date.now());

            const clockInterval = setInterval(() => {
                setDate(Date.now());
            }, 1_000);

            return () => {
                clearInterval(clockInterval);
            };
        }
    }, [isCounting]);

    return date;
};
