import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className='fondo'>
          
      <h1 className='tituloLP'>Welcome to POKELIST</h1>
      <h2 className='textoLP'> Ready to discover all the Pokemon in the universe? </h2>
      <h5 className='start'> start</h5>
      <Link to='/home'>
        <button className="pokebola"></button>
      </Link>
      <div className="footer">
        <span>Developed by Gaston Aguirre</span>
        <a href="https://github.com/gastonaguirre" target="_blank">
          <button className="Git" />
        </a>
        <a href="https://www.linkedin.com/in/gaston-aguirre-805b67238/" target="_blank">
          <button className="LinkedIn" />
        </a>
        <a href="https://wa.me/5493794379108" target="_blank">
          <button className="WhatsApp" />
        </a>
      </div >
  
    </div>

  );
}