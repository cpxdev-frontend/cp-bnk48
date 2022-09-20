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
            <CardHeader title='[Rerun] BNK48 and CGM48 Sport Day 2022 - งานกีฬาสีอนุบาลหนูน้อย 48' subheader='This video streaming may be unusable when you watch from outside of Thailand' />
            {{window.innerWidth > 800 ? (
                     <div className='container' data-aos="zoom-out-up">
                     <iframe src="https://s.cpxdev.tk/iam48sportday2022" width="100%" height='850px' allowFullScreen />
                     </div>
            ) : (
                <Button color='primary' variant='contained' onClick={() => window.open('https://s.cpxdev.tk/iam48sportday2022', '_blank')}>Watch it in AIS Play Application</Button>
            )}}
          
            </CardContent>
        </Card>
        </>
     );
}
 
export default Stream;
