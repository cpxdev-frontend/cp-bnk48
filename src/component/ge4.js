import React from 'react';
import { Box, CircularProgress,Typography, IconButton, FormControlLabel, DialogTitle, DialogContent, ListItem, DialogActions, Dialog, ListItemText,
Card, CardContent, TextField, Button, ListItemSecondaryAction, List, Checkbox, Fade, Grow, CardHeader } from '@material-ui/core';
import moment from 'moment';
import StarsIcon from '@material-ui/icons/Stars';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AOS from "aos";
let delayed;

ChartJS.register(ArcElement, Tooltip, Legend);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const timeline = {
  votestart: 1698814800,
  voteend: 1701957600,
  votebeforeclose: 604800,
  votepriannonce:1698926400,
  voteannounce : 1702108800,
  votethank:1702141200
}


const piedata = {
  labels: ['BNK48 Team BIII', 'BNK48 Team NV', 'BNK48 Team Trainee', 'CGM48 Team C', 'CGM48 Team Trainee'],
  datasets: [
    {
      label: '# members',
      data: [12, 14, 11, 16, 11],
      backgroundColor: [
        '#0a6302',
        '#ff85d4',
        '#cb96c2',
        '#49C5A8',
        '#7af5d8'
      ],
      borderColor: [
        '#0a6302',
        '#ff85d4',
        '#cb96c2',
        '#49C5A8',
        '#7af5d8'
      ],
      borderWidth: 0,
    },
  ],
  }
  const piedata1 = {
    labels: ['BNK48 1st Generation', 'BNK48 2nd Generation', 'BNK48 3rd Generation', 'BNK48 4th Generation', 'CGM48 1st Generation', 'CGM48 2nd Generation'],
    datasets: [
      {
        label: '# members',
        data: [1, 9, 16, 11, 21, 6],
        backgroundColor: [
          '#f505a0',
          '#ff85d4',
          '#cb96c2',
          '#f5c9ed',
          '#49C5A8',
          '#7af5d8'
        ],
        borderColor: [
          '#0a6302',
          '#ff85d4',
          '#cb96c2',
          '#49C5A8',
        ],
        borderWidth: 0,
      },
    ],
    }




const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  rank: {
    width: theme.spacing(20),
  },
  img: {
    width: theme.spacing(50),
  },
}));

const ulink = '4EGrHyXIvf0'
var r;

