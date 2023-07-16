import logo from '../../images/sm-logo-big.png'
import './Header.css'

export const Header = () => {

    return (
        <div className='header'>
            <img className='header__img' src={logo} alt='Skeleton Mammoth logotype.'/>
            <div className='header__body'>
                <h2>Live Demo of the "
                    <a className='header__link' href='https://github.com/WOLFRIEND/skeleton-mammoth/tree/master'>Skeleton Mammoth</a>
                    " library.</h2>
                <div className='header__links'>
                    <iframe src="https://ghbtns.com/github-btn.html?user=WOLFRIEND&repo=skeleton-mammoth&type=star&count=true"
                            frameBorder="0" scrolling="0" width="100" height="20" title="GitHub"></iframe>
                    <iframe src="https://ghbtns.com/github-btn.html?user=WOLFRIEND&repo=skeleton-mammoth&type=fork&count=true"
                            frameBorder="0" scrolling="0" width="100" height="20" title="GitHub"></iframe>
                </div>
            </div>
        </div>
    )
}