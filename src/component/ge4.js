import React from 'react';
import { AppBar, MenuItem,Typography, IconButton, FormControlLabel, DialogTitle, DialogContent, ListItem, DialogActions, Dialog, ListItemText,
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

const piedata = {
  labels: ['BNK48 Team BIII', 'BNK48 Team NV', 'BNK48 Team Trainee', 'CGM48'],
  datasets: [
    {
      label: '# members',
      data: [8, 13, 21, 20],
      backgroundColor: [
        '#0a6302',
        '#ff85d4',
        '#cb96c2',
        '#49C5A8',
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
  const piedata1 = {
    labels: ['BNK48 1st Generation', 'BNK48 2nd Generation', 'BNK48 3rd Generation', 'CGM48'],
    datasets: [
      {
        label: '# members',
        data: [11, 13, 18, 20],
        backgroundColor: [
          '#0a6302',
          '#ff85d4',
          '#cb96c2',
          '#49C5A8',
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

const Ge = ({fet, timesch, setSec, width}) => {
  const History = useHistory()
  const classes = useStyles();


  const [rank, setRank] = React.useState([]); 
  const [ref, setRef] = React.useState(''); 
  const [candi, setCandi] = React.useState(false); 
  
  const [candiUrl, setCandiUrl] = React.useState(''); 
  const [ts, setts] = React.useState('Updating'); 
  const [urlstream, setStream] = React.useState(''); 

  const ResultFetch = () => {
    setts('Updating')
    fetch(fet + '/bnk48/ge4analysisResult', {
      method :'get'
  })
      .then(response => response.json())
      .then(data => {
          setRank(data.res)
          setRef(data.ref)
          setts(moment().format("DD MMMM YYYY HH:mm:ss"))
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
    // setInterval(function () {
    //   if (moment().unix() >= timesch.announ - 3600 && moment().unix() <= timesch.announ + 86400) {
    //     ResultFetch()
    //     setSpam(0)
    //   }
    // }, 60000);
  }, [])

  // const Refresh = () => {
  //   if (spam == 3) {
  //     alert("You have temporary blocked because you get refresh too many times for system performance reason. Please wait a minute to continue.")
  //   } else {
  //     let i = spam + 1
  //     setSpam(i)
  //     ResultFetch()
  //   }
  // }

  const ToggleDialog = (sw, uri) => {
    if(uri != '') {
      setCandiUrl(uri)
    }
    setCandi(sw)
  }

  const opt ={
    onClick: function(e, element) {
      if(element.length > 0) {
        ToggleDialog(true, 'https://pbs.twimg.com/media/F6TKZQ1akAA6_a1?format=jpg&name=large')
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
        if(cur > timesch.regis.close) {
          dcn = 0
        } else if(cur >= timesch.regis.open && cur <= timesch.regis.close) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 2:
        if(cur > timesch.vote.close) {
          dcn = 0
        } else if(cur >= timesch.vote.open && cur <= timesch.vote.close) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 3:
        if(cur > timesch.announ) {
          dcn = 0
        } else if(cur >= timesch.vote.close && cur <= timesch.announ) {
          dcn = 1
        } else {
          dcn = 2
        }
        break;
      case 4:
        if(cur > timesch.announ + 86400) {
          dcn = 0
        } else if(cur >= timesch.announ && cur <= timesch.announ + 86400) {
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
                <img src="https://pbs.twimg.com/media/F6PN4xsbUAAANhH?format=jpg&name=large"  width={width} />
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
                    <ListItemText primary="3. 16 members who are the winner of this general election will be a chance to work on the BNK48 16th single with producer team of JYP Publishing and and filming a music video in Korea." />
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
                    <ListItemText primary="3. 16 members who are the winner of this general election will be a chance to work on the BNK48 16th single with producer team of JYP Publishing and and filming a music video in Korea." />
                  </ListItem>
                </Typography>
              </CardContent>
        </Card>
        </Grow>
      </div>
          )}


        <div className={'stage ' + (width > 700 ? 'p-5' : 'p-2')}>
          <div className='row mt-5 ml-1 mr-1'>
          <Card className={(width > 700 ? '' : 'mb-5') + ' col-md-12'} data-aos='zoom-in-right'>
            <CardContent>
              <CardHeader title="TimeLine of Election" subheader="Notes: Timeline are subject to change as appropriate due to the situation of the epidemic of Covid-19." />
              <hr />
              {/* <div className='row justify-content-center mb-5'> 
              <List className='col-md-8'>
                <ListItem>
                  <ListItemText className={CheckTZ(1) == 0 ? 'text-muted' : CheckTZ(1) == 1 ? 'text-success' : ''} primary="Members Registration for Election" secondary="Jan 11-24, 2022" />
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
                  <ListItemText className={CheckTZ(2) == 0 ? 'text-muted' : CheckTZ(2) == 1 ? 'text-success' : ''} primary="Open Vote" secondary="Mar 10, 2022" />
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
                  <ListItemText className={CheckTZ(3) == 0 ? 'text-muted' : CheckTZ(3) == 1 ? 'text-success' : ''} primary="Close Vote" secondary="Apr 7, 2022" />
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
                <ListItem>
                  <ListItemText className={CheckTZ(4) == 0 ? 'text-muted' : CheckTZ(4) == 1 ? 'text-success' : ''} primary="Announcement Result" secondary="Apr 9, 2022" />
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
              </List>
              </div> */}
              <div className='row justify-content-center mb-5 text-center'>
                Timeline will be soon officially.
              </div>
            </CardContent>
          </Card>
          </div>
          
          
          <Card className='mt-5' data-aos='fade-down'>
            <CardContent>
              <CardHeader title="Result of Election (Just Forecasting. Powered by Google Bard AI)" subheader={'Latest update: ' + ts} data-aos='flip-down' />
              <hr />
              <TableContainer>
                <Table stickyHeader aria-label="simple table">
                <caption className='text-right'>Note: This is only a prediction made by the artificial intelligence system. Based on the results of past General elections and the popularity of each member. The results may be inaccurate. See full result <a href={ref} target='_blank'>here</a></caption>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rank}>Rank</TableCell>
                      <TableCell className={classes.img} align="center">Member Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Band</TableCell>
                      <TableCell align="right">Team</TableCell>
                    </TableRow>
                  </TableHead>
                  {rank.length > 0 ? rank.map((item, i) => (
                    <TableBody key={item.id}
                      onClick={() => item.ref.includes('bnk48') ? History.push('/member/' + item.memid.toLowerCase()) : item.ref.includes('cgm48') ? window.open('//cp-cgm48.pages.dev/member/' + item.memid.toLowerCase(), '_target') : ''}
                      data-aos='fade-right'
                   >
                        <TableCell component="th" className={classes.rank}>
                          {i + 1}
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
                  </TableBody>
                  )): (
                    <TableBody>
                       <TableCell colSpan={6} align='center'>No record(s) found</TableCell>
                  </TableBody>
                  )}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
          
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
        </div>
        </>
    );
}
 
export default Ge;
