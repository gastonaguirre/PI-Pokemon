import React, {  useState } from 'react';
import {  useDispatch } from 'react-redux';
import   getPokeName   from '../../redux/action/getPokeName';
import './SearchBar.css';

//hago una busqueda  por nombre del pokemon

export default function Search() {
    const dispatch = useDispatch();
    // const [ name, setName ] = useState("")

    const handleSearchBar = (e) => {
        e.preventDefault()
        // setName(e.target.value)
         dispatch(getPokeName(e.target.value))
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //
        //onClick={(e) => handleSubmit(e)}
    // }

    return (
        <div>
            <input className='searchInput' type='text' placeholder='Search Pokemons...' onChange={(e) => handleSearchBar(e)} />
            <button className='pokeSearch'  type='submit'>Search</button>
        </div>
    )
}