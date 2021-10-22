import { DependencyList, useEffect } from "react";

export const useEffectAsync = (effect: () => Promise<void>, deps?: DependencyList): void => {
    useEffect(() => {
        (async () => {
            await effect();
        })();
    }, deps); // eslint-disable-line
}