import { websiteStateObject, skeletonStateObject, dataStateObject } from '../../state'
import './Navbar.css'

export const Navbar = () => {
    const skeletonState = skeletonStateObject.subscribe()
    const dataState = dataStateObject.subscribe()
    const websiteState = websiteStateObject.subscribe()

    const changeDataLoading = (e) => {
        const isChecked = e.target.checked;
        dataStateObject.set({ dataStatus: isChecked ? 'fetched' : 'loading' })
    }

    const changeWebsiteTheme = (e) => {
        const isChecked = e.target.checked;

        document.body.style.transition = '.4s';

        if (isChecked) {
            websiteStateObject.set({ websiteTheme: 'dark' })
            document.body.style.backgroundColor = '#0f0f0f';
        } else {
            websiteStateObject.set({ websiteTheme: 'light' })
            document.body.style.backgroundColor = '#fff';
        }
    }

    const changeSkeletonTheme = (e) => {
        const isChecked = e.target.checked;

        if (isChecked) skeletonStateObject.set((prevState) => ({ ...prevState, theme: 'dark' }))
        else skeletonStateObject.set((prevState) => ({ ...prevState, theme: 'light' }))
    }

    const changeSkeletonAnimation = (e) => skeletonStateObject.set((prevState) => ({
        ...prevState,
        animation: e.target.value
    }))

    const changeSkeletonOrientation = (e) => {
        const isChecked = e.target.checked;

        skeletonStateObject.set((prevState) => ({
            ...prevState,
            orientation: isChecked ? 'right-to-left' : 'left-to-right'
        }))
    }

    return (
        <div className='navbar'>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Data loading:</legend>
                    <label htmlFor="loading">
                        {dataState.dataStatus === 'loading' ? 'loading...' : 'fetched'}
                        <div className="switch">
                            <input id="loading" type="checkbox" onChange={changeDataLoading} />
                            <span className="slider round"></span>
                        </div>
                    </label>
            </fieldset>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Website theme:</legend>
                <label htmlFor="website-theme">
                    {websiteState.websiteTheme === 'light' ? 'light' : 'dark'}
                    <div className="switch">
                        <input id="website-theme" type="checkbox" onChange={changeWebsiteTheme} />
                        <span className="slider round"></span>
                    </div>
                </label>
            </fieldset>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Skeleton theme:</legend>
                <label htmlFor="skeleton-theme">
                    {skeletonState.theme || 'light'}
                    <div className="switch">
                        <input id="skeleton-theme" type="checkbox" onChange={changeSkeletonTheme} />
                        <span className="slider round"></span>
                    </div>
                </label>
            </fieldset>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Skeleton animation:</legend>
                <div className='radio-group'>
                    <div>
                        <input id="radio-1" onChange={changeSkeletonAnimation} type="radio" checked={skeletonState.animation === "none"} value="none" name="animation" />
                        <label htmlFor="radio-1">none</label>
                    </div>
                    <div>
                        <input id="radio-2" onChange={changeSkeletonAnimation} type="radio" checked={skeletonState.animation === "wave"} value="wave" name="animation" />
                        <label htmlFor="radio-2">wave</label>
                    </div>
                    <div className={`navbar__animation-submenu${skeletonState.animation === "wave" ? "" : " navbar__animation-submenu--hidden"}`}>
                        <label htmlFor="skeleton-orientation">
                            {skeletonState.orientation || 'left-to-right'}
                            <div className="switch">
                                <input id="skeleton-orientation" type="checkbox" onChange={changeSkeletonOrientation} />
                                <span className="slider round"></span>
                            </div>
                        </label>
                    </div>
                    <div>
                        <input id="radio-3" onChange={changeSkeletonAnimation} type="radio" checked={skeletonState.animation === "pulse"} value="pulse" name="animation" />
                        <label htmlFor="radio-3">pulse</label>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}