const Ge = ({fet, timesch, setSec, width}) => {
  const History = useHistory()
  const classes = useStyles();
  const [candiTog, setCandiTog] = React.useState(false); 


  const [rank, setRank] = React.useState([]); 
  const [ref, setRef] = React.useState(''); 
  const [candi, setCandi] = React.useState(false); 
  const [moni, setMoni] = React.useState(false); 
  
  const [candiUrl, setCandiUrl] = React.useState(''); 
  const [ts, setts] = React.useState('Updating'); 
  const [urlstream, setStream] = React.useState(''); 

  const [countdia, setCountdownDialog] = React.useState(true); 
  const [count, setCount] = React.useState(0); 

  const [resultH, setResultHeader] = React.useState(undefined); 

  const remainEvent = (unixStart) => {
    let start = moment(); // some random moment in time (in ms)
    let end = moment.unix(unixStart); // some random moment after start (in ms)
    let ms = end.diff(start)
    let date = moment.duration(ms)
    // execution
    let f = '';
    if (Math.floor(date.asDays()) == 0 && Math.floor(moment.utc(ms).format("H")) > 0 && Math.floor(moment.utc(ms).format("mm")) > 0) {
      f = 'the last ' + moment.utc(ms).format("HH") + ' Hour(s) ' + moment.utc(ms).format("mm") + ' Minute(s) reached!'
    } else if (Math.floor(date.asDays()) == 0 && Math.floor(moment.utc(ms).format("H")) == 0 && Math.floor(moment.utc(ms).format("mm")) > 0) {
      f= 'the final ' + moment.utc(ms).format("m") + ' Minute(s) reached'
    } else if (Math.floor(date.asDays()) == 0 && Math.floor(moment.utc(ms).format("H")) == 0 && Math.floor(moment.utc(ms).format("mm")) == 0) {
      f = 'Only last ' + moment.utc(ms).format("ss") + ' second(s)'
    } else {
      f = Math.floor(date.asDays()) + ' Day(s) ' + moment.utc(ms).format("H") + ' Hour(s) ' + moment.utc(ms).format("mm") + ' Minute(s) '
    }
    return f
}

  const ResultFetch = () => {
    if (moment().unix() >= 1702098000 && moment().unix() <= 1702130400) {
      setts('LIVE Report')
    } else {
      setts('Updating')
    }
    fetch(fet + (moment().unix() >= 1701396000 ? "/bnk48/ge4ResultFinal" : '/bnk48/ge4Result'), {
      method :'get'
  })
      .then(response => response.json())
      .then(data => {
          setRank(data.res)
          setRef(data.ref)
          setResultHeader(data.semi)
          if (moment().unix() >= 1702098000 && moment().unix() <= 1702130400) {
            setts('LIVE Report')
          } else {
            setts(moment().format("DD MMMM YYYY HH:mm:ss"))
          }
      }).catch(() => {
        setRank([])
        setts(moment().format("DD MMMM YYYY HH:mm:ss") + ' (Error fetching)')
      })
  }

  function numberWithCommas(x) {
    const options = { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    };
    return Number(x).toLocaleString('en', options);
}

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
    setSec('BNK48 16th Single Senbatsu General Election')
    ResultFetch()

    let max = Math.floor((timeline.voteend - moment().unix()) / (timeline.voteend- (timeline.voteend - timeline.votebeforeclose)) * 100)
    if (max >= 100) {
      max = 100;
    }
    let m = -5;
    r = setInterval(() => {
      if (sessionStorage.getItem('ads') != null) {
        if (m == max) {
          clearInterval(r)
        } else {
          m += 1
        }
        if (m > 0) {
          setCount(m)
        }
      }
    }, 50);
    
    setInterval(function () {
      if (moment().unix() >= 1702098000 && moment().unix() <= 1702130400) {
        ResultFetch();
      }
    }, 30000);
  }, [])

  const getremain = () => {
    return moment.unix(timeline.voteend).local().format('DD MMMM YYYY HH:mm')
  }

  const ToggleDialog = (sw, uri) => {
    setCandiUrl('https://pbs.twimg.com/media/F6TKZQ1akAA6_a1?format=jpg&name=large')
    setCandi(!candi)
  }

  const opt ={
    onClick: function(e, element) {
      if(element.length > 0) {
        ToggleDialog(true, '')
    }  
  },
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  }
  }

  const CheckTZ = (meth) => {
    let dcn = 2;
    const cur = moment().unix();
    // const cur = 1649501999;
    switch(meth) {
      case 1:
        if(cur > timeline.voteend) {
          dcn = 0
        } else if(cur >= timeline.votestart && cur <= timeline.voteend) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 2:
        if(cur > timeline.voteannounce + 21600) {
          dcn = 0
        } else if(cur >= timeline.voteannounce && cur <= timeline.voteannounce + 21600) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 3:
        if(cur > timeline.votethank + 2629743) {
          dcn = 0
        } else if(cur >= timeline.votethank && cur <= timeline.votethank + 2629743) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 4:
        if(cur > timeline.votepriannonce + 10800) {
          dcn = 0
        } else if(cur >= timeline.votepriannonce && cur <= timeline.votepriannonce + 10800) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      default:
      break;
    }
    return dcn
  }

  const ranklist = [
    {
      id: 'all',
      rank: [0, 47],
      label: 'All'
    },
    {
      id: 'sen',
      rank: [0, 15],
      label: 'Senbutsu (Believers)'
    },
    {
      id: 'under',
      rank: [16, 31],
      label: 'Under Girl (Make Noise)'
    },
    {
      id: 'next',
      rank: [32, 47],
      label: 'Next Girl (Kinou Yori Motto Suki)'
    }
  ]

    return ( 
        <>
           {width > 1200 && (
              <div class="video-background">
              {localStorage.getItem('lowgraphic') == null ? (
                <div class="video-foreground">
                <iframe src="https://www.youtube.com/embed/P_yipHuxlps?autoplay=1&mute=1&controls=0&loop=1&playlist=P_yipHuxlps" frameborder="0"></iframe>
              </div>
              ) : (
                <Fade in={true} timeout={800}>
                <img src="https://pbs.twimg.com/media/GA4qOzpagAAY8f8?format=jpg&name=large"  width={width} />
                  </Fade>
              )}
          </div>
            )}
                {width >1200 ? (
                <div className="cover mt-4">
                <Grow in={true} timeout={1000}>
              <Card className="col-md-4 m-5">
              <CardContent>
                <Typography variant="h5" component="h2">
                What is GE4?
                </Typography>
                <hr />
                <Typography color="textSecondary">
                GE4 or BNK48 16th Single General Election is the forth of BNK48 general election. It is the first general election with collabination to the one of the largest korean music industries "JYP Publishing".
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  Common Feature
                  <ListItem>
                    <ListItemText primary="1. See timeline of this election in realtime." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. See election result announcement. Followed from live streaming platform anywhere. (For any users who want to save your internet usage)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. 16 members who are the winner of this general election will be a chance to work on the BNK48 16th single 'Kiss Me' with producer team of JYP Publishing and and filming a music video in Korea." />
                  </ListItem>
                </Typography>
              </CardContent>
                </Card>
                </Grow>
              </div>
              ) : (
            <div className="bnktheme pb-5 pt-2">
        <Grow in={true} timeout={1000}>
      <Card className="ml-2 mr-2">
      <CardContent>
      <Typography variant="h5" component="h2">
                What is GE4?
                </Typography>
                <hr />
                <Typography color="textSecondary">
                GE4 or BNK48 16th Single General Election is the forth of BNK48 general election. It is the first general election with collabination to the one of the largest korean music industries "JYP Publishing".
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  Common Feature
                  <ListItem>
                    <ListItemText primary="1. See timeline of this election in realtime." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. See election result announcement. Followed from live streaming platform anywhere. (For any users who want to save your internet usage)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. 16 members who are the winner of this general election will be a chance to work on the BNK48 16th single 'Kiss Me' with producer team of JYP Publishing." />
                  </ListItem>
                </Typography>
              </CardContent>
        </Card>
        </Grow>
      </div>
          )}


        <div className={'stage ' + (width > 700 ? 'p-5' : 'p-2')}>
          <div className='row mt-5 ml-1 mr-1'>
          {/* <Card className={(width > 700 ? '' : 'mb-5') + ' col-md-12'} data-aos='zoom-in-right'>
            <CardContent>
              <CardHeader title="TimeLine of Election" subheader="Notes: Timeline are subject to change as appropriate." />
              <hr />
              <div className='row justify-content-center mb-5'> 
              <List className='col-md-8'>
                <ListItem>
                  <ListItemText className={CheckTZ(1) == 0 ? 'text-muted' : CheckTZ(1) == 1 ? 'text-success' : ''} primary="Vote open" secondary="Nov 1, 2023 - Dec 7, 2023" />
                  {
                    CheckTZ(1) == 0 && (
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                   {
                    CheckTZ(1) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton edge="end">
                      <FiberManualRecordIcon className='text-success' />
                    </IconButton>
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem>
                  <ListItemText className={CheckTZ(4) == 0 ? 'text-muted' : CheckTZ(2) == 1 ? 'text-success' : ''} primary="Preliminary result announcement" secondary="Nov 2, 2023 19:00 PM (UTC +07:00)" />
                  {
                    CheckTZ(4) == 0 && (
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                   {
                    CheckTZ(4) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton edge="end">
                      <FiberManualRecordIcon className='text-success' />
                    </IconButton>
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem>
                  <ListItemText className={CheckTZ(2) == 0 ? 'text-muted' : CheckTZ(2) == 1 ? 'text-success' : ''} primary="Final Election result announcement" secondary="Dec 9, 2023" />
                  {
                    CheckTZ(2) == 0 && (
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                   {
                    CheckTZ(2) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton edge="end">
                      <FiberManualRecordIcon className='text-success' />
                    </IconButton>
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <ListItem>
                  <ListItemText className={CheckTZ(3) == 0 ? 'text-muted' : CheckTZ(3) == 1 ? 'text-success' : ''} primary="Thank you Event" secondary="Dec 10, 2023" />
                  {
                    CheckTZ(3) == 0 && (
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={true}
                          tabIndex={-1}
                          disabled={true}
                        />
                  </ListItemSecondaryAction>
                    )
                  }
                   {
                    CheckTZ(3) == 1 && (
                      <ListItemSecondaryAction>
                         <IconButton edge="end">
                      <FiberManualRecordIcon className='text-success' />
                    </IconButton>
                  </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
              </List>
              </div>
            </CardContent>
          </Card> */}
           <Card className={(width > 700 ? '' : 'mb-5') + ' col-md-12'} data-aos='zoom-in-right'>
      <CardContent>
      <Typography variant="h5" component="h2">
                Highlight of BNK48 16th Single "Kiss Me!"
                </Typography>
                <hr />
                <Typography color="textSecondary">
                 5 Things you should know about the 16th Single of BNK48 which prduce with JYP Publishing
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  <ListItem>
                    <ListItemText primary="1. Song melody and music were produced by Lee Hae Sol." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. Music Video production and song arrangement were produced by JYP Publishing team." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. Thai lyric arrangement has produced by Tunwa Ketsuwan (Hye). He is the leader of T-POP band 'Paper Planes'. One of the success song are 'Bad Boy' in 168 million views reached on Youtube. He is also the person behind the work of many Thai artists." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="4. The last single of three of BNK48 2nd Generation by 'Minmin Rachaya', 'Wee Weeraya' and 'Stang Tarisa' before graduation was announced." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="5. The theme of the song is K-POP combined with J-POP perfectly." />
                  </ListItem>
                </Typography>
              </CardContent>
        </Card>

          <Card className={'mr-1 col-md mt-5'} data-aos={width > 650 ? 'zoom-in-left' : 'zoom-in-top'}>
            <CardContent>
            <CardHeader title="How to Vote" subheader='This general election, it has something changed from past election. please read below carefully' />
              <hr />
              <div className='row justify-content-center'>
              <ListItem>
                    <ListItemText primary='1. This general election must be used "GE4 Event-Based Token" for voting. Not "BNK Governance Token (BNK Token)"' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary='2. You have 2 ways to get GE4 Token. First choice, you can buy BNK48 15th Single "Kibouteki Refrain" CD (Earned 2 GE4 Tokens), Photobook (Earned 2 GE4 Tokens) or Music Code package (Earned 3 GE4 Tokens).' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary='3. Or second choice, you can use BNK Token for exchange to GE4 Token by get Music Code (Earned 2 GE4 Tokens), Music Code and Digital Asset [NFT - Limited Quantity] (Earned 3 GE4 Tokens) or Music Code and Original Art Toys [Limited Quantity] (Earned 16 GE4 Tokens)' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="4. You can vote members for this election at least 0.01 GE4 Event-Based Token. Unlimited maximum token voted per time." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="5. GE4 Event-Based Tokens will be expired on midnight of December 11, 2023 (UTC +07:00). And you cannot used with another upcoming BNK48 and CGM48 events." />
                  </ListItem>
              </div>
            </CardContent>
          </Card>
          
          <Card className={' col-md mt-5'} data-aos={width > 650 ? 'zoom-in-left' : 'zoom-in-top'}>
            <CardContent>
            <CardHeader title="The General Election Final Announcement Master of Ceremonies (MC)" subheader='Meet Phuak Pongsatorn and Opal Panisara.' />
              <hr />
              <div className='row justify-content-center'>
                <img src="https://pbs.twimg.com/media/GApFY9ha8AA6h-v?format=jpg&name=large" width="100%" />
              </div>
            </CardContent>
          </Card>

          <Card className={(width > 700 ? 'ml-1' : '') + ' col-md mt-5'} data-aos={width > 650 ? 'zoom-in-left' : 'zoom-in-top'}>
            <CardContent>
            <CardHeader title="General Election Candidate Summary" subheader='We have 64 BNK48 and CGM48 members who candidated' />
              <hr />
              <div className='row justify-content-center'>
                <div className='col-md-8'>
                  <div className='col-md-12 text-center'>
                  <FormControlLabel
                        control={
                          <Checkbox
                            checked={candiTog}
                            onChange={() => setCandiTog(!candiTog)}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Filter by Generation"
                      />
                    </div>
                    {candiTog ? (
                      <div className='col-md-12'>
                      <Doughnut
                        data={piedata1}
                        options={opt}
                      />
                    </div>
                    ) : (
                      <div className='col-md-12'>
                      <Doughnut
                        data={piedata}
                        options={opt}
                      />
                    </div>
                    )}
                  </div>
              </div>
            </CardContent>
          </Card>
          </div>

          <Card className={' col-md-12 mt-5'} data-aos={width > 650 ? 'zoom-in-left' : 'zoom-in-top'}>
            <CardContent>
            <CardHeader title="General Election LIVE Announcement" subheader='General Election Announcement LIVE.' />
              <hr />
              <div className='row justify-content-center'>
                <iframe src={"https://www.youtube.com/embed/" + ulink + "?autoplay=0&mute=1&controls=0&loop=1&playlist=" + ulink} height="500px" width="100%" frameborder="0"></iframe>
              </div>
            </CardContent>
          </Card>
          
          <Card className='mt-5' data-aos='fade-down'>
            <CardContent>
            <CardHeader onClick={() => window.open('https://lookerstudio.google.com/s/vZzzJXP_NBA', '_target')} title={(resultH == true && moment().unix() < 1702076400 ? "Result of Election (Semi-Final Announcement)" : resultH == false || (resultH == true && moment().unix() >= 1702076400) ? "Result of Election (Final Announcement)" : "Result of Election (Preliminary Announcement)") + (window.innerWidth > 1000 ? ' - Click here to view full result from Blockchain Technology' : '')} subheader={ts.includes('LIVE') ? (<div className='form-inline'><div class="circleload redload"></div>&nbsp;&nbsp;{ts}</div>) : 'Latest update: ' + ts} data-aos='flip-down' />
              <hr />
              <TableContainer>
                <Table stickyHeader aria-label="simple table">
                <caption className='text-right'>Note: These general election result announcement may be inaccurate. Please check the official results at BNK48 Official</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rank}>Rank</TableCell>
                      <TableCell className={classes.img} align="center">Member Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Band</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Token</TableCell>
                      <TableCell align="right">1st Preliminary Result</TableCell>
                      <TableCell align="right">2nd Preliminary Result</TableCell>
                    </TableRow>
                  </TableHead>
                  {rank.length > 0 ? rank.map((item, i) => (
                     <TableBody key={item.id} className={(item.rank == 1 ? 'centerGE' : item.rank > 1 && item.rank <= 16 ? 'senGE' : item.rank > 16 && item.rank <= 32 ? 'nextGE' : '') + ' cur'}
                     data-toggle="tooltip" data-placement="bottom" title={(item.rank == 1 ? item.name + ' is both Center position and Senbatsu of BNK48 16th Single "Kiss Me" ' : item.rank > 1 && item.rank <= 16 ? item.name + ' is Senbatsu of BNK48 16th Single "Kiss Me"' : item.rank > 16 && item.rank <= 32 ? item.name + ' is participate in second song of BNK48 16th Single' : item.name +' is participate in The third song of BNK48 16th Single')}
                     onClick={() => item.ref.includes('bnk48') ? History.push('/member/' + item.name.toLowerCase()) : item.ref.includes('cgm48') ? window.open('//cp-cgm48.pages.dev/member/' + item.name.toLowerCase(), '_target') : ''}
                     data-aos='fade-right'
                  >
                        <TableCell component="th" className={classes.rank}>
                          {item.rank}
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src={item.img} className={classes.large + ' cir avatarlimit'} />
                          </TableCell>
                          <TableCell align="center">
                          {item.fullnameEn[0]}  {item.fullnameEn[1]} ({item.name})
                          </TableCell>
                          <TableCell align="center">
                          {item.ref.includes('bnk48') ? 'BNK48' : item.ref.includes('cgm48') ? 'CGM48' : ''}
                          </TableCell>
                          {
                            item.ref.includes('cgm48') ? (
                              <TableCell align="right">
                              {item.team == "" ? 'None' : item.team}
                              </TableCell>
                            ) : (
                              <TableCell align="right">
                              {item.team == "" ? 'None' : item.team[0]}
                              </TableCell>
                            )
                          }
                           <TableCell align="right">
                          {numberWithCommas(item.ge4token)}
                          </TableCell>
                        <TableCell align="right">
                        {item.diff}
                        </TableCell>
                        <TableCell align="right">
                          {item.diff2}
                          </TableCell>
                  </TableBody>
                  )): (
                    <TableBody>
                         <TableCell colSpan={8} align='center'>No record(s) found</TableCell>
                  </TableBody>
                  )}
                </Table>
              </TableContainer>
              <List>
                <ListItem>
                  <ListItemText primary="General Election Status" secondary="Explain about status description for 1st and 2nd Preliminary Result" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="1st Preliminary Result" secondary="The result of general election after open vote in 24 hours." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2nd Preliminary Result" secondary="The result of general election before close vote about week." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Number in positive" secondary="This means that candidated BNK48 or CGM48 member who is 2nd Preliminary or Final ranking has increased from previous record." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Number in negaive" secondary="This means that candidated BNK48 or CGM48 member who is 2nd Preliminary or Final ranking has decreased from previous record." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="No Diff" secondary="This means that candidated BNK48 or CGM48 member who is 2nd Preliminary or Final ranking has not changed from previous record." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Un-Ranked" secondary="This means that candidated BNK48 or CGM48 member who is one of ranked in 1st Preliminary Result and not in ranking in 2nd Preliminary Result." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Re-Ranked" secondary="This means that candidated BNK48 or CGM48 member who is not in ranking in 1st Preliminary Result. But one of ranked in 2nd Preliminary Result or Final Result." />
                </ListItem>
              </List>
            </CardContent>
          </Card>

            {/* <Card className={' col-md-12 mt-5'} data-aos={width > 650 ? 'zoom-in-left' : 'zoom-in-top'}>
            <CardContent>
            <CardHeader title="View Blockchain Transactions" subheader='Powered by TOKEN X.' />
              <hr />
              <div className='row justify-content-center'>
                <iframe src="https://scan.tokenx.finance/address/0xd5A00451385193d89aC4f16c52BA573a4118449d/token-transfers" title="ge4trans" width="100%" height="600px"/>
              </div>
            </CardContent>
          </Card> */}
          
          <Dialog
              fullScreen
              TransitionComponent={Transition}
              open={candi}
              onClose={() => ToggleDialog(false, '')}
              fullWidth={true}
              maxWidth='sm'
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">General Election Candidated members List</DialogTitle>
              <DialogContent className='text-center'>
                <img src={candiUrl} width={800}/>
              </DialogContent>
              <DialogActions>
             
              <Button onClick={() => ToggleDialog(false, '')} className="text-dark">
                  Close
              </Button>
              </DialogActions>
          </Dialog>
          <Dialog
              fullScreen
              TransitionComponent={Transition}
              open={moni}
              onClose={() => setMoni(false)}
              fullWidth={true}
              maxWidth='xl'
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogContent>
              <Card className='mt-3' data-aos='fade-down'>
            <CardContent>
            <CardHeader onClick={() => window.innerWidth > 1000 ? setMoni(true) : null} title={(resultH == true && moment().unix() < 1702098000 ? "Result of Election (Semi-Final Announcement)" : resultH == false || (resultH == true && moment().unix() >= 1702098000) ? "Result of Election (Final Announcement)" : "Result of Election (Preliminary Announcement)") + (window.innerWidth > 1000 ? '' : '')} subheader={ts.includes('LIVE') ? (<div className='form-inline'><div class="circleload redload"></div>&nbsp;&nbsp;{ts}</div>) : 'Latest update: ' + ts} data-aos='flip-down' />
              <hr />
              <TableContainer>
                <Table stickyHeader aria-label="simple table">
                <caption className='text-right'>Note: These general election result announcement may be inaccurate. Please check the official results at BNK48 Official</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rank}>Rank</TableCell>
                      <TableCell className={classes.img} align="center">Member Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Band</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Token</TableCell>
                      <TableCell align="right">1st Preliminary Result</TableCell>
                      <TableCell align="right">2nd Preliminary Result</TableCell>
                    </TableRow>
                  </TableHead>
                  {rank.length > 0 ? rank.map((item, i) => (
                     <TableBody key={item.id} className={(item.rank == 1 ? 'centerGE' : item.rank > 1 && item.rank <= 16 ? 'senGE' : item.rank > 16 && item.rank <= 32 ? 'nextGE' : '') + ' cur'}
                     data-toggle="tooltip" data-placement="bottom" title={(item.rank == 1 ? item.name + ' is both Center position and Senbatsu of BNK48 16th Single "Kiss Me"' : item.rank > 1 && item.rank <= 16 ? item.name + ' is Senbatsu of BNK48 16th Single "Kiss Me"' : item.rank > 16 && item.rank <= 32 ? item.name + ' is participate in second song of BNK48 16th Single' : item.name +' is participate in The third song of BNK48 16th Single')}
                     onClick={() => item.ref.includes('bnk48') ? History.push('/member/' + item.name.toLowerCase()) : item.ref.includes('cgm48') ? window.open('//cp-cgm48.pages.dev/member/' + item.name.toLowerCase(), '_target') : ''}
                     data-aos='fade-right'
                  >
                        <TableCell component="th" className={classes.rank}>
                          {item.rank}
                        </TableCell>
                        <TableCell align="center" className={classes.img}>
                        <img src={item.img} className={classes.large + ' cir avatarlimit'} />
                          </TableCell>
                          <TableCell align="center">
                          {item.fullnameEn[0]}  {item.fullnameEn[1]} ({item.name})
                          </TableCell>
                          <TableCell align="center">
                          {item.ref.includes('bnk48') ? 'BNK48' : item.ref.includes('cgm48') ? 'CGM48' : ''}
                          </TableCell>
                          {
                            item.ref.includes('cgm48') ? (
                              <TableCell align="right">
                              {item.team == "" ? 'None' : item.team}
                              </TableCell>
                            ) : (
                              <TableCell align="right">
                              {item.team == "" ? 'None' : item.team[0]}
                              </TableCell>
                            )
                          }
                           <TableCell align="right">
                          {numberWithCommas(item.ge4token)}
                          </TableCell>
                          <TableCell align="right">
                        {item.diff}
                        </TableCell>
                        <TableCell align="right">
                          {item.diff2}
                          </TableCell>
                  </TableBody>
                  )): (
                    <TableBody>
                         <TableCell colSpan={8} align='center'>No record(s) found</TableCell>
                  </TableBody>
                  )}
                </Table>
              </TableContainer>
              <List>
                <ListItem>
                  <ListItemText primary="General Election Status" secondary="Explain about status description for 1st and 2nd Preliminary Result" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="1st Preliminary Result" secondary="The result of general election after open vote in 24 hours." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2nd Preliminary Result" secondary="The result of general election before close vote about week." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Number in positive" secondary="This means that candidated BNK48 or CGM48 member who is 2nd Preliminary or Final ranking has increased from previous record." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Number in negaive" secondary="This means that candidated BNK48 or CGM48 member who is 2nd Preliminary or Final ranking has decreased from previous record." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="No Diff" secondary="This means that candidated BNK48 or CGM48 member who is 2nd Preliminary or Final ranking has not changed from previous record." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Un-Ranked" secondary="This means that candidated BNK48 or CGM48 member who is one of ranked in 1st Preliminary Result and not in ranking in 2nd Preliminary Result." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Re-Ranked" secondary="This means that candidated BNK48 or CGM48 member who is not in ranking in 1st Preliminary Result. But one of ranked in 2nd Preliminary Result or Final Result." />
                </ListItem>
              </List>
            </CardContent>
          </Card>
              </DialogContent>
              <DialogActions>
             
              <Button onClick={() => setMoni(false)} className="text-dark">
                  Close
              </Button>
              </DialogActions>
          </Dialog>

          <Dialog
              fullScreen
              TransitionComponent={Transition}
              open={false}
              onClose={() => setCountdownDialog(false)}
              fullWidth={true}
              maxWidth='sm'
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">{(moment().unix() < timeline.voteend) ? 'Final Stretch is coming!' : ''}</DialogTitle>
              {
                (moment().unix() < timeline.voteend) ? (
                  <DialogContent className='text-center'>
                  <Box position="relative" display="inline-flex">
                      <CircularProgress variant="determinate" size={window.innerWidth > 750 ? 700 : window.innerWidth - 100} value={count} />
                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {
                            window.innerWidth > 750 ? (
                              <Typography variant="caption" component="p" color="textSecondary">
                                You have the opportunity to cast your vote for BNK48 and/or CGM48 in the next <br />
                                <b>{remainEvent(timeline.voteend)}</b><br/>
                                on IAM48 Application until {getremain()}. The opportunity for them to be Senbutsu of BNK48 16th Single is up to you.
                              </Typography>
                            ) : (
                              <Typography variant="caption" component="p" color="textSecondary">
                              <b>{remainEvent(timeline.voteend)}</b><br />remaining to vote
                            </Typography>
                            )
                          }
                       
                      </Box>
                    </Box>
                        {
                            window.innerWidth <= 750 ? (
                              <Typography variant="caption" component="p" color="textSecondary">
                                You have the opportunity to cast your vote for BNK48 and/or CGM48 to be Senbutsu of BNK48 16th Single in IAM48 Application until {getremain()}
                              </Typography>
                            ) : null
                          }
                  </DialogContent>
                ) : (
                  <DialogContent className='text-center'>
                  <Box position="relative" display="inline-flex">
                      <CircularProgress variant="determinate" size={window.innerWidth > 750 ? 700 : window.innerWidth - 100} value={100} />
                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                          <Typography variant="p" component="h6" color="textSecondary">
                              <b>BNK48 16th Single Senbutsu General Election vote is end.<br />Thank you for all support!</b>
                            </Typography>
                      </Box>
                    </Box>
                  </DialogContent>
                )
              }
             
              <DialogActions>
             
              <Button onClick={() => setCountdownDialog(false)} className="text-dark">
                  Close
              </Button>
              </DialogActions>
          </Dialog>
        </div>
        </>
    );
}
 
export default Ge;
