import React,{useState,useContext,useEffect} from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from 'react-leaflet'
import L ,{Icon} from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import *  as hospData from "../../data/nigeriahealthfacilities.json"
import 'leaflet/dist/leaflet.css'
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

/* 
let iconImage =L.icon({
    iconUrl: icon,
}) */
//const fetcher=(...args)=>fetch(..args).then(response=>resp.json())
//inside component
//const url = "link"
//const {data, error}=useSwr(url,{fetcher})

//const hosp=data && !error?data.slice(0,100)
L.Marker.prototype.options.icon =DefaultIcon;

export default function Map() {
    const [position, setPosition]=useState([9.0820,8.6753])
    const [position2, setPosition2]=useState([7.418090,3.905210])
    const [zoom, setZoom]=useState(5)
    const [scrollwh, setScrollWl]=useState(false)
    const hpdata=hospData.features.slice(0,100)

useEffect(() => {
   
   navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position)
      setPosition2([ position.coords.latitude, position.coords.longitude  ])
  })
  //console.log(hospData.features.length)

  return () => {
   // setPosition([9.081999,8.675277])
  }
}, [])


  return (
    <div>
        <MapContainer className="map" center={position}  zoom={zoom} scrollWheelZoom={scrollwh}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={hpdata}/>
      {/*  <Marker position={position} >
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>  */}
        </MapContainer>
    
    </div>
  )
}
