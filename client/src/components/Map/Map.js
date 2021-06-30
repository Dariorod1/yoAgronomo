import React, { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";
import { postPolyId } from "../../redux/actions/agroApiActions";
import {useHistory,Link} from 'react-router-dom'

import './Map.css';

const Map = () => {
    // Store Polygon path in state
    const [path, setPath] = useState([
      {lat: -31.328535, lng: -61.530424},
      {lat: -31.329063, lng: -61.527094},
      {lat: -31.3337, lng: -61.528055},
      {lat: -31.333113, lng: -61.531626}
    ]);
    const [middle, setMiddle] = useState([])
    const [coordenadas,setCoordenadas] = useState({
      coord1: null,
      coord2:null,
      coord3:null,
      coord4:null,
      coord5:null
    })


    console.log(coordenadas)
    

    const dispatch = useDispatch()
    const history = useHistory()

    const aux = {
      name:"gaby",
      geo_json:{
        type:"Feature",
        properties:{
          
        },
         geometry:{
           type:"Polygon",
            coordinates:[
              [
                coordenadas.coord1,
                  coordenadas.coord2,
                  coordenadas.coord3,
                  coordenadas.coord4,
                  coordenadas.coord5
                ]
              ]
         }
        }
   }
 
   function handleSubmit(e){
    e.preventDefault();
      setCoordenadas({
        coord1: [parseFloat(path[0].lng.toString().slice(0, 11)), parseFloat(path[0].lat.toString().slice(0, 11))],
        coord2: [parseFloat(path[1].lng.toString().slice(0, 11)), parseFloat(path[1].lat.toString().slice(0, 11))],
        coord3: [parseFloat(path[2].lng.toString().slice(0, 11)), parseFloat(path[2].lat.toString().slice(0, 11))],
        coord4: [parseFloat(path[3].lng.toString().slice(0, 11)), parseFloat(path[3].lat.toString().slice(0, 11))],
        coord5: [parseFloat(path[0].lng.toString().slice(0, 11)), parseFloat(path[0].lat.toString().slice(0, 11))]
      })
    console.log(coordenadas)
    dispatch(postPolyId(aux))
    // history.push('/agroapi')
  }
  
    // Define refs for Polygon instance and listeners
    const polygonRef = useRef(null);
    const listenersRef = useRef([]);
  
    // Call setPath with new edited path
    const onEdit = useCallback(() => {
      if (polygonRef.current) {
        const nextPath = polygonRef.current
          .getPath()
          .getArray()
          .map(latLng => {
            return { lat: latLng.lat(), lng: latLng.lng() };
          });
        setPath(nextPath);
        setMiddle({lat: ((path[0].lat + path[1].lat) / 2), lng:((path[0].lng + path[3].lng) / 2)})
      }
    }, [setPath]);
  
    // Bind refs to current Polygon and listeners
    const onLoad = useCallback(
      polygon => {
        polygonRef.current = polygon;
        const path = polygon.getPath();
        listenersRef.current.push(
          path.addListener("set_at", onEdit),
          path.addListener("insert_at", onEdit),
          path.addListener("remove_at", onEdit)
        );
      },
      [onEdit]
    );
  
    // Clean up refs
    const onUnmount = useCallback(() => {
      listenersRef.current.forEach(lis => lis.remove());
      polygonRef.current = null;
    }, []);
  
    console.log("The path state is", path);
    console.log('hola')
    console.log('The middle is', middle)

    const apiKey= process.env.REACT_APP_GOOGLE_API_KEY

  return (
    <div className="googleMapsCont">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={apiKey}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="googleMaps"
          center={path[0]}
          zoom={15}
          version="weekly"
          on
        >
          <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            path={path}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
        </GoogleMap>
      </LoadScript>
     
      <button onClick={handleSubmit}>Agregar coordenadas</button>
      <Link to = '/agroapi'>
        <button>Ver el detalle</button>
      </Link>
    </div>
  );
}

export default Map;