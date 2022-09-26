import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPokes } from '../../redux/action/getPokes';
import { getTypes } from '../../redux/action/getTypes'
import { Card } from '../../components/Card/Card';
import { filterTypes } from '../../redux/action/filterTypes'
import filterAttack from '../../redux/action/filterAttack'
import Paginado from '../../components/Paginado/Paginado';
import SearchBar from '../../components/SearchBar/SearchBar';
import orderPoke from '../../redux/action/orderPoke'
import origin from '../../redux/action/origin'
import './Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector((state) => state.pokemonTypes)

    const [order, setOrder] = useState("")

    const [current, setCurrent] = useState(1)
    const [pokemonsPage, setPokemonsPage] = useState(12)
    const lastPoke = current * pokemonsPage
    const firstPoke = lastPoke - pokemonsPage
    const pokemons = allPokemons.slice(firstPoke, lastPoke)
    const paginado = (pageNumber) => {
        setCurrent(pageNumber)
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPokes());
    }, [dispatch]);

    const handleReload = (e) => {
        e.preventDefault();
        dispatch(getPokes())
    }

    const handleOrderPoke = (e) => {
        if (e.target.value === 'A-Z' || e.target.value === 'Z-A') {
            dispatch(orderPoke(e.target.value));
            setOrder(`Order ${e.target.value}`)
        }
    }

    const handleFilterType = (e) => {
        e.preventDefault();
        dispatch(filterTypes(e.target.value))
    }

    const handleFilterOrigin = (e) => {
        e.preventDefault();
        dispatch(origin(e.target.value))
    }

    const handleFilterAttack = (e) => {
        e.preventDefault();
        dispatch(filterAttack(e.target.value));
        setCurrent(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    return (
        <div className='fondoH'>

            <h1 className='titulo' >Pokelist</h1>
            <br/>
            <SearchBar />
            <br/>
            <Paginado pokemonsPage={pokemonsPage} allPokemons={allPokemons.length} paginado={paginado} />
            <br/>
           
                <Link to='/createPokemon'>
                    <button className='crearHome' >Create Pokemon</button>
                </Link>
            <br/>
<h3 className='filterName'>filter:</h3>
            <select className='order' onChange={(e) => handleOrderPoke(e)} >
                <option value='ALL'>ALL</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>

            <select className='filter' onChange={e => handleFilterType(e)}>
                <option value="ALL" >Type Filter...</option>
                {
                    allTypes?.map(pt => {
                        return <option value={pt.name} key={pt.id}>{pt.name}</option>
                    })
                }
            </select>

            <select className='filterStrength' onChange={e => handleFilterAttack(e)}>
                <option value="all">Strength Order...</option>
                <option value="powerfull">Powerfull</option>
                <option value="weak">Weak</option>
            </select>

            <select className='filterApi' onChange={e => handleFilterOrigin(e)}>
                <option value="pokes">Existent or Created Filter...</option>
                <option value="api">Existent</option>
                <option value="db">Created</option>
            </select>

            <button className='buttomHome' onClick={e => { handleReload(e) }}> RELOAD</button>

            <div className='card'>
                {pokemons?.map((p) => (
                    <Card
                        key={p.id}
                        name={p.name}
                        types={p.types}
                        img={p.img}
                        id={p.id}
                    />
                ))}
            </div>
            <Paginado pokemonsPage={pokemonsPage} allPokemons={allPokemons.length} paginado={paginado} />
        </div>
    )
}