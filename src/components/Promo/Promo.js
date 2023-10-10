import './Promo.css';
import landing_picture from '../../images/landing_picture.png';

function Promo({aboutRef}) { 
    function handleScroll() {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return ( 
            <section className="promo">
                <div className="promo__container">
                    <h1 className="promo__title">Учебный проект студента&nbsp;факультета <span className="promo__title-space">Веб-разработки.</span></h1>
                    <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button className="promo__button" onClick={handleScroll}>Узнать больше</button>
                </div>
                <img className="promo__picture" src={landing_picture} alt="Планета веб" />
            </section> 
    );
}

export default Promo;