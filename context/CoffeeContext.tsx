import {createContext, useContext} from "react";

export enum COFFEE_STATUS {
    WAITING,
    PREPARING,
    DONE
}

export interface ICoffee {
    name: string,
    price: number,
    status: COFFEE_STATUS
}

export interface ICoffeeContext {
    addCoffee: (data: ICoffee) => void;
}

const CoffeeContext=createContext<ICoffeeContext>({
    addCoffee: () => {},
});

export const useCoffeeContext = () : ICoffeeContext => useContext(CoffeeContext);

export default CoffeeContext;
