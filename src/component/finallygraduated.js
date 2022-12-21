import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Fade, Zoom, Grow, Typography, ButtonGroup, CardHeader } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import vPack from './pack.json'
import AOS from "aos";
import { Share } from 'react-twitter-widgets'
import moment from 'moment'

const Graduated = ({fet, setSec}) => {

    React.useEffect(() => {
        setSec('Graduation Gallery')
      },[])
    

    const History = useHistory()

    const [Loaded, setLoaded] = React.useState(false);
    const [Loaded1, setLoaded1] = React.useState(false);


    const [mem, setmem] = React.useState([]);
    const [song, setSong] = React.useState([]);
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/bnk48/memberListFullGraduation', {
            method :'get'
        })
            .then(response => response.json())
            .then(data => {
                setmem(data.response)
                setLoaded(true)
            }).catch(() => {
                setmem([])
                setLoaded(true)
            })
        fetch(fet + '/bnk48/bnk481stgenplaylist', {
            method :'post'
        })
            .then(response => response.text())
            .then(data => {
                try {
                    let str = data;
                    str = str.replaceAll(`""`, `'"`).replaceAll(`From "`, "From '").replaceAll(`")"`, `')"`)
                    const json = JSON.parse(str)
                    setSong(json.res.tracks.items)
                } catch(err) {
                    setSong([])
                }
                setLoaded1(true)
            }).catch(() => {
                setSong([])
                setLoaded1(true)
            })
    }, [])

    

    const ChangeRoute = (name) =>{
        const link = "https://twitter.com/intent/tweet?hashtags=" + name + "BNK48,fanspaceplatform,bnk48_1stgeneration,48groupthailand,bnk48&original_referer=https://bnk48fan.cpxdev.tk&text=(Enter your moment to " + name+" BNK48 here)&url=https://bnk48fan.cpxdev.tk"
        window.open(link, "_blank")
    }


    return ( 
        <>
        {window.innerWidth >1200 && (
          <div class="video-background">
           <Fade in={true} timeout={800}>
           <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket/bnk48/bnk1stgenfull.png" width={window.innerWidth} />
              </Fade>
      </div>
        )}
             {window.innerWidth >1200 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
              <CardContent>
              <Typography variant="h5" component="h2">
                BNK48 Graduation
                </Typography>
                <hr />
                    <Typography color="textSecondary">
                    Let's good bye her as BNK48 members.
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
          BNK48 News
        </Typography>
        <hr />
                <Typography color="textSecondary">
                    Let's good bye her as BNK48 members.
                    </Typography>
      </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  <div className="stage pb-2 text-center justify-content-center">
    <CardHeader title={( <h3 className='text-center mt-4'>Members</h3>)} subheader={(<p className='text-center text-muted'>Tap or click member who want to add some moment to her on Twitter.</p>)} />
       <Zoom in={mem.length > 0 ? Loaded : false}>
             <Card className='mt-2 ml-5 mr-5 text-center'>
                     <CardContent>
                         Found {mem.length} matched BNK48 members
                     </CardContent>
                 </Card>
             </Zoom>
            
            {Loaded ? (
                <div className='row ml-3 mr-3 mt-5 justify-content-center'>
                {mem.length > 0 ? mem.map((item, i) => (
                      <div data-aos="zoom-in" className='col-md-3 mb-5 text-center' onClick={() => ChangeRoute(item.name)}>
                        <Card>
                            <CardActionArea>
                            <CardMedia
                                    src={item.img}
                                    component="img"
                                    />
                                <CardContent>
                                    <h5>{item.name}</h5>
                                    <p>{item.fullnameEn[0]} {item.fullnameEn[1]}</p>
                                    <br />
                                </CardContent>
                                </CardActionArea>
                                </Card> 
                            </div>
                   
                )) : (
                    <div className='text-center col-md-12'>
                        <h6>No BNK48 members to show. Please try different keyword</h6>
                    </div>
                )}
            </div>
            ) : (
                <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                </Zoom>
            )}

            <Zoom in={song.length > 0 ? Loaded1 : false}>
             <Card className='mt-2 ml-5 mr-5 text-center'>
                <CardActionArea onClick={() => window.open("https://open.spotify.com/playlist/7F30bXVNDvQPf3J9KNPahV", "_blank")}>
                     <CardContent>
                        <CardHeader title="BNK48 1st Generation in memories playlist" subheader="Provided by Spotify. Click here to view full playlist" />
                     </CardContent>
                </CardActionArea>
                 </Card>
             </Zoom>

            {Loaded1 ? (
                <div className='row ml-3 mr-3 mt-5 justify-content-center'>
                {song.length > 0 ? song.map((item, i) => (
                      <div data-aos="zoom-in" className='col-md-3 mb-5 text-center' onClick={() => window.open(item.track.external_urls.spotify, "_blank")}>
                        <Card>
                            <CardActionArea>
                            <CardMedia
                                    src={item.track.album.images[0].url}
                                    component="img"
                                    />
                                <CardContent>
                                    <h5>{item.track.name}</h5>
                                    <p>{moment(item.track.album.release_date, "YYYY-MM-DD").format("DD MMMM YYYY")}</p>
                                    <br />
                                </CardContent>
                                </CardActionArea>
                                </Card> 
                            </div>
                   
                )) : (
                    <div className='text-center col-md-12'>
                        <h6>This playlist is unavaliable right now.</h6>
                    </div>
                )}
            </div>
            ) : (
                <Zoom in={Loaded1 ? false : true} timeout={{ enter: 200, exit: 200}}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                </Zoom>
            )}
            </div>
        </>
    );

}
 
export default Graduated;
