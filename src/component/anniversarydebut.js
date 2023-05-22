import React from 'react';
import { Typography, ListItem, Zoom, IconButton,
    Card, CardHeader, CardContent, CardMedia, Grow, Fade } from '@material-ui/core';
    import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from "aos";
import moment from 'moment'
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';

const Anni = ({fet, setSec, width}) => {

    const [online, setOn] = React.useState(false);
    const [time, setTime] = React.useState('[Loading time]');
    const [Loaded, setLoaded] = React.useState(false);
    const [play, setPlaylist] = React.useState([]);
    const [vdo, setVdo] = React.useState([]);

    const remainEvent = (unixStart) => {
        setInterval(() => {
            let start = moment(); // some random moment in time (in ms)
        let end = moment.unix(unixStart); // some random moment after start (in ms)
        const ms = end.diff(start)
        const date = moment.duration(ms)
        // execution
        let f = Math.floor(date.asDays()) + ' Day(s) ' + moment.utc(ms).format("H") + ' Hour(s) ' + moment.utc(ms).format("mm") + ' Minute(s) '+ moment.utc(ms).format("ss") + ' Second(s)';
        setTime(f)
        }, 1000);
    }

        const FetchData = () => {
            fetch(encodeURI(fet + '/bnk48/spotanniversary'), {
                method: 'post', // or 'PUT'
                })
                .then(response => response.text())
                .then(data => {
                    setLoaded(true)
                  const json = data.replaceAll('From "', "From '").replaceAll('One Take"', "One Take'").replaceAll('บ้านเธอ"', "บ้านเธอ'").replaceAll('คนนี้"', "คนนี้'")
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
                BNK48 6th Anniversary first debut celebration
                </Typography>
                <hr />
                <Typography color="textSecondary">
                Fresh news about BNK48 right here!
                </Typography>
                <Typography color="textSecondary">
                    {online ? "It's time to be celebration, please scroll bellow" : 'This event will be soon in ' + time}
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
        BNK48 6th Anniversary first debut celebration
        </Typography>
        <hr />
        <Typography color="textSecondary">
          Fresh news about BNK48 right here!
        </Typography>
        <Typography color="textSecondary">
        {online ? "It's time to be celebration, please scroll bellow" : 'This event will be soon in ' + time}
        </Typography>
      </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  <div className="stage pb-2">
  
  </div>
        </>
    );
}
 
export default Anni;
