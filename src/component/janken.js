import React from 'react';
import { Typography, ListItem, Zoom, IconButton,
    Card, CardHeader, CardContent, ListItemText, Grow, Fade,ListItemSecondaryAction, List, Checkbox, CardActionArea, Button } from '@material-ui/core';
    import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from "aos";
import moment from 'moment';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  "p_lfwmnj6m4c",
  "p_8ckw9f9n4c"
]

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  rank: {
    width: theme.spacing(20),
  },
  img: {
    width: theme.spacing(30),
  },
}));

const Janken = ({fet, setSec, width}) => {
  const classes = useStyles();
  const History = useHistory()
  
  const [rank, setRank] = React.useState([]); 
  const [ts, setts] = React.useState('Updating'); 
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
      setts('Updating')
      fetch(fet + '/bnk48/jankenlist2023', {
        method :'post'
    })
        .then(response => response.json())
        .then(data => {
            setRank(data.response)
            setts(moment().format("DD MMMM YYYY HH:mm:ss"))
        }).catch(() => {
          setRank([])
          setts(moment().format("DD MMMM YYYY HH:mm:ss") + ' (Error fetching)')
        })



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
           <img src="https://pbs.twimg.com/media/FtP1unWaUAAu6zC?format=jpg&name=large" width={width} />
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
                  <CardHeader title='The Senbatsu of Destiny is back!' subheader='ศึกแห่งโชคชะตาได้กลับมาอีกครั้ง' />
                </Typography>
                    <Typography color="textSecondary">
                    <CardHeader title='Destiny is hard to predict and cannot be avoided. All candidated BNK48 and CGM48 will be bet on ordinary games that everyone plays. But can decide the fate of Senbatsu at any time.'
                    subheader='โชคชะตาที่ยากจะคาดเดาได้มาถึงแล้ว เมื่อสมาชิก BNK48 และ CGM48 จะนำเกมที่หลายคนคุ้นเคย สู่การชี้ชะตาการเป็นเซมบัตสึในครั้งนี้' /> 
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
                  <CardHeader title='The Senbatsu of Destiny is back!' subheader='ศึกแห่งโชคชะตาได้กลับมาอีกครั้ง' />
                </Typography>
                    <Typography color="textSecondary">
                    <CardHeader title='Destiny is hard to predict and cannot be avoided. All candidated BNK48 and CGM48 will be bet on ordinary games that everyone plays. But can decide the fate of Senbatsu at any time.'
                    subheader='โชคชะตาที่ยากจะคาดเดาได้มาถึงแล้ว เมื่อสมาชิก BNK48 และ CGM48 จะนำเกมที่หลายคนคุ้นเคย สู่การชี้ชะตาการเป็นเซมบัตสึในครั้งนี้' /> 
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
                    <Typography variant='h5'><CardHeader title='The Senbutsu battle with Destiny of Rock-Paper-Scissors!' subheader='การชี้ชะตาด้วยเกมเป่ายิ้งฉุบในตำนาน' /></Typography>
                    <Typography variant='body1'><CardHeader title='It is a simple rule, but everything is possible throughout tournament.' subheader='เกมที่หลายคนคุ้นเคย แต่ต้องอย่าลืมว่า ทุกอย่างก็อาจเกิดขึ้นทุกเมื่อในตลอดการแข่งขันเช่นกัน' /></Typography>
                </div>
            </CardContent>
        </Card>
        <Card className='mt-4' data-aos="zoom-in-down">
            <CardContent className='row'>
                <div className='col-md'>
                    <Typography variant='h5'><CardHeader title='Excitement with every breath' subheader='ตื่นเต้นในทุกลมหายใจ' /></Typography>
                    <Typography variant='body1'><CardHeader title='The their target are Sixteen-Senbatsu and The one of winner of this tournament is Center Position of BNK48 4th Album. It is a tournament that can win results every second of the competition. (Even the Host or Judge himself)' subheader='เป้าหมายของพวกเธอคือตำแหน่งหนึ่งใน 16 เซมบัตสึและ Janken Queen หรือตำแหน่งเซ็นเตอร์ของอัลบั้มที่สี่ของ BNK48 นี่จึงเป็นการแข่งขันที่คุณสามารถลุ้นผลได้ทุกวินาที แม้กระทั่งพิธีกรหรือกรรมการก็ตาม' /></Typography>
                </div>
            </CardContent>
        </Card>
        <Card className='mt-4' data-aos="zoom-in-right">
            <CardContent className='row'>
                <div className='col-md'>
                    <Typography variant='h5'><CardHeader title="The mini-contest with special costume of member's designing" subheader='เพิ่มสีสันให้กับงานด้วยการประกวดชุดแต่งกายสำหรับการแข่งขันที่ออกแบบโดยตัวเมมเบอร์เอง' /></Typography>
                    <Typography variant='body1'><CardHeader title='All costume of candidated members are designed and weared by herself. Do you think that who is the winner of the best costume in this tournament?' subheader='เมื่อชุดสำหรับแข่งขันที่ออกแบบโดยเมมเบอร์แต่ละคนเอง คุณคิดว่าใครจะได้รางวัลชุดดีเด่นประจำงานในครั้งนี้ อาจจะเป็นเมมเบอร์ที่คุณติดตามอยู่หรือไม่?' /></Typography>
                </div>
            </CardContent>
        </Card>
        <Card className='mt-4' data-aos="flip-right">
            <CardContent className='row'>
                <div className={'col-md ' + (width > 800 ? 'mt-5': '')} data-aos="slide-right">
                    <Typography variant='h5'><CardHeader title="Tournament Moderator and Judge" subheader='พบกับพิธีกรและกรรมการที่มากความสามารถ และพร้อมมอบความสนุกตลอดทั้งทัวนาเม้นท์นี้' /></Typography>
                    <Typography variant='body1'><CardHeader title="Kan Kantathavorn" subheader='กันต์ กันตถาวร' /></Typography>
                    <Typography className='pl-3' variant='subtitle2'>Achievement: TV Host (Mask Singer 12, I Can See Your Voices Thailand, The Wall Duet), DJ and Actor</Typography>
                </div>
                <div className='col-md-4' data-aos="slide-left">
                    <img src='https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/bnk48/kan.png' width='100%' />
                </div>
            </CardContent>
        </Card>

        <Card className='mt-5' data-aos='fade-down'>
            <CardContent>
              <CardHeader title="Result of Janken Tournament" subheader={'Latest update: ' + ts} data-aos='flip-down' />
              <hr />
              <TableContainer>
                <Table stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.rank}>Rank</TableCell>
                      <TableCell className={classes.img} align="center">Member Image</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Band</TableCell>
                      <TableCell align="right">Team</TableCell>
                      <TableCell align="right">Generation</TableCell>
                      <TableCell align="right">Win Scores</TableCell>
                    </TableRow>
                  </TableHead>
                  {rank.length > 0 ? rank.map((item, i) => (
                    <TableBody key={item.id} className={(item.jankenRank == 1 ? 'centerGE' : '') + ' cur'}
                      data-toggle="tooltip" data-placement="bottom" title={(item.jankenRank == 1 ? item.name + ' is the Janken Queen (Winner of Janken Tournament 2023) and Center position and Senbatsu of BNK48 4th Album \"Gingham Check\"' : item.name + ' is Senbatsu of BNK48 4th Album \"Gingham Check\"')}
                      onClick={() => item.ref.includes('bnk48') ? History.push('/member/' + item.name.toLowerCase()) : item.ref.includes('cgm48') ? window.open('//cp-cgm48.pages.dev/member/' + item.name.toLowerCase(), '_target') : ''}
                      data-aos='fade-right'
                   >
                        <TableCell component="th" className={classes.rank}>
                          {item.jankenRank}
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
                          <TableCell align="right">
                          {item.team == "" ? 'None' : item.team}
                          </TableCell>
                          <TableCell align="right">
                          {item.gen == "" ? 'None' : item.gen}
                          </TableCell>
                          <TableCell align="right">
                          {item.jankenScore}
                          </TableCell>
                  </TableBody>
                  )): (
                    <TableBody>
                       <TableCell colSpan={8} align='center'>No record(s) found</TableCell>
                  </TableBody>
                  )}
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        
        <Card data-aos="zoom-in-down" className='mt-4'>
            <CardContent className='row'>
                <div className='col-md'>
                    <Typography variant='h5'>Tournament Chart</Typography>
                    <Typography variant='body1'>Good news, real-time results will be announced soon. along with during the tournament has been started. (Please note that don't have LIVE streaming of this tournament)</Typography>
                    {
                      width > 800 ?(
                        <iframe width="100%" onClick={() => LockChange()} height={"500"} src={result} allowfullscreen></iframe>
                      ) : (
                        <iframe width="100%" onClick={() => LockChange()} height={"800"} src={result} allowfullscreen></iframe>
                      )
                    }
                  <CardActionArea>
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
