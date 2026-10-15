import { makeVar } from '@apollo/client';
import { useReactiveVar } from '@apollo/client/react';

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
        subscribe: () => useReactiveVar(state),
        get: () => state(),
    };
};

export const dataStateObject = createState({ dataStatus: 'loading' })

/** "colorScheme" is the "color-scheme" CSS property of the page, "normal" means that it is not set. */
export const websiteStateObject = createState({ websiteTheme: 'light', colorScheme: 'normal' })

/**
 * The value "default" means that the prop is not passed to the config, so the library uses its own default.
 * The props are set to some values at the start, to see the default ones choose "default (unset)".
 */
export const skeletonStateObject = createState({ animation: 'wave', theme: 'light', opacity: '1', borderRadius: '12', reveal: 'fade' })

/** The configuration object (the "data-sm-config" attribute) without the props that have the "default" value. */
export const getSkeletonConfig = (skeletonState) =>
    Object.fromEntries(Object.entries(skeletonState).filter(([, value]) => value !== 'default'))

/** The settings of the demo itself (not of the library): how the text of the cards is shown while loading. */
/** The values: 'block', 'text' (the lines by the text) or a number of the lines '1'...'10'. */
export const demoStateObject = createState({ textSkeleton: '3' })
