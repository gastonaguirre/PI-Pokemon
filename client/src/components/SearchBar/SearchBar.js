import React, {  useState } from 'react';
import {  useDispatch } from 'react-redux';
import   getPokeName   from '../../redux/action/getPokeName';
import './SearchBar.css';

//hago una busqueda  por nombre del pokemon

export default function Search() {
    const dispatch = useDispatch();
    const [ name, setName ] = useState("")

    const handleSearchBar = (e) => {
        e.preventDefault()
        setName(e.target.value)     
    }

    const handleSubmit = (e) => {
        e.preventDefault()   
           dispatch(getPokeName(name))
    }
    return (
        <div>
            <input className='searchInput' type='text' placeholder='Search Pokemons...' onChange={(e) => handleSearchBar(e)} />
            <button className='pokeSearch'  type='submit' onClick={(e) => handleSubmit(e)} >Search</button>
        </div>
    )
}