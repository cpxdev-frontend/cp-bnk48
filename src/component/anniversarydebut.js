import React from 'react';
import { Typography, CardActionArea, Zoom, Grid,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade, Container } from '@material-ui/core';
    import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from "aos";
import moment from 'moment'
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import MusicCom from './MusicComRe'


const Anni = ({fet, setSec, width}) => {

    const [online, setOn] = React.useState(false);
    const [time, setTime] = React.useState('[Loading time]');
    const [Loaded, setLoaded] = React.useState(false);
    const [play, setPlaylist] = React.useState([]);
    const [vdo, setVdo] = React.useState([]);

    const remainEvent = (unixStart) => {
        setInterval(() => {
            if (moment.unix() >= 1685667600) {
                setTime("It's time to be celebration, please scroll below")
            } else {
                let start = moment(); // some random moment in time (in ms)
                let end = moment.unix(unixStart); // some random moment after start (in ms)
                const ms = end.diff(start)
                const date = moment.duration(ms)
                // execution
                let f = Math.floor(date.asDays()) + ' Day(s) ' + moment.utc(ms).format("H") + ' Hour(s) ' + moment.utc(ms).format("mm") + ' Minute(s) '+ moment.utc(ms).format("ss") + ' Second(s)';
                setTime(f)
            }
        }, 1000);
    }

        const FetchData = () => {
            fetch(encodeURI(fet + '/bnk48/spotanniversary'), {
                method: 'post', // or 'PUT'
                })
                .then(response => response.text())
                .then(data => {
                    setLoaded(true)
                  const json = JSON.parse(data.replaceAll('From "', "From '").replaceAll('One Take"', "One Take'").replaceAll('บ้านเธอ"', "บ้านเธอ'").replaceAll('คนนี้"', "คนนี้'"))
                  setPlaylist(json.items)
                })
                .catch((error) => {
                    setLoaded(true)
                console.error('Error:', error);
                });
                fetch(encodeURI(fet + '/bnk48/getanniversaryPlaylist'), {
                    method: 'post', // or 'PUT'
                    })
                    .then(response => response.json())
                    .then(data => {
                        setLoaded(true)
                        setVdo(data.items)
                    })
                    .catch((error) => {
                        setLoaded(true)
                    console.error('Error:', error);
                    });
            setInterval(() => {
                if (vdo.length > 0 && play.length > 0) {
                    setLoaded(true)
                } 
            }, 1000);
        }


    React.useEffect(() => {
      AOS.init({ duration: 1000 });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/tpop/time', {
            method :'get'
        })
        .then(response => response.text())
        .then(data => {
          if (parseInt(data) >= 1685667600) {
            setOn(true)
            FetchData()
          } else {
            remainEvent(1685667600)
            setLoaded(true)
          }
        }).catch(() => {
            setLoaded(true)
        })
        setSec('6th Anniversary of first Debut')
    }, [])

    return ( 
        <>
        {width >1200 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/bnk48/sub13th.jpg" width={width} />
              </Fade>
      </div>
        )}
             {width >1200 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
              <CardContent>
              <Typography variant="h5" component="h2">
                    BNK48 6th years Anniversary first debut celebration
                </Typography>
                <hr />
                <Typography color="textSecondary">
                Let's celebration together
                </Typography>
                <Typography color="textSecondary">
                    {online ? "It's time to be celebration, please scroll below" : 'This event will be soon in ' + time}
                </Typography>
              </CardContent>
            </Card>
            </Grow>
          </div>
          ) : (
        <div className="pb-5 pt-2">
    <Grow in={true} timeout={1000}>
  <Card className="bnktheme ml-2 mr-2">
      <CardContent>
        <Typography variant="h5" component="h2">
        BNK48 6th years Anniversary first debut celebration
        </Typography>
        <hr />
        <Typography color="textSecondary">
          Let's celebration together
        </Typography>
        <Typography color="textSecondary">
        {online ? "It's time to be celebration, please scroll below" : 'This event will be soon in ' + time}
        </Typography>
      </CardContent>
    </Card>
    </Grow>
  </div>
          )}
          {online && (
            <>
            <Card className='mb-5 text-center'>
                <CardContent>
                    Welcome to BNK48 6th years Anniversary first debut celebration. This is online gallery to to bring back the memories of these girls group.
                </CardContent>
            </Card>
            <div className="stage pb-2" style={{opacity: 0.9}}>
                <CardHeader title='BNK48 Event Story Timeline' />
            <Timeline>
            <TimelineEvent 
                    title="Announcing the establishment of sister band of AKB48"
                    subtitle="JAPAN Expo 2016 at Central World"
                    createdAt={moment.unix(1467824400).format('DD MMMM YYYY') + ' - '+ moment.unix(1468083600).format('DD MMMM YYYY')}
                >
                    The first announcement of sister band of AKB48 such ass BNK48, MNL48, TPE48 (AKB48 Team TP).
                </TimelineEvent>
                <TimelineEvent 
                    title="The birth of BNK48"
                    subtitle="JAPAN Expo 2017 at Central World"
                    createdAt={moment.unix(1486832400).format('DD MMMM YYYY')}
                >
                    The debut of BNK48 in Japan Expo 2017. That is officially grand opening of BNK48.
                </TimelineEvent>
                <TimelineEvent 
                    title="The first show of BNK48"
                    subtitle="Quartier Gallery at The Emquartier"
                    createdAt={moment.unix(1496336400).format('DD MMMM YYYY')}
                >
                    The first official performance of BNK48.
                </TimelineEvent>
                <TimelineEvent 
                    title="The first Handshake event"
                    subtitle="Central Bangna"
                    createdAt={moment.unix(1503680400).format('DD MMMM YYYY') + ' - '+ moment.unix(1503766800).format('DD MMMM YYYY')}
                >
                    The first handshake event (BNK48 1st Single "Aitakata" Handshake event).
                </TimelineEvent>
            </Timeline>
            </div>
            <div className="stage pb-2 text-center" style={{opacity: 0.9}}>
                <CardHeader title='BNK48 6th Anniversary Celebration Playlist' subheader="Let's join celebrate together. Provided by Spotify" />
                <Container>
         <Grid container spacing={2} className='justify-content-center mt-3'>
              {play.length > 0 ? play.map((item,i) => (
                   <Grid key={item.track.id} item md={3} data-aos="zoom-in">
                <Card className={'text-center mb-3' + (width < 700 ? ' bnktheme' : '')}>
                  <CardContent>
                    <CardActionArea onClick={() => window.open(item.track.external_urls.spotify, '_blank').focus()}>
                  <Typography variant="h5" component="h2">
                    {item.track.name}
                    </Typography>
                    <hr />
                    <CardMedia
                        className='mb-3'
                        src={item.track.album.images[0].url}
                        component="img"
                    />
                     <Typography variant="body1">
                        {item.track.album.album_type =='single' && item.track.album.total_tracks == 1 ? 'The single song by ' + item.track.artists[0].name : item.track.album.album_type =='single' && item.track.album.total_tracks > 1 ? 'This Extended Play (EP) included ' + item.track.album.total_tracks +' tracks.'  : 'This Studio Album included ' + item.track.album.total_tracks +' tracks.' }
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Release date: {new Date(item.track.album.release_date).toDateString()}
                    </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
                </Grid>
              )) : (
                <Zoom in={true} timeout={{ enter: 200, exit: 200}}>
                 <Card className='p-5 text-center mt-5 col-12'>
                <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-5 mb-5' />
                Connect to service
          </Card>
              </Zoom>
              )}
        </Grid>
        </Container>
            </div>
            <div className="stage pb-2 text-center" style={{opacity: 0.9}}>
                <CardHeader title='BNK48 6th Anniversary Rewind Music Video' subheader="Threw back to all BNK48 music video in memories. Let's do it! Provided by Youtube" />
                <div className='row justify-content-center'>
                {vdo.length > 0 ? vdo.map((item,i) => (
                       <MusicCom item={item} i={i} />
                 )) : (
                    <Zoom in={true} timeout={{ enter: 200, exit: 200}}>
                 <Card className='p-5 text-center col-12 mt-5'>
                <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-5 mb-5' />
                Connect to service
          </Card>
              </Zoom>
                 )}
        </div>
            </div>
            </>
          )}
        </>
    );
}
 
export default Anni;
