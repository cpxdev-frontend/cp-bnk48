import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, MenuItem, Button, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import vPack from './pack.json'
import AOS from "aos";
import { Share } from 'react-twitter-widgets'

const Graduated = ({fet, setSec}) => {

    React.useEffect(() => {
        setSec('Graduation Gallery')
      },[])
    

    const History = useHistory()

    const [Loaded, setLoaded] = React.useState(false);


    const [Arr, setArr] = React.useState([]);
    const [mem, setmem] = React.useState([]);
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/bnk48/memberListFullGraduation', {
            method :'get'
        })
            .then(response => response.json())
            .then(data => {
                setmem(data.response)
                setArr(data.response)
                setLoaded(true)
            }).catch(() => {
                setmem([])
                setArr([])
                setLoaded(true)
            })
    }, [])



    return ( 
        <>
        <h3 className='text-center mt-4'>Graduated Members</h3>
        <br />
        <div className="stage text-center pt-5 pb-2">
            
             <Zoom in={mem.length > 0 ? Loaded : false}>
             <Card className='mt-2 ml-5 mr-5'>
                     <CardContent>
                         Found {mem.length} matched BNK48 members
                     </CardContent>
                 </Card>
             </Zoom>
            
            {Loaded ? (
                <div className='row ml-3 mr-3 mt-5 justify-content-center'>
                {mem.length > 0 ? mem.map((item, i) => (
                      <div data-aos="zoom-in" className='col-md-3 mb-5'>
                        <Card>
                            <CardActionArea>
                            <CardMedia
                                    src={item.img}
                                    component="img"
                                    />
                                <CardContent className='text-center'>
                                    <h5>{item.name}</h5>
                                    <p>{item.fullnameEn[0]} {item.fullnameEn[1]}</p>
                                    <br />
                                    <Share 
                                        url={"https://bnk48fan.cpxdev.tk"}
                                        options={{ text: "(Enter your moment to " + item.name + " BNK48 here)", hashtags: item.name+"BNK48,fanspaceplatform,48groupthailand,bnk48", size:"large"}}
                                        id='blessinggrad'
                                    />
                                </CardContent>
                                </CardActionArea>
                                </Card> 
                            </div>
                   
                )) : (
                    <div className='text-center col-md-12'>
                        <h6>No BNK48 members to show. Please try different keyword</h6>
                    </div>
                )}
                </div>
            ) : (
                <Zoom in={Loaded ? false : true} timeout={{ enter: 200, exit: 200}}>
                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" className='text-center mt-3 mb-5' />
                </Zoom>
            )}
        </div>
        </>
     );
}
 
export default Graduated;
