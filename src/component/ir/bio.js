import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  }));
const IRBio = () => {
    const classes = useStyles();

    return ( 
        <div style={{
            position: 'absolute',
            left: '45%',
            top: '45%',
          }}>
          <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" />
        </div>

     );
}
 
export default IRBio;