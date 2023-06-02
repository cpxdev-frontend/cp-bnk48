import React from 'react';
import { Typography, CardActionArea, Zoom, Grid,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade, Container } from '@material-ui/core';
    import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from "aos";
import moment from 'moment'
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import MusicCom from './MusicComRe'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Gallery } from "react-grid-gallery";

const Anni = ({fet, setSec, width}) => {

    const [online, setOn] = React.useState(false);
    const [time, setTime] = React.useState('[Loading time]');
    const [Loaded, setLoaded] = React.useState(false);
    const [play, setPlaylist] = React.useState([]);
    const [vdo, setVdo] = React.useState([]);

    const [gal, setGal] = React.useState( []);

    const remainEvent = (unixStart) => {
        setInterval(() => {
            if (moment.unix() >= 1685667600) {
                setTime("It's time to be celebration, please refresh this page to continue")
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
                        setVdo(data.items)
                    })
                    .catch((error) => {
                        setLoaded(true)
                    console.error('Error:', error);
                    });
                    fetch(encodeURI(fet + '/bnk48/bnkdebutgallery'), {
                        method: 'post', // or 'PUT'
                        })
                        .then(response => response.json())
                        .then(data => {
                           let temp = []
                            for (let index = 0; index < data.items.length; index++) {
                                temp.push({
                                    src: data.items[index].thumbnailLink.replace('=s220', '=s700')
                                })
                            }
                            setGal(temp)
                        })
                        .catch((error) => {
                            setLoaded(true)
                        console.error('Error:', error);
                        });
            setInterval(() => {
                if (vdo.length > 0 && play.length > 0 && gal.length > 0) {
                    setLoaded(true)
                } 
            }, 1000);
        }


    React.useEffect(() => {
      AOS.init({ duration: 1000 });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        // fetch(fet + '/tpop/time', {
        //     method :'get'
        // })
        // .then(response => response.text())
        // .then(data => {
        //   if (parseInt(data) >= 1685667600) {
        //     setOn(true)
        //     navigator.vibrate([200, 200]);
        //     FetchData()
        //   } else {
        //     remainEvent(1685667600)
        //     setLoaded(true)
        //   }
        // }).catch(() => {
        //     setLoaded(true)
        // })
        setOn(true)
        FetchData()
        setSec('6th Anniversary of first Debut')
    }, [])

    return ( 
        <>
        {width >1200 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/bnk48/bnkanni.webp" width={width} />
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
  <Card className="bnktheme">
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
            <div className="stage pb-2" style={{opacity: 0.95}}>
                <CardHeader title='BNK48 Event Story Timeline' subheader='Notes: This timeline only includes events that the average person may have heard of. Some events may not be in this timeline.' />
            <Timeline>
            <TimelineEvent 
                    data-aos="fade-right"
                    title="Announcing the establishment of sister band of AKB48"
                    subtitle="JAPAN Expo 2016 at Central World"
                    createdAt={moment.unix(1467824400).utc().format('DD MMMM YYYY') + ' - '+ moment.unix(1468083600).utc().format('DD MMMM YYYY')}
                >
                    The first announcement of sister band of AKB48 such ass BNK48, MNL48, TPE48 (AKB48 Team TP).
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The birth of BNK48 and the borning of the first BNK48 Captain"
                    subtitle="JAPAN Expo 2017 at Central World"
                    createdAt={moment.unix(1486832400).utc().format('DD MMMM YYYY')}
                >
                    The debut of BNK48 in Japan Expo 2017. That is officially grand opening of BNK48. And the first date of Cherprang as BNK48 captain.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The first show of BNK48"
                    subtitle="Quartier Gallery at The Emquartier"
                    createdAt={moment.unix(1496336400).utc().format('DD MMMM YYYY')}
                >
                    The first official performance of BNK48.
                </TimelineEvent>
                 <TimelineEvent 
                    data-aos="fade-right"
                    title="The grand openning of Digital LIVE Studio"
                    subtitle="The Emquartier"
                    createdAt={moment.unix(1496466000).utc().format('DD MMMM YYYY')}
                >
                    Digital LIVE Studio is a place where the BNK48 members have a space to meet their fans. Under a clear glass wall so that everyone who walks by can see them.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The first Handshake event"
                    subtitle="Central Bangna"
                    createdAt={moment.unix(1503680400).utc().format('DD MMMM YYYY') + ' - '+ moment.unix(1503766800).utc().format('DD MMMM YYYY')}
                >
                    The first handshake event (BNK48 1st Single "Aitakata" Handshake event).
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The first of 3rd Single 'Shonichi' live performance"
                    subtitle="Rajamangala National Stadium"
                    createdAt={moment.unix(1521781200).utc().format('DD MMMM YYYY')}
                >
                    The first live performance in the largest outdoor area which BNK48 has arranged.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The Starto Concert"
                    subtitle="Bangkok International Trade & Exhibition Centre (BITEC)"
                    createdAt={moment.unix(1522558800).utc().format('DD MMMM YYYY')}
                >
                    The first BNK48 LIVE concert. And the announcement place of the first BNK48 album 'RIVER'
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The 1st Stage of BNK48 Theater"
                    subtitle="BNK48 Campus, The Mall Bangkapi"
                    createdAt={moment.unix(1524718800).utc().format('DD MMMM YYYY')}
                >
                    The first stage show of BNK48 at BNK48 Theater. BNK48 Theater the their theater. So that the BNK48 members have the opportunity to fully show their singing and dancing performances. Including fans will receive exclusive access to viewing because you have to randomly have access to see because seats are limited. And are inherent in almost all circles of the 48 Group's culture.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The 1st Together Concert"
                    subtitle="Central World"
                    createdAt={moment.unix(1536987600).utc().format('DD MMMM YYYY')}
                >
                    The first BNK48 1st and 2nd Generation concert. And also the first performance of the 4th Single 'Kimi wa melody'
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The 1st of BNK48 General Election Announcement"
                    subtitle="Impact Arena Muangthongthani"
                    createdAt={moment.unix(1548478800).utc().format('DD MMMM YYYY')}
                >
                    The first of BNK48 General Election Result Announcement for BNK48 6th Single 'Beginner'. And That is the one of the largest event forever.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The 1st of BNK48 Sportday"
                    subtitle="Indoor Stadium Huamark"
                    createdAt={moment.unix(1567918800).utc().format('DD MMMM YYYY')}
                >
                    The first of BNK48 Sportday. And it is one of the activities held in the tradition of 48 Group culture.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="BNK48 3rd Generation first meeting"
                    subtitle="BNK48 Campus, The Mall Bangkapi"
                    createdAt={moment.unix(1599627600).utc().format('DD MMMM YYYY')}
                >
                    The first meeting of BNK48 3rd Generation
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The first BNK48 original song in main single list."
                    subtitle="Online only (Covid-19 outbreak reason)"
                    createdAt={moment.unix(1622610000).utc().format('DD MMMM YYYY')}
                >
                    The first BNK48 original song which under as main song of single is released 'D-AAA | ดีอะ' in BNK48 10th Single.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="BNK Governance Token Platform launching"
                    subtitle="Digital LIVE Studio at MBK Center"
                    createdAt={moment.unix(1654146000).utc().format('DD MMMM YYYY')}
                >
                    The future of 48 Group merchandise trading with Utility digital token undered by Independent Artist Management and Token X (subsidiary of SCB X PCL.)
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The first Request Hours Concert"
                    subtitle="Union Hall, Union Mall"
                    createdAt={moment.unix(1668920400).utc().format('DD MMMM YYYY')}
                >
                    The first of BNK48 and CGM48 Request Hours concert. Request Hours is a concert that allows fans to participate in arranging a set of songs that will be performed. where the BNK48 and CGM48 members themselves never knew in advance what songs they would have to perform
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="Farewells are not just a myth."
                    subtitle="Terminal Rama 3"
                    createdAt={moment.unix(1668920400).utc().format('DD MMMM YYYY')}
                >
                    BNK48 1st generation special single 'Jiwaru Days' is released. The farewell single of 19 BNK48 members who are already terminated the BNK48 members contract
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="The last BNK48 stage of BNK48 1st Generation full team members"
                    subtitle="BNK48 Campus, The Mall Bangkapi"
                    createdAt={moment.unix(1671339600).utc().format('DD MMMM YYYY')}
                >
                    The last of BNK48 1st Generation stage. It is a stage in memory of many BNK48 fans.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="Cherprang's acceptance of Shihainin"
                    subtitle="SF Cinema at MBK Center"
                    createdAt={moment.unix(1672203600).utc().format('DD MMMM YYYY')}
                >
                    That announcement made her have three roles: Shihainin (BNK48 Manager), Captain and also member too.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="Cherprang's graduation announcement"
                    subtitle="Union Hall, Union Mall"
                    createdAt={moment.unix(1681016400).utc().format('DD MMMM YYYY')}
                >
                    There is many important events in that day. First, it's the secondary of Janken Tournament. Second, Cherprang has benn announcement to graduated from BNK48. As a result, she ended her role as captain of BNK48 as well (she still as Shihainin). The finally, BNK48 14th Single has been announcement including announcing her last concert.
                </TimelineEvent>
                <TimelineEvent 
                    data-aos="fade-right"
                    title="BNK48 14th Single first performance"
                    subtitle="Bangkok City Hall"
                    createdAt={moment.unix(1685682000).utc().format('DD MMMM YYYY')}
                    icon={<StarBorderIcon />}
                >
                    The first performance of BNK48 14th single 'Promise - สัญญานะ' which be soon and including participating in the Music Video filming as well. And it's the 6th year anniversary of the first debut of BNK48 too.
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
                <div className={(width < 800 ? '' : 'row') +' justify-content-center'}>
                {vdo.length > 0 ? vdo.map((item,i) => (
                       <MusicCom item={item} i={i} data-aos="zoom-in" />
                 )) : (
                    <Zoom in={true} timeout={{ enter: 200, exit: 200}}>
                 <Card className='p-5 text-center col mt-5'>
                <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-5 mb-5' />
                Connect to service
          </Card>
              </Zoom>
                 )}
        </div>
        <div className="stage pb-2 text-center" style={{opacity: 0.9}}>
                <CardHeader title='BNK48 Memories Gallery' subheader="Storage Provided by Google Drive. Photos from BNK48 official and another cameramen" />
                <div className='container'>
                {vdo.length > 0 ?  (
                    <Gallery images={gal} />
                 ) : (
                    <Zoom in={true} timeout={{ enter: 200, exit: 200}}>
                 <Card className='p-5 text-center col mt-5'>
                <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-5 mb-5' />
                Connect to service
          </Card>
              </Zoom>
                 )}
                </div>
        </div>
            </div>
            </>
          )}
        </>
    );
}
 
export default Anni;
