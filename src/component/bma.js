import React from 'react'

import { Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardMedia, Button, CardHeader, CardContent, Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import AOS from "aos";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Swal from 'sweetalert2';
import Carousel from 'react-material-ui-carousel'
 
mapboxgl.accessToken = 'pk.eyJ1IjoiY3B4dGgyMDE3IiwiYSI6ImNsZHY0MzN6bTBjNzEzcXJmamJtN3BsZ3AifQ.mYNwWaYKsiLeYXngFDtaWQ';
const bnk = {
  path: 'https://cdn.statically.io/gl/cpx2017/iamprofile@main/bnk14thsing/',
  type: '.jpg'
}
const Memberlist = ({fet, setSec, width, login}) => {
  const [data, setData] = React.useState(null);
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
              map.current.on("click", (e) => {
                const marker = JSON.parse(JSON.stringify(e.target._popups[0]._lngLat));
                console.log(marker)
                const d = res.response.filter(x => x.coodinate[0]  == marker.lat && x.coodinate[1]  == marker.lng);
                if (d.length > 0) {
                  map.current.setCenter([d[0].coodinate[1], d[0].coodinate[0]]);
                  setData(d[0])
                }
              });
              setList(res.response)
            }
          })
          .catch(() => {});
    }, [])

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
 

    const ListClick = (item) => {
      map.current.setCenter([item.coodinate[1], item.coodinate[0]]);
      setData(item)
    }

    return ( 
        <>
        <h3 className='text-center mt-4'>Please visit ... too (ฝาก...ด้วยนะ)</h3>
        <p className='text-center mt-4'>Let's take a tour around Bangkok with BNK48 and Bangkok Metropolitan Administration</p>
        <br />
        <div className="stage pt-3 text-center">
           <Card className='container pt-3 pb-3 mb-3' data-aos="zoom-in">
            <div ref={mapContainer} className="map-container" />
           </Card>
        </div>
        {data != null && (
          <Dialog
          open={data != null}
          onClose={() => setData(null)}
          maxWidth='lg'
        >
          <DialogTitle id="alert-dialog-title"><CardHeader title={data.placeName} subheader={data.locateIn} /></DialogTitle>
          <DialogContent>
          {login ? (
            <Carousel interval={8000} autoPlay={false}>
            <Card>
              <img src={data.src} width="100%" />
            </Card>
            <Card>
            <CardMedia
                component='iframe'
                height={450}
                src={'https://www.youtube.com/embed/' + data.videoTag +'?mute=1'}
                allowFullScreen
            />
            </Card>
           </Carousel>
          ) : (
            <Card>
              <img src={data.src} width="100%" />
            </Card>
          )}
            <DialogContentText id="alert-dialog-description" className='pt-3'>
              {login && (
               <div className='mb-4'>
               <h5>
               BNK48 Members included
               </h5>
                <AvatarGroup max={4}>
                  {
                    data.memberIncluded.map((it) => (
                      <Avatar onClick={() => History.push('/member/' + it.toLowerCase())} alt={it} style={{width: 50, height: 50}} src={bnk.path + it.toLowerCase() + bnk.type} />
                    ))
                  }
                </AvatarGroup>
                <p>{data.memberIncluded.join(', ')}</p>
               </div>
              )}
              {data.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button href={data.placeLink} target="_blank" color="primary" variant='outlined'>
              Get direction
            </Button>
            <Button onClick={() => setData(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        )}
         <div className={width > 600 ? 'row pt-5 m-5' : 'row pt-4 m-2'}>
          {list.length > 0 ? list.map((item, i) => data == null && (
              <div className='col-md-12 mb-5' data-aos="zoom-in-down">
              <Card onClick={() => ListClick(item)}>
              <CardHeader
                title={item.placeName}
                subheader={item.locateIn}
              />
               <CardContent>
                  {
                    login ? (
                      <AvatarGroup max={4}>
                      {
                        item.memberIncluded.map((it) => (
                          <Avatar onClick={() => History.push('/member/' + it.toLowerCase())} alt={it} style={{width: 50, height: 50}} src={bnk.path + it.toLowerCase() + bnk.type} />
                        ))
                      }
                    </AvatarGroup>
                    ) : null
                  }
              </CardContent>
            </Card>
            </div>
          )) : (
            <div className='text-center'>
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
          </div>
          )}
          {list.length > 0 ? list.map((item, i) => data != null && data.threadId == item.threadId && (
              <div className='col-md-12 mb-5' data-aos="zoom-in-down">
              <Card onClick={() => ListClick(item)}>
              <CardHeader
                title={item.placeName}
                subheader={item.locateIn}
              />
              <CardContent>
                  {
                    login ? (
                      <AvatarGroup max={4}>
                      {
                        item.memberIncluded.map((it) => (
                          <Avatar onClick={() => History.push('/member/' + it.toLowerCase())} alt={it} style={{width: 50, height: 50}} src={bnk.path + it.toLowerCase() + bnk.type} />
                        ))
                      }
                    </AvatarGroup>
                    ) : null
                  }
              </CardContent>
            </Card>
            </div>
          )) : (
            <div className='text-center'>
              <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
          </div>
          )}
           </div>
        </>
     );
}
 
export default Memberlist;
