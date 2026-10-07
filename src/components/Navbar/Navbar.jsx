import { useState } from 'react'
import { websiteStateObject, skeletonStateObject, dataStateObject, demoStateObject, getSkeletonConfig } from '../../state'
import './Navbar.css'

const UNSET_LABELS = { default: 'default (unset)', normal: 'normal (unset)' }

const RadioGroup = ({ name, value, options, onChange }) => (
    <div className='radio-group'>
        {options.map((option) => (
            <div key={option}>
                <input id={`${name}-${option}`} type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} />
                <label htmlFor={`${name}-${option}`}>{UNSET_LABELS[option] || option}</label>
            </div>
        ))}
    </div>
)

const Item = ({ title, children }) => (
    <fieldset className='navbar__item navbar__switcher'>
        <legend className='navbar__item-title'>{title}</legend>
        {children}
    </fieldset>
)

/** A collapsible group of the settings: open by default on a wide screen, closed on a phone to not take the whole screen. */
const Section = ({ title, description, children }) => {
    const [open, setOpen] = useState(() => window.matchMedia('(min-width: 768px)').matches)

    return (
        <details className='navbar__section' open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
            <summary className='navbar__section-title'>{title}</summary>
            {description && <p className='navbar__section-description'>{description}</p>}
            <div className='navbar__items'>{children}</div>
        </details>
    )
}

const ANIMATIONS = ['default', 'none', 'wave', 'wave-reverse', 'pulse']
const SKELETON_THEMES = ['default', 'light', 'dark', 'inherit']
const REVEALS = ['default', 'fade']
const BORDER_RADIUS_MODES = ['default', 'custom', 'full']
const LINES = Array.from({ length: 10 }, (_, i) => String(i + 1))
const PAGE_COLOR_SCHEMES = ['normal', 'light', 'dark', 'light dark']
const OPACITIES = Array.from({ length: 11 }, (_, i) => i / 10)

export const Navbar = () => {
    const skeletonState = skeletonStateObject.subscribe()
    const dataState = dataStateObject.subscribe()
    const websiteState = websiteStateObject.subscribe()
    const demoState = demoStateObject.subscribe()

    // The last chosen radius, to restore it when the "default" checkbox is unchecked.
    const [lastBorderRadius, setLastBorderRadius] = useState('12')
    const borderRadiusMode = ['default', 'full'].includes(skeletonState.borderRadius) ? skeletonState.borderRadius : 'custom'

    const changeDataLoading = (e) => {
        const isChecked = e.target.checked;
        dataStateObject.set({ dataStatus: isChecked ? 'fetched' : 'loading' })
    }

    const changeWebsiteTheme = (e) => {
        const isChecked = e.target.checked;

        document.body.style.transition = '.4s';

        if (isChecked) {
            websiteStateObject.set((prevState) => ({ ...prevState, websiteTheme: 'dark' }))
            document.body.style.backgroundColor = '#0f0f0f';
        } else {
            websiteStateObject.set((prevState) => ({ ...prevState, websiteTheme: 'light' }))
            document.body.style.backgroundColor = '#fff';
        }
    }

    const changePageColorScheme = (colorScheme) =>
        websiteStateObject.set((prevState) => ({ ...prevState, colorScheme }))

    const changeSkeleton = (prop) => (value) =>
        skeletonStateObject.set((prevState) => ({ ...prevState, [prop]: value }))

    const changeBorderRadius = (value) => {
        setLastBorderRadius(value)
        changeSkeleton('borderRadius')(value)
    }

    const changeBorderRadiusMode = (mode) => changeSkeleton('borderRadius')(mode === 'custom' ? lastBorderRadius : mode)

    return (
        <div className='navbar'>
            <Section title='Page' description='The settings of the website, not of the library.'>
                <Item title='Website theme:'>
                    <label htmlFor="website-theme">
                        {websiteState.websiteTheme}
                        <div className="switch">
                            <input id="website-theme" type="checkbox" checked={websiteState.websiteTheme === 'dark'} onChange={changeWebsiteTheme} />
                            <span className="slider round"></span>
                        </div>
                    </label>
                </Item>
                <Item title='Page color-scheme:'>
                    <RadioGroup name="page-color-scheme" value={websiteState.colorScheme} options={PAGE_COLOR_SCHEMES} onChange={changePageColorScheme} />
                </Item>
            </Section>

            <Section title='Skeleton Mammoth' description='The "sm-loading" class and the "data-sm-config" attribute are set on the body.'>
                <Item title='Data loading:'>
                    <label htmlFor="loading">
                        {dataState.dataStatus === 'loading' ? 'loading...' : 'fetched'}
                        <div className="switch">
                            <input id="loading" type="checkbox" checked={dataState.dataStatus === 'fetched'} onChange={changeDataLoading} />
                            <span className="slider round"></span>
                        </div>
                    </label>
                </Item>
                <Item title='Theme:'>
                    <RadioGroup name="skeleton-theme" value={skeletonState.theme} options={SKELETON_THEMES} onChange={changeSkeleton('theme')} />
                </Item>
                <Item title='Animation:'>
                    <RadioGroup name="animation" value={skeletonState.animation} options={ANIMATIONS} onChange={changeSkeleton('animation')} />
                </Item>
                <Item title='Opacity:'>
                    <select value={skeletonState.opacity} onChange={(e) => changeSkeleton('opacity')(e.target.value)}>
                        <option value='default'>default (unset)</option>
                        {OPACITIES.map((opacity) => (
                            <option key={opacity} value={String(opacity)}>{Math.round(opacity * 100)}%</option>
                        ))}
                    </select>
                </Item>
                <Item title='Border radius:'>
                    <div className='navbar__stack'>
                        <RadioGroup name="border-radius-mode" value={borderRadiusMode} options={BORDER_RADIUS_MODES} onChange={changeBorderRadiusMode} />
                        <label htmlFor="border-radius" className='navbar__range'>
                            <input id="border-radius" type="range" min="0" max="32" step="1" disabled={borderRadiusMode !== 'custom'}
                                   value={borderRadiusMode === 'custom' ? skeletonState.borderRadius : lastBorderRadius}
                                   onChange={(e) => changeBorderRadius(e.target.value)} />
                            <span>{borderRadiusMode === 'custom' ? `${skeletonState.borderRadius}px` : ''}</span>
                        </label>
                    </div>
                </Item>
                <Item title='Description text:'>
                    <select value={demoState.textSkeleton} onChange={(e) => demoStateObject.set({ textSkeleton: e.target.value })}>
                        <option value='block'>block (no lines)</option>
                        <option value='text'>lines by the text</option>
                        {LINES.map((lines) => (
                            <option key={lines} value={lines}>{lines} {lines === '1' ? 'line' : 'lines'} (sm-item-lines-{lines})</option>
                        ))}
                    </select>
                </Item>
                <Item title='Reveal:'>
                    <RadioGroup name="reveal" value={skeletonState.reveal} options={REVEALS} onChange={changeSkeleton('reveal')} />
                </Item>
                <Item title='data-sm-config:'>
                    <code className='navbar__config'>{JSON.stringify(getSkeletonConfig(skeletonState))}</code>
                </Item>
            </Section>
        </div>
    )
}
