import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getTypes } from '../../redux/action/getTypes'
import { postPoke } from '../../redux/action/postPoke'
import './CreatePokemon.css'


export default function PokeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allTypes = useSelector((state) => state.pokemonTypes)

    const [input, setInput] = useState({
        name: "",
        hp: 50,
        attack: 50,
        defense: 50,
        speed: 50,
        height: 50,
        weight: 50,
        types: [],
        img: "https://cutt.ly/NVbECPH"
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        if (!input.name) {
            e.preventDefault();
            return alert("Can't create a Pokemon without a name")
        } else if (!input.types.length) {
            e.preventDefault();
            return alert("Please select at least one pokemon type")
        } else if (!input.img) {
            e.preventDefault();
            return alert("Please send a valid url image")
        }

        dispatch(postPoke(input))
        alert("Pokemon created succesfully!!")
        history.push('/home');
    }
    const handleDelete  = (type) => {
        setInput({
            ...input,
            types: input.types.filter( pt => pt !== type)
        })
    }


    return (
        <div >
            <h2 className='titulo'>Pokemon Creation</h2>
            <Link to='/home'>
                <button className='butto'>Back</button>
            </Link>
            <br />
            <button id='submit' className='crear' type='submit' onClick={(e) => handleSubmit(e)}>Create Pokemon</button>
            <form onSubmit={(e) => handleSubmit(e)}>
                
                
                <br />
                <div className='colum1'>
                <label >HP:</label>
                <input type="range"  min="0" max="100" id='1' value={input.hp} name="hp" onChange={(e) => handleChange(e)} />
                <h5 >{input.hp}</h5>
                <br />
                <label >Attack:</label>
                <input type="range" min="0" max="100" id='2' value={input.attack} name="attack" onChange={(e) => handleChange(e)} />
                <h5 >{input.attack}</h5>               
                <br />                
                <label >Defense:</label>
                <input type="range" min="0" max="100" id='3' value={input.defense} name="defense" onChange={(e) => handleChange(e)} />
                <h5 >{input.defense}</h5>
                </div>
                <div className='colum2'>
                <label >Speed:</label>
                <input type="range" min="0" max="100" id='4' value={input.speed} name="speed" onChange={(e) => handleChange(e)} />
                <h5 >{input.speed}</h5>
                <br />
                <label >Height:</label>
                <input type="range" min="0" max="100" id='5' value={input.height} name="height" onChange={(e) => handleChange(e)} />
                <h5 >{input.height}</h5>
                <br />
                <label >Weight:</label>
                <input type="range" min="0" max="100" id='6' value={input.weight} name="weight" onChange={(e) => handleChange(e)} />
                <h5 >{input.weight}</h5>
                </div>
 <div className='nameCreate'>
                <label >Name  </label>
                <input type="text" id='7' className='nameCreate1' value={input.name} name="name" placeholder='PokeName' onChange={(e) => handleChange(e)} />
</div> 
<div className='typesCreate'>
                <label >Select Types</label>
                <select id='8' className='nameCreate1' onChange={(e) => handleSelect(e)}>
                    <option value=""  hidden name="types">Select Types</option>
                    {
                        allTypes?.map(pt => {
                            return (<option  value={pt.name} key={pt.id}>{pt.name}</option>)
                        })
                    }
                </select>
                <ul >
                    <li className='paginad'>{
                        input.types.map(pt =>
                            <h5 >
                                {allTypes?.find(p => p.name === pt)?.name}
                                <button className='delete' onClick={() => handleDelete(pt)}></button>
                            </h5>
                        )}
                    </li>
                </ul>
               </div> 
                <br />
                <div className='imgCreate'>
                <label >Image</label>
                <input type="url"  id='9' className='nameCreate1' value={input.img} name="img" placeholder='Image Url...' onChange={(e) => handleChange(e)} />
                </div>

            </form>
        </div>
    )


}