import { makeVar, useReactiveVar as getReactiveVar } from '@apollo/client';

export const createState = (initialState) => {
    const state = makeVar(initialState);

    const set = (newState) => {
        if (typeof newState === 'function') {
            state(newState(state()));
        } else {
            state(newState);
        }
    };

    return {
        set,
        subscribe: () => getReactiveVar(state),
        get: () => state(),
    };
};

export const dataStateObject = createState({dataStatus: 'loading'})
export const websiteStateObject = createState({websiteTheme: 'light'})
export const skeletonStateObject = createState({animated: true, theme: 'light'})