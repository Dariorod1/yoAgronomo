import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {getEmpresa} from '../../redux/actions/empresaActions';
import styles from './styles.module.css'

import data from './data.json'


function DetailEmpresa ({id}) {

    const dispatch = useDispatch();
    // const {id} = props.match.params;
    const empresa = useSelector(state=>state.empresaReducer.empresaForId);
    
    useEffect(()=> {
        dispatch(getEmpresa(id));
        
    }, []);
    

    return (
        <div className={styles.background}>
            {/* {
            
                
                    <div>
                    <li key={empresa.id}>
                    <h1 className={styles.name}>{empresa.name}</h1>
                    <div className={styles.caja}>
                    <div className={styles.description}>
                    <h3>Hectáreas totales: {empresa.hectáreas}</h3>
                    <h3>Ubicación: {empresa.ubicación}</h3>
                    <h2>Tareas a realizar:</h2>
                    
                    </div>
                    </div>
                    </li>
                    </div>
                
            } */}
                     
            
                
            { <div className={styles.div}>
            <li >
            <h1 className={styles.name}>{empresa.name}</h1>
            <div className={styles.caja}>
            <div className={styles.description}>
            <h3>📏 Hectáreas totales: {empresa.hectareas}</h3>
            <h3>📍 Ubicación: {empresa.ubicacion}</h3>
            <h2>📝 Tareas a realizar:</h2>
            <div className={styles.tareas}>
            <div className={styles.items}>
            <div className={styles.items}>
           <h3 style={{color: "red"}}>▶</h3>
           </div> 
           <div className={styles.items}>
           <h3> Monitoreo de lotes</h3>
           </div>
           </div>
           <div className={styles.items}>
            <div className={styles.items}>
           <h3 style={{color: "yellow"}}>▶</h3>
           </div>
           <div className={styles.items}>
            <h3>Diagramación de plan de siembra</h3>
            </div>
            </div>
            <div className={styles.items}>
            <div className={styles.items}>
            <h3 style={{color: "green"}}>▶</h3>
            </div>
            <div className={styles.items}>
            <h3>Formulación de aplicaciones</h3>
            </div>
            </div>
            </div>
            </div>
            </div>
            </li>
            </div> }
        
    

        </div>
    )
}

export default DetailEmpresa;