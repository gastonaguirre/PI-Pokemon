import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getTypes } from '../../redux/action/getTypes'
import { postPoke } from '../../redux/action/postPoke'
import swal from 'sweetalert';
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
        img: "https://i.ibb.co/cxYrKTg/1581656735-610153-1581656812-noticia-normal-recorte1.jpg",
    })

//trae los tipos de pokemones

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    //hace que se pueda interactuar con el input

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

//selecciona un tipo de pokemon

    const handleSelect = (e) => {
        if(input.types.length < 2){
        setInput({
            ...input,
            types: [...input.types, e.target.value]           
        })
    }else{alert("Only 2 types per pokemon!!") }
    }
//muestra una alerta si no se cumple un requisito

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.name ) {     
            return alert("Can't create a Pokemon without a name")
        } else if (!input.types.length) {       
            return alert("Please select at least one pokemon type")
        } else if (!input.img || !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png|webp|jpeg)/.test(input.img)) {      
            return alert("Please send a valid url image")
        }
        dispatch(postPoke(input))
        swal({
            title:"Pokemon created succesfully!!",
             text:"want to create another pokemon?",
             buttons:['no', 'si']}).then(respuesta => {
                if(!respuesta){
                    history.push('/home');
                    window.location.reload();  
                }
             }) 

    }

//borra un tipo de pokemon

    const handleDelete  = (type) => {
        setInput({
            ...input,
            types: input.types.filter(pt => pt !== type)
        })
    }
    return (
        <div className='fondoCP'>
            <h2 className='tituloCP'>Pokemon Creation</h2>
            <Link to='/home'>
                <button className='butto'>Back</button>
            </Link>
            <br />
            <button id='submit' className='crear' type='submit' onClick={(e) => handleSubmit(e)}>Create Pokemon</button>
            <form >               
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
                <input type="range" min="0" max="100"  id='5' value={input.height} name="height" onChange={(e) => handleChange(e)} />
                <h5 >{input.height}</h5>
                <br />
                <label >Weight:</label>
                <input type="range" min="0" max="1000" id='6' value={input.weight} name="weight" onChange={(e) => handleChange(e)} />
                <h5 >{input.weight}</h5>
                </div>
 <div className='nameCreate'>
                <label >Name  </label>
                <input type="text" id='7' className='nameCreate1' value={input.name} name="name" placeholder='PokeName' onChange={(e) => handleChange(e)} />
</div> 
<div className='typesCreate'>
                <label >Select Types</label>
                <select id='8' className='nameCreate1' onChange={(e) => handleSelect(e)}>
                    <option value=""  hidden name="types" >Select Types</option>
                    {
                        allTypes?.map(pt => {
                            return (<option  value={pt.name} key={pt.id}>{pt.name}</option>)
                        })
                    }
                </select>
                <ul >
                    <li className='paginad' >
                         {
                        
                         input.types.map(type =>
                            <h5  key={type}>
                                {allTypes?.find(p => p.name === type).name}  
                               
                                <button  className='delete'  onClick={() => handleDelete(type)}></button>
                           </h5>
                         )} 
                    </li>
                </ul>
               </div> 
     <br />
                <div className='imgCreate'>
                <label >Image</label>
                <input type="url"  id='11' className='nameCreate1' value={input.img} name="img" placeholder='Image Url...' onChange={(e) => handleChange(e)} />
                </div>
       </form>

        </div>
    )
}