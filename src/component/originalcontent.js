import React from 'react';
import { Card, CardHeader, CardContent, CardMedia, Typography, Zoom, CardActions, IconButton, ButtonGroup } from '@material-ui/core';
import MusicCom from './originalcontentRe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faItunes, faDeezer, faYoutube, faTiktok, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'

const Music = ({gp, fet, setSec}) => {
    const [Loaded, setLoaded] = React.useState(false);
    const [Arr, setArr] = React.useState([]);

    React.useEffect(() => {
        setSec('BNK48 Original Content')
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(encodeURI(fet + '/bnk48/getbnkoriginalcontent'), {
            method: 'post', // or 'PUT'
            })
            .then(response => response.json())
            .then(data => {
                setLoaded(true)
                setArr(data.items)
            })
            .catch((error) => {
                setLoaded(true)
            console.error('Error:', error);
            });
    }, [])

        return (
            <>
            <h3 className='text-center mt-5'>BNK48 Original Content</h3>
            <p className='text-center'>All original content from BNK48 members in everyweek. Powered by Youtube</p>
            {Loaded ? (
                 <div className="stage pt-5 pl-3 pr-3">
                 <br />
                 <div className='row justify-content-center'>
                 {Arr.length > 0 ? Arr.map((item,i) => (
                       <MusicCom item={item} i={i} gp={gp} />
                 )) : (
                     <div className='text-center col-md-12'>
                         Content is not found.
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
        )
    }
 
export default Music;