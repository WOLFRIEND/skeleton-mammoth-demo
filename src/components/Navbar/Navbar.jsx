import './Navbar.css'
import { websiteStateObject, skeletonStateObject, dataStateObject } from '../../state'

export const Navbar = () => {
    const skeletonState = skeletonStateObject.subscribe()
    const dataState = dataStateObject.subscribe()
    const websiteState = websiteStateObject.subscribe()

    const changeDataLoading = (e) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            dataStateObject.set({ dataStatus: 'fetched' })
        } else {
            dataStateObject.set({ dataStatus: 'loading' })
        }
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

        if (isChecked) {
            skeletonStateObject.set((prevState) => {
                return {
                    ...prevState,
                    theme: 'dark'
                }
            })
        } else {
            skeletonStateObject.set((prevState) => {
                return {
                    ...prevState,
                    theme: 'light'
                }
            })
        }
    }

    const changeSkeletonAnimation = (e) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            skeletonStateObject.set((prevState) => {
                return {
                    ...prevState,
                    animated: true
                }
            })
        } else {
            skeletonStateObject.set((prevState) => {
                return {
                    ...prevState,
                    animated: false
                }
            })
        }
    }

    const changeSkeletonOpacity = (e) => {
        const isChecked = e.target.checked;
        const opacityValue = e.target.value;

        if (isChecked) {
            skeletonStateObject.set((prevState) => {
                return {
                    ...prevState,
                    opacity: opacityValue,
                }
            })
        } else {
            skeletonStateObject.set((prevState) => {
                return {
                    ...prevState,
                    opacity: opacityValue,
                }
            })
        }
    }

    return (
        <div className='navbar'>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Data loading:</legend>
                    <p>
                    {dataState.dataStatus === 'loading' ? 'Loading...' : 'Fetched'}
                    </p>
                <label className="switch">
                    <input type="checkbox" onChange={changeDataLoading} />
                    <span className="slider round"></span>
                </label>
            </fieldset>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Website theme:</legend>
                <p>
                    {websiteState.websiteTheme === 'light' ? 'Light' : 'Dark'}
                </p>
                <label className="switch">
                    <input type="checkbox" onChange={changeWebsiteTheme} />
                    <span className="slider round"></span>
                </label>
            </fieldset>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Skeleton theme:</legend>
                <p>
                    {skeletonState.theme === 'light' ? 'Light' : 'Dark'}
                </p>
                <label className="switch">
                    <input type="checkbox" onChange={changeSkeletonTheme} />
                    <span className="slider round"></span>
                </label>
            </fieldset>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Skeleton animation:</legend>
                <p>
                    {skeletonState.animated ? 'On' : 'Off'}
                </p>
                <label className="switch">
                    <input type="checkbox" onChange={changeSkeletonAnimation} checked={skeletonState.animated} />
                    <span className="slider round"></span>
                </label>
            </fieldset>
            <fieldset className='navbar__item navbar__switcher'>
                <legend className='navbar__item-title'>Skeleton opacity:</legend>
                <select onChange={changeSkeletonOpacity} defaultValue='1'>
                    <option value='0'>0%</option>
                    <option value='0.1'>10%</option>
                    <option value='0.2'>20%</option>
                    <option value='0.3'>30%</option>
                    <option value='0.4'>40%</option>
                    <option value='0.5'>50%</option>
                    <option value='0.6'>60%</option>
                    <option value='0.7'>70%</option>
                    <option value='0.8'>80%</option>
                    <option value='0.9'>90%</option>
                    <option value='1'>100%</option>
                </select>
            </fieldset>
        </div>
    )
}