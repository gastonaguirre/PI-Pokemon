import React from "react";
import './Paginado.css'

// se dividen todos los pokemones por los pokemones de cada pagina, para sacar el total de paginas

export default function Paginado({pokemonsPage, allPokemons, paginado}) {
    const pageNumbers = []
    for (let i=1;i<=Math.ceil(allPokemons/pokemonsPage);i++) {
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className="paginado">
                { pageNumbers && pageNumbers.map( number => (
                    <li key={number}>
                        <button className="pageNumber" onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}