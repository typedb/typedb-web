import React, { createContext, Dispatch, useReducer } from "react";
import { Reducer } from "./reducer";

type State = Partial<{
    typeDBVersion: string;
}>

const initialState = {
    typeDBVersion: "",
};

export const Context = createContext({
    state: initialState,
    dispatch: (() => {}) as Dispatch<State>
});

export const Storage: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    );
}
