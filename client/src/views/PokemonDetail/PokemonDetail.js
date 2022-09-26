import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getPokeId from '../../redux/action/getPokeId'

import './PokemonDetail.css'


export default function PokemonDetail(props) {
    const dispatch = useDispatch();
    const pokeID = props.match.params.id;
    let pokemon = useSelector((state) => state.pokemonsDetail)


    useEffect(() => {
        dispatch(getPokeId(pokeID))
    }, [dispatch])


    return (
        <div>
            <Link to='/home'>
                <button className='button'>Back</button>
            </Link>
            <div className='detail'>
            <h1>Pokemon:  {pokemon.name}</h1>
           
            <img className='img' src={pokemon.img} alt="No image found" width='250px' heigth='300px' ></img>
            
            <div className='col1'>
            <h3>Health Power:  {pokemon.hp}</h3>
            <h3>Attack:  {pokemon.attack}</h3>
            <h3>Defense:  {pokemon.defense}</h3>
            </div>
            <div className='col2'>
            <h3>Speed:  {pokemon.speed}</h3>
            <h3>Height:  {pokemon.height}</h3>
            <h3>Weight:  {pokemon.weight}</h3>
            </div>
            </div>
        </div>
    )
}