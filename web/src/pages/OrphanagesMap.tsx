import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import mapMakerImg from '../images/map-marker.svg';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanage-map.css'
import Orphanage from './Orphanage';

interface Orphanage{
  id:number;
  latitude:number;
  longitude:number;
  name: string;
}

function OrphanagesMap(){
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  
  useEffect(()=>{
    api.get('orphanages').then(response =>{
      setOrphanages(response.data);
    })
  }, [])

  return(
      <div id="page-map">
          <aside>
              <header>
                  <img src={mapMakerImg} alt="Happy"/>

                  <h2>Escolha um orfanato no mapa</h2>
                  <p>Muitas crianças estão esperando a sua visita :)</p>
              </header>

              <footer>
                  <strong>São Paulo</strong>
                  <span>Limeira</span>
              </footer>
          </aside>

          <Map 
              center={[-22.582321,-47.3786193]}
              zoom={16}
              style={{ width:'100%' , height: '100%'}}
          >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

              {orphanages.map(orphanage =>{
                return(
                  <Marker 
                    key={orphanage.id}
                    icon={mapIcon}
                    position={[orphanage.latitude, orphanage.longitude]}
                  >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                      {orphanage.name}
                      <Link to={`/orphanages/${orphanage.id}`}>
                        <FiArrowRight size={20} color="#FFF"/>
                      </Link>
                    </Popup>
                  </Marker>
                )
              })}

          </Map>

          <Link to="./orphanages/create" className="create-orphanage">
              <FiPlus size={32} color="#fff"/>
          </Link>
      </div>

  )
}

export default OrphanagesMap;