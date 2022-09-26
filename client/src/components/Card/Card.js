import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'

//hago un destructurin y obtengo los datos necesarios para crear la carta de cada pokemon

export function Card({ name, img, types, id }) {
    return (   
        <div>
          <div className='Card'>
          <br />
            <h4 className='pokemon'>Pokemon: {name}</h4>
            <br />
            <Link to={"/pokemons/"+id}>
                <img className='pokeImg' src={img} alt="PokeImage not found" width="175px" height="160px" />
            </Link>
            <br />
            <h5 className='types'>Types: {types.map(pt => "- " + pt.name + " ")}</h5>
            <br />
        </div>    
         </div>
    );
}