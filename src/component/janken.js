import React from 'react';
import { Typography, ListItem, Zoom, IconButton,
    Card, CardHeader, CardContent, ListItemText, Grow, Fade,ListItemSecondaryAction, List, Checkbox, CardActionArea, Button } from '@material-ui/core';
    import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from "aos";
import moment from 'moment';
import Swal from 'sweetalert2';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const timeline = {
    reserved: 1679108400,//1679108400
    closed: 1680973199,
    door: 1681021800,
    event: 1681027200,
    live: 0
}

const pageid = [
  "4oXKD",
  "p_aa0w3k3m4c",
  "p_crbfzg4m4c",
  "p_py0ugr4m4c",
  "p_5ahs135m4c",
  "p_lfwmnj6m4c"
]

const Janken = ({fet, setSec, width}) => {
  const [position, setPosition] = React.useState(0);
    const [result, setResult] = React.useState(width > 800 ? ("https://lookerstudio.google.com/embed/reporting/8b2d0acb-54ff-4d24-8ca0-fb77209be62f/page/" + pageid[position]) : 'https://lookerstudio.google.com/embed/reporting/22b2222d-2235-4f02-9605-04af96c9f2dc/');
    const [max, setMax] = React.useState(0);
    const FetchUpt = () => {
      let tem = max
      if (max == 5) {
        Swal.fire({
          title: "Too many attempt to  fetch result",
          icon: 'error',
          text: 'We temporary blocked your refresh for system performance reason.',
        })
      } else {
        const link = result
        setResult('')
        setTimeout(() => {
          setResult(link)
        }, 100);
        tem += 1
        setMax(tem)
      }
    }

const BackPage = () => {
  if (max < 5) {
    let pos = position
    pos -= 1
    setPosition(pos)
    setResult("https://lookerstudio.google.com/embed/reporting/8b2d0acb-54ff-4d24-8ca0-fb77209be62f/page/" + pageid[pos])
  }
}
const LockChange = () => {
  setResult(result)
}
const NextPage = () => {
  if (max < 5) {
    let pos = position
    pos += 1
    setPosition(pos)
    setResult("https://lookerstudio.google.com/embed/reporting/8b2d0acb-54ff-4d24-8ca0-fb77209be62f/page/" + pageid[pos])
  }
}

    React.useEffect(() => {
      AOS.init({ duration: 1000 });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      setInterval(() => {
        let tem = max
        if (max > 0) {
          tem -= 1
          setMax(tem)
        }
      }, 10000);
      setInterval(() => {
        document.querySelectorAll(".embedding-page-navigation .pageInfo").forEach(a=>a.style.display = "none !important");
      }, 1);
        setSec('Janken Tournament 2023')
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
                Janken Tournament 2023
                </Typography>
                <hr />
                <Typography color="textSecondary">
                The Senbatsu of Destiny is back!
                </Typography>
                    <Typography color="textSecondary">
                        Destiny is hard to predict and cannot be avoided. All candidated BNK48 and CGM48 will be bet on ordinary games that everyone plays. But can decide the fate of Senbatsu at any time.
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
                Janken Tournament 2023
                </Typography>
                <hr />
                <Typography color="textSecondary">
                The Senbatsu of Destiny is back!
                </Typography>
                    <Typography color="textSecondary">
                        Destiny is hard to predict and cannot be avoided. All candidated BNK48 and CGM48 will be bet on ordinary games that everyone plays. But can decide the fate of Senbatsu at any time.
                    </Typography>
              </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  <div className="stage pt-3 pb-5">
    <div className='container'>
    <Card data-aos="zoom-in-up">
            <CardContent className='row'>
                <div className='col-md'>
                    <Typography variant='h5'>The Senbutsu battle with Destiny of Rock-Paper-Scissors!</Typography>
                    <Typography variant='body1'>It is a simple rule, but everything is possible throughout tournament.</Typography>
                </div>
            </CardContent>
        </Card>
        <Card className='mt-4' data-aos="zoom-in-down">
            <CardContent className='row'>
                <div className='col-md'>
                    <Typography variant='h5'>Excitement with every breath</Typography>
                    <Typography variant='body1'>Sixteen-Senbatsu and The one of winner of this tournament is Center Position of BNK48 4th Album. It is a tournament that can win results every second of the competition. (Even the Host or Judge himself)</Typography>
                </div>
            </CardContent>
        </Card>
        <Card className='mt-4' data-aos="zoom-in-right">
            <CardContent className='row'>
                <div className='col-md'>
                    <Typography variant='h5'>The mini-contest with special costume of member's designing</Typography>
                    <Typography variant='body1'>All costume of candidated members are designed and weared by herself. Who is the winner of the best costume in this tournament?</Typography>
                </div>
            </CardContent>
        </Card>
        <Card className='mt-4' data-aos="flip-right">
            <CardContent className='row'>
                <div className='col-md mt-5' data-aos="slide-right">
                    <Typography variant='h5'>Tournament Host and Judge</Typography>
                    <Typography variant='body1'>Coming soon</Typography>
                </div>
                <div className='col-md-3' data-aos="slide-left">
                    <img src='https://www.pngitem.com/pimgs/b/105-1052804_creepy-silhouette-png.png' width='100%' />
                </div>
            </CardContent>
        </Card>

        <Card className='mt-4' data-aos="fade-down">
            <CardContent className='row'>
                <CardHeader title='Tournament Timeline' />
                <List className='col-12'>
                <ListItem data-aos="fade-right" onClick={() => window.open('https://www.eventpop.me/e/14753/bnk48janken2023', '_blank')} className={moment().unix() >= timeline.closed ? 'text-secondary' : ''}>
                  <ListItemText primary="Reserve ticket on Eventpop website and application (Click here to navigate to reserved a ticket)" secondary={moment.unix(timeline.reserved).local().format('DD MMMM YYYY HH:mm:ss') + ' to ' + moment.unix(timeline.closed).local().format('DD MMMM YYYY HH:mm:ss')} />
                 
                  {
                    moment().unix() >= timeline.reserved && moment().unix() <= timeline.closed && (
                        <ListItemSecondaryAction>
                        <IconButton edge="end">
                     <FiberManualRecordIcon className='text-success' />
                   </IconButton>
                 </ListItemSecondaryAction>
                     
                    )
                  }
                   {
                     moment().unix() >= timeline.closed && (
                        <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem data-aos="fade-right" className={moment().unix() >= timeline.closed ? 'text-secondary' : ''}>
                  <ListItemText primary="Door Open" secondary={moment.unix(timeline.door).local().format('DD MMMM YYYY HH:mm:ss')} />
                 
                  {
                    moment().unix() >= timeline.door && moment().unix() <= timeline.event && (
                        <ListItemSecondaryAction>
                        <IconButton edge="end">
                     <FiberManualRecordIcon className='text-success' />
                   </IconButton>
                 </ListItemSecondaryAction>
                     
                    )
                  }
                   {
                     moment().unix() >= timeline.closed && (
                        <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem data-aos="fade-right" className={moment().unix() >= timeline.event + 21600 ? 'text-secondary' : ''}>
                  <ListItemText primary="Event started" secondary={moment.unix(timeline.event).local().format('DD MMMM YYYY HH:mm:ss')} />
                 
                  {
                    moment().unix() >= timeline.event && moment().unix() <= timeline.event + 21600 && (
                        <ListItemSecondaryAction>
                        <IconButton edge="end">
                     <FiberManualRecordIcon className='text-success' />
                   </IconButton>
                 </ListItemSecondaryAction>
                     
                    )
                  }
                   {
                     moment().unix() >= timeline.event + 21600 && (
                        <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem data-aos="fade-right" className={(timeline.live > 0 ? (moment().unix() >= timeline.event + 21600 ? 'text-secondary' : '') : '')}>
                  <ListItemText primary="LIVE Streaming" secondary={timeline.live > 0 ? (moment.unix(timeline.event).local().format('DD MMMM YYYY HH:mm:ss')) : 'Please wait for announcement from BNK48 Official'} />
                 
                  {
                    timeline.live > 0 && moment().unix() >= timeline.live && moment().unix() <= timeline.live + 21600 && (
                        <ListItemSecondaryAction>
                        <IconButton edge="end">
                     <FiberManualRecordIcon className='text-success' />
                   </IconButton>
                 </ListItemSecondaryAction>
                     
                    )
                  }
                   {
                     timeline.live > 0 && moment().unix() >= timeline.live + 21600 && (
                        <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                </List>
            
            </CardContent>
        </Card>
        <Card className='mt-4' data-aos="zoom-in">
            <CardContent className='row'>
                <div className='col-md'>
                    <Typography variant='h5'>How to go to this event</Typography>
                    <Typography variant='body1'>This event is located at Union Hall of Union Mall Latprao, Bangkok, Thailand. However, that day is weekend which maybe traffic jam. Please allow travel time in advance or go through public transportation.</Typography>
                    <iframe
                        width='100%'
                        height="450"
                        allowfullscreen
                        className='mt-3'
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC2NRQHCT_h6ivqJSUmPLKL7o7ZDegGAlg&q=union hall thailand">
                        </iframe>
                </div>
            </CardContent>
        </Card>
        <Card data-aos="zoom-in-down" className='mt-4'>
            <CardContent className='row'>
                <div className='col-md'>
                    <Typography variant='h5'>Tournament Result</Typography>
                    <Typography variant='body1'>Good news, real-time results will be announced soon. along with during the live broadcast</Typography>
                    {
                      width > 800 ?(
                        <iframe width="100%" onClick={() => LockChange()} height={"500"} src={result} allowfullscreen></iframe>
                      ) : (
                        <iframe width="100%" onClick={() => LockChange()} height={"800"} src={result} allowfullscreen></iframe>
                      )
                    }
                  <CardActionArea>
                    <Button color='primary' onClick={() => FetchUpt()}>Fetch result</Button>
                    <Button color='primary' onClick={() => window.open(result, '_blank')}>View this page on new tab</Button>
                  </CardActionArea>
                  {width > 800 && (
                  <CardActionArea>
                    {
                      position > 0 && (
                        <Button color='primary' onClick={() => BackPage()}>Previous Page</Button>
                      )
                    }
                    {
                      position < pageid.length - 1  && (
                        <Button color='primary' onClick={() => NextPage()}>Next Page</Button>
                      )
                    }
                  </CardActionArea>
                  )}
                </div>
            </CardContent>
        </Card>
    </div>
  </div>
        </>
    );
}
 
export default Janken;
