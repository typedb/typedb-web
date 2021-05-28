import React, { useEffect, useState } from 'react';

// use global variables
let typeDBVersion = "";
let observers: React.Dispatch<React.SetStateAction<string>>[] = [];

// changes global isOnline state and updates all observers
export const setTypeDBVersion = (value: string) => {
    typeDBVersion = value;
    observers.forEach(update => update(typeDBVersion));
};

// React Hook
export const useTypeDBVersion = (): [string, Function] => {
    const [typeDBVersionState, setTypeDBVersionState] = useState<string>(typeDBVersion);

    useEffect(() => {
        // add setIsOnlineState to observers list
        observers.push(setTypeDBVersionState);

        // update isOnlineState with latest global isOnline state
        setTypeDBVersionState(typeDBVersion);

        // remove this setIsOnlineState from observers, when component unmounts
        return () => {
            observers = observers.filter(update => update !== setTypeDBVersionState);
        };
    }, []);

    // return global isOnline state and setter function
    return [typeDBVersionState, setTypeDBVersion];
}
