import './Card.css';
import 'skeleton-mammoth/dist/skeleton-mammoth.min.css';
import { skeletonStateObject, dataStateObject } from '../../state'

export const Card = ({imgUrl, title, subtitle}) => {

    const skeletonState = skeletonStateObject.subscribe();
    const dataState = dataStateObject.subscribe();

    const config = JSON.stringify(skeletonState);

    return (
        <div className={`card ${dataState.dataStatus === 'loading' ? "sm-loading" : ""}`} data-sm-config={config}>
            <div className='card__img-wrapper sm-item-primary'>
                <img className='card__img' src={require(`../../images/cards/${imgUrl}`)} alt="mammoth" />
            </div>
                <div className='card__body'>
                    <div className='card__details'>
                        <p className='card__title sm-item-secondary'>{title}</p>
                        <p className='card__subtitle sm-item-secondary'>{subtitle}</p>
                    </div>
            </div>
        </div>
    )
}