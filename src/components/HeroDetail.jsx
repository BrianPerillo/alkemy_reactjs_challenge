import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import React, {Fragment, useContext, useEffect, useState} from 'react'

import {TeamContext} from '../context/TeamContext';
import axios from 'axios';
import {db} from '../firebase';
import {useParams} from 'react-router-dom';

const HeroDetail = () => {

    const teamContext = useContext(TeamContext) //guardo context
    const {id} = useParams();
    const [baseUrl, setBaseUrl] = useState('https://www.superheroapi.com/api.php/10209071625985776/')
    const [hero, setHero] = useState()
    const [bool, setBool] = useState(false)
    const [detail, setDetail] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    
    const getHero = async (baseUrl) => {

        const res = await axios.get(baseUrl + id)
        .then(res => setHero(res.data))
        return hero;
        // console.log(res.data);
        // console.log("heros" + heros);

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        teamContext.add_hero(hero);

    }

    useEffect(() => {
        
        const obtenerHero = async () => {
            const res = await getHero(baseUrl)
            setBool(true);

        }
        
        obtenerHero();
        
        teamContext.getTeam() // Cada vez que se cargue este componente consulta el team    
        teamContext.getTeamSize()
        
    }, [teamContext.message])

    return ( 

        <Fragment>

            {

            bool == true ?

            <div id="main_detail_container" className="mt-5">

                {/* Alert */}
                    {
                        teamContext.message.length>0 ? 
                            <div class="alert alert-success" role="alert">
                                <strong>{teamContext.message}</strong>
                            </div>
                            :
                            <div></div>
                    }
                {/* Fin Alert */}

                <div className="col-md-7 col-lg-8 col-xl-4 p-3 m-auto">
                    
                    <div className="profile-card-1">
                    
                        <div className="img" style={{height: '200px'}} >
                            <img style={{height: '350px'}} src={hero.image.url}/>
                        </div>

                        <div className="mid-section mid-section-detail">
                            <div className="name mt-4">
                                {hero.name}
                            </div>

                            <div className="col description mt-3">

                                {/*ALIAS*/}
                                <div id="Alias" className="col">
                                    <p><strong> Alias: </strong></p>
                                        <p>
                                            {
                                                hero.biography.aliases.map((alias) =>
                                                    <span>{alias + ' / '}</span>
                                                )

                                            }
                                        </p> 
                                </div>

                                {/*PESO-ALTURA*/}
                                <div id="" className="row">
                                    <div className='col'>
                                        <p><strong> Peso: </strong></p>
                                        <p>
                                            <span>{hero.appearance.weight[0]} / {hero.appearance.weight[1]}</span>
                                        </p> 
                                    </div>
                                    
                                    <div className='col'>
                                        <p><strong> Altura: </strong></p>
                                        <p>
                                            <span>{hero.appearance.height[0]} / {hero.appearance.height[1]}</span>
                                        </p> 
                                    </div>
                                </div>

                                {/*OJOS-CABELLO*/}
                                <div id="" className="row">
                                    <div className='col'>
                                        <p><strong> Ojos: </strong></p>
                                        <p>
                                            <span>{hero.appearance['eye-color']}</span>
                                        </p> 
                                    </div>
                                    
                                    <div className='col'>
                                        <p><strong> Cabello: </strong></p>
                                        <p>
                                            <span>{hero.appearance['hair-color']}</span>
                                        </p> 
                                    </div>
                                </div>  

                                {/*LUGAR DE TRABAJO*/}
                                <div id="Alias" className="col">
                                    <p><strong> Lugar de Trabjo: </strong></p>
                                        <p>
                                            <span>{hero.work.base}</span>
                                        </p> 
                                </div>

                                {/*LUGAR DE TRABAJO*/}
                                <div id="Alias" className="col">
                                    <p><strong> Alignment: </strong></p>
                                        <p>
                                            <span>{hero.biography.alignment}</span>
                                        </p> 
                                </div>
                                
                            </div>
                            <div className="line"></div>

                            <div className="stats m-5">
                                

                                <form onSubmit={handleSubmit}>
                                    <button className="btn btn-success">Agregar al Equipo</button>
                                </form>
                                
                            </div> 
    
                        </div>
                
                    
                    </div>
                </div>
            </div>
        : 

        <p>Loading ...</p>

        }

        </Fragment>


     );
}




  
export default HeroDetail;
