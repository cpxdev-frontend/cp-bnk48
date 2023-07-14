import React from 'react'

import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, MenuItem, Button, ButtonGroup, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AOS from "aos";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
mapboxgl.accessToken = 'pk.eyJ1IjoiY3B4dGgyMDE3IiwiYSI6ImNsZHY0MzN6bTBjNzEzcXJmamJtN3BsZ3AifQ.mYNwWaYKsiLeYXngFDtaWQ';

const Memberlist = ({fet, setSec, width}) => {
  const [list, setList] = React.useState([]);
    const mapContainer = React.useRef(null);
    const map = React.useRef(null);
    React.useEffect(() => {
        setSec('BMA Project')
      },[])
    

    const History = useHistory()

    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (map.current) return; // initialize map only once
          map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [100.4935089, 13.7524938],
          zoom: 10,
          maxZoom:20,
          minZoom: 8
          });
          
          fetch('https://cpxdevapi' + (Math.floor(Math.random() * 2) + 1).toString() +'.azurewebsites.net/bnk48/getbmaproject',{
            method: 'post'
          })
          .then(response => response.json())
          .then((res) => {
            if (map.current != null) {
              let geo = []
              for (let i=0; i< res.response.length; i++){
                const coodinate = [res.response[i].coodinate[1], res.response[i].coodinate[0]]
                const popup = new mapboxgl.Popup()
                  .setHTML('<p id="'+ res.response[i].threadId + '">' + res.response[i].placeName +'</p>')
                  .addTo(map.current);
                popup.remove();
                
                const props = { "color": "rgb(203, 150, 194)",easeId: res.response[i].threadId }
                new mapboxgl.Marker(props)
                  .setLngLat(coodinate).addTo(map.current).setPopup(popup)
                  
              }
              map.current.on("dblclick", (e) => {
                const marker = e.target._popups[0]._lngLat;
                console.log(marker);
              });
              setList(res.response)
            }
          })
          .catch(() => {});
    }, [])


 

    return ( 
        <>
        <h3 className='text-center mt-4'>Please visit ... too (ฝาก...ด้วยนะ)</h3>
        <p className='text-center mt-4'>Let's take a tour around Bangkok with BNK48 and Bangkok Metropolitan Administration</p>
        <br />
        <div className="stage pt-3 text-center">
           <Card className='container pt-3 pb-3' data-aos="zoom-in">
            <div ref={mapContainer} className="map-container" />
           </Card>
        </div>
        </>
     );
}
 
export default Memberlist;
