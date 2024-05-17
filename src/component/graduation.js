import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import GenOne from './graduationTab/GenOne';
import GenTwo from './graduationTab/GenTwo';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const GraduationMain = ({fet, setSec, width}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return ( 
        <>
        <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="1st Generation" {...a11yProps(0)} />
          <Tab label="2nd Generation" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <GenOne fet={fet}
                  setSec={(v) => setSec(v)}
                  width={width} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <GenTwo fet={fet}
                  setSec={(v) => setSec(v)}
                  width={width} />
      </TabPanel>
        </>
     );
}
 
export default GraduationMain;