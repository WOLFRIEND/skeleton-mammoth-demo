import './Card.css';
import { demoStateObject, dataStateObject } from '../../state'

const images = import.meta.glob('../../images/cards/*.png', { eager: true, import: 'default' });

export const Card = ({imgUrl, title, subtitle, description}) => {
    const demoState = demoStateObject.subscribe()
    const dataState = dataStateObject.subscribe()
    const isLoading = dataState.dataStatus === 'loading'
    const mode = demoState.textSkeleton

    // 'block': no lines. 'text': the number of the lines is taken from the text. A number: the lines of that number.
    let textClass = 'sm-item-secondary'
    if (mode === 'text') textClass += ' sm-item-lines'
    else if (mode !== 'block') textClass += ` sm-item-lines-${mode}`

    // The text is empty while the data is loading, only the "text" mode needs it to count the lines.
    const text = !isLoading || mode === 'text' ? description : ''

    return (
        <div className='card'>
            <div className='card__img-wrapper sm-item-primary'>
                <img className='card__img' src={images[`../../images/cards/${imgUrl}`]} alt="mammoth" />
            </div>
            <div className='card__body'>
                <div className='card__details'>
                    <p className='card__title sm-item-secondary'>{title}</p>
                    <p className='card__subtitle sm-item-secondary'>{subtitle}</p>
                    <p className={`card__description ${textClass}`}>{text}</p>
                </div>
            </div>
        </div>
    )
}
