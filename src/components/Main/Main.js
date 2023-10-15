import './Main.css';
import {useRef} from 'react';
import Promo from '../Promo/Promo';
import Description from '../Description/Description';
import Technologies from '../Technologies/Technologies';
import Student from '../Student/Student';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
    const aboutRef = useRef(null);

    return (
        <main className="main">
            <Promo aboutRef={aboutRef}/>
            <Description aboutRef={aboutRef}/>
            <Technologies/>
            <Student/>
            <Portfolio/>
        </main>
    );
}

export default Main;