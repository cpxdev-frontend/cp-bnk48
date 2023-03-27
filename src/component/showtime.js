import React from 'react'
import AOS from 'aos'
import moment from 'moment';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade, Tooltip } from '@material-ui/core';

const ShowTime = ({fet, setSec, width}) => {
    const [Loaded, setLoaded] = React.useState(false);
    const [Arr, setArr] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [para, setpara] = React.useState({});
    const [fetLLoad, setFet] = React.useState(false);

    React.useEffect(() => {
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

    const Stageconvert = (keyword) => {
        switch(keyword) {
            case 'B3':
              return 'BIII Second Stage "Saishuu Bell ga Naru"'
            case 'NV':
                return 'NV first Stage "Theater no Megami"'
            case 'Trainee':
                return 'Trainee Stage "Ganbare! Kenkyuusei"'
            default:
              return keyword
          }
    }


    return ( 
        <>
        <h3 className='text-center mt-5'>BNK48 Theater Showtime</h3>
        {/* <p className='text-center'>All upcoming BNK48 Theater Stage showtime at BNK48 Campus, 4th Floor at The Mall Bangkapi. See navigate to Theater from <a href="https://goo.gl/maps/CFvM1PSbY7smBPkh9" target="_blank">here</a></p> */}
        <p className='text-center'>All upcoming BNK48 Theater Stage showtime at BNK48 Campus (New BNK48 Campus will be announcement soon. Thank you for support all Theater Stage show. See at new place!)</p>
        {Loaded ? (
             <div className={"stage justify-content-center pt-5" + (width > 600 ? ' pl-5 pr-5' : ' pl-3 pr-3')}>
             <br />
             <div className='row'>
             {Arr.length > 0 ? Arr.map((item,i) => (
                 <div className={"col-md-6 col-sm-12 mb-5" + (width > 600 ? ' pl-5 pr-5' : '')} data-aos="zoom-in-down">
                 <Card>
                    <CardActionArea onClick={() => window.open("https://ticket.bnk48.com", "_blank")}>
                        <CardContent>
                            <CardMedia
                                src={item.img} component="img" width="100%"
                            />
                            <Typography variant="h6" className='mt-3'>
                                {item.title}
                                {moment.utc() < moment.utc(item.dooropen) ? (
                                    <Tooltip title="The show has already been scheduled. The schedule is subject to change as appropriate.">
                                        <span className='ml-2 badge badge-warning'>
                                            On scheduled
                                        </span>
                                    </Tooltip>
                                ) : moment.utc() >= moment.utc(item.dooropen) && moment.utc() < moment.utc(item.dateStart) ? (
                                    <Tooltip title="BNK48 Theater is ready to show this stage. Please collect your tickets before the show starts to reduce congestion in front of the BNK48 Campus.">
                                        <span className='ml-2 badge badge-info'>
                                            Door is opened
                                        </span>
                                    </Tooltip>
                                ) : moment.utc() >= moment.utc(item.dateStart) && moment.utc() < moment.utc(item.dateEnd) ? (
                                    <Tooltip title="BNK48 Theater is starting to show and door is closed. Those who arrive after the show has started may be forfeited the right to attend the show.">
                                        <span className='ml-2 badge badge-success'>
                                            Currently Showed
                                        </span>
                                    </Tooltip>
                                ): (
                                    <Tooltip title="This BNK48 Theater show is over. Thank you for your interesting. Please follow the next show times here.">
                                        <span className='ml-2 badge badge-danger'>
                                            The show is over
                                        </span>
                                    </Tooltip>
                                    )}
                            </Typography>
                    
                            <hr />
                            <Typography color="body1">
                            BNK48 Stage Team Name: {Stageconvert(item.team)}
                            </Typography>
                            <Typography color="textSecondary">
                            Scheduled Showtime: {moment.utc(item.dateStart).local().format('DD MMMM YYYY HH:mm:ss')} - {moment.utc(item.dateEnd).local().format('HH:mm:ss')} (Door open {moment.utc(item.dooropen).local().format('HH:mm:ss')})
                            </Typography>
                            <hr />
                            
                            <Typography color="subtitle" className='text-right'>
                            Click this card to reserved ticket
                            </Typography>
                    </CardContent>
                    </CardActionArea>
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
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
            </Zoom>
            </div>
        )}
        </>
    );
}
 
export default ShowTime;