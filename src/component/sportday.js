import React from 'react';
import { Card, CardContent, CardHeader, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AOS from "aos";

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Stream = ({fet, setSec}) => {
    const classes = useStyles();
    const [urlstream, setStream] = React.useState('');
    const [streaminfo, setInfo] = React.useState(null);
    const [Load, setLoad] = React.useState(true);
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        setSec('BNK48 and CGM48 Sport Day 2022 - งานกีฬาอนุบาลหนูน้อย 48')
    },[])
    return ( 
        <>
        <Card>
            <CardContent className='text-center align-center'>
            <CardHeader title='[LIVE] BNK48 and CGM48 Sport Day 2022 - งานกีฬาสีอนุบาลหนูน้อย 48' subheader='This Live Streaming may be unusable when you watch from outside of Thailand' />
            {window.innerWidth > 800 ? (
                     <div className='container' data-aos="zoom-out-up">
                     <iframe src="https://aisplay.ais.co.th/portal/exclusive/bnk48live/630c71fa27406aefa9b66198?screen=bnk48live" width="100%" height='850px' allowFullScreen />
                     </div>
            ) : (
                <Button color='primary' variant='contained' onClick={() => window.open('https://s.cpxdev.tk/iam48sportday2022', '_blank')}>Watch it in AIS Play Application</Button>
            )}
            </CardContent>
        </Card>
        </>
     );
}
 
export default Stream;