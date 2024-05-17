import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade } from '@material-ui/core';

const ErrCom = ({setSec, width}) => {
  React.useEffect(() => {
    setSec('Page not found')
  }, [])
    return ( 
      <>
      {width >1200 && (
        <div class="video-background">
         <Fade in={true} timeout={800}>
         <img src="https://www.bnk48.com/data/Slidebanners/54/img_resize/110714hnqsu7.jpg" width={window.innerWidth} />
            </Fade>
    </div>
      )}
           {width >1200 ? (
          <div className="cover mt-4">
          <Grow in={true} timeout={1000}>
        <Card className="col-md-4 m-5">
        <CardContent>
                <Typography variant="h5" component="h2">
                  Error 404 | Page not Found
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  Sorry, but this page is unavaliable right now
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
                  Error 404 | Page not Found
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  Sorry, but this page is unavaliable right now
                </Typography>
              </CardContent>
          </Card>
          </Grow>
        </div>
        )}
      </>
     );
}
 
export default ErrCom;