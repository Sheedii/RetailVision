import React from 'react'
import './appHeader.css'
import Grille from "../../assets/Grillebackground2.svg"

const AppHeader = ({ title }) => {
    return (
        <div className='appHeader'>
            <div className='hedha'>
                <div className="grille_background">
                    <img className='grille_background_img' src={Grille} alt="grille background" />
                </div>
                <div className="appHeaderTitle">{title}</div>
            </div>
        </div>
    );
}

export default AppHeader
