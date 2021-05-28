import React, { useEffect, useState } from 'react';

let typeDBVersion = "";
let observers: React.Dispatch<React.SetStateAction<string>>[] = [];

export const setTypeDBVersion = (value: string) => {
    typeDBVersion = value;
    observers.forEach(update => update(typeDBVersion));
};

export const useTypeDBVersion = (): [string, Function] => {
    const [typeDBVersionState, setTypeDBVersionState] = useState<string>(typeDBVersion);

    useEffect(() => {
        observers.push(setTypeDBVersionState);
        setTypeDBVersionState(typeDBVersion);
        return () => {
            observers = observers.filter(update => update !== setTypeDBVersionState);
        };
    }, []);

    return [typeDBVersionState, setTypeDBVersion];
}
