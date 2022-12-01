import React from 'react'
import AOS from 'aos'
import moment from 'moment';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade, CardHeader } from '@material-ui/core';

const ShowTime = () => {
    const [Loaded, setLoaded] = React.useState(false);
    const [Arr, setArr] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [para, setpara] = React.useState({});
    const [fetLLoad, setFet] = React.useState(false);

    React.useEffect(({fet, setSec}) => {
        AOS.init({ duration: 800 });
        setSec('BNK48 Theater Showtime')
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(encodeURI(fet + '/bnk48/stagelist'), {
            method: 'post', // or 'PUT'
            })
            .then(response => response.json())
            .then(data => {
                setLoaded(true)
                setArr(data)
            })
            .catch((error) => {
                setLoaded(true)
            console.error('Error:', error);
            });
    }, [])


    return ( 
        <>
        <h3 className='text-center mt-5'>BNK48 Theater Showtime</h3>
        <p className='text-center'>All upcoming BNK48 Theater Stage showtime at BNK48 Campus, 4th Floor at The Mall Bangkapi</p>
        {Loaded ? (
             <div className={"stage justify-content-center pt-5" + (window.innerWidth > 600 ? ' pl-5 pr-5' : ' pl-3 pr-3')}>
             <br />
             <div className='row'>
             {Arr.length > 0 ? Arr.map((item,i) => (
                 <div data-aos="fade-down-right" className={"col-md-12 mb-5" + (window.innerWidth > 600 ? ' pl-5 pr-5' : '')} data-aos="zoom-in-down">
                 <Card>
                <CardContent>
                    <Typography variant="h6">
                        {item.title}
                    </Typography>
               
                    <hr />
                    <Typography color="textSecondary">
                     Door Open: {moment.utc(item.dooropen).local().format('DD MMMM YYYY HH:mm:ss')}
                    </Typography>
                    </CardContent>
                 </Card>
                 </div>
             )) : (
                 <div className='text-center col-md-12'>
                     No upcoming BNK48 Theater showtime right now
                 </div>
             )}
             </div>
             </div>
        ) : (
            <div className='text-center'>
            <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
            <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
            </Zoom>
            </div>
        )}
        </>
    );
}
 
export default ShowTime;