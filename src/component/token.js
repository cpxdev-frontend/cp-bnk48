import React from 'react';
import { Typography, ListItem, Zoom, ListItemText,
    Card, CardActionArea, CardContent, CardMedia, Grow, Fade, CardHeader } from '@material-ui/core';
    import { useHistory } from 'react-router-dom';
    import AOS from "aos";

const HomeCom = ({fet, gp, setSec, width}) => {
    const History = useHistory()
    const [Loaded1, setLoaded1] = React.useState(false);
    const [Loaded2, setLoaded2] = React.useState(false);
    const [Loaded3, setLoaded3] = React.useState(false);
    const [onMonth, setMonth] = React.useState(false);
    const [birth, setBirth] = React.useState([]);
    const [samplemem, setMem] = React.useState([]);
    const [highMV, setMV] = React.useState([]);
    React.useEffect(() => {
      setSec('BNK Governance Token and Blockchain Technology')
      AOS.init({ duration: 1000 });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch(fet + '/bnk48/getmemberbybirth?tz=' + Intl.DateTimeFormat().resolvedOptions().timeZone, {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
    if (data.count == 0) {
        setMonth(true)
        fetch(fet + '/bnk48/getmemberbybirthmonth?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
    setBirth(data.response)
        setLoaded1(true)
  });
    } else {
        setBirth(data.response)
        setLoaded1(true)
    }
  });
 const ran = Math.floor(Math.random() * 3) + 1;
 fetch(fet + '/bnk48/getmemberby?filter=gen&param=' + ran + '&tstamp=' + Math.floor( new Date().getTime()  / 1000), {
            method :'post'
        })
  .then(response => response.json())
  .then(data => {
      setMem(data.response)
      setLoaded2(true)
  });

  fetch(encodeURI(fet + '/bnk48/getVideo?tstamp=' + Math.floor( new Date().getTime()  / 1000)), {
    method: 'post', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
        setLoaded3(true)
        setMV(data.items)
    console.log('Success:', data);
    })
    .catch((error) => {
        setLoaded3(true)
    console.error('Error:', error);
    });
    }, [])

    const ChangeRoute = (name) =>{
        History.push("/member/" + name.toLowerCase())
    }

    return ( 
        <>
        {width > 1100 && (
          <div class="video-background">
          {localStorage.getItem('lowgraphic') == null ? (
            <div class="video-foreground">
            <iframe src="https://www.youtube.com/embed/piqHKwEBacM?autoplay=1&mute=1&controls=0&loop=1&playlist=piqHKwEBacM" frameborder="0"></iframe>
          </div>
          ) : (
            <Fade in={true} timeout={800}>
                <img src="https://img.youtube.com/vi/w3t-o12L9Cc/maxresdefault.jpg" width={width} />
              </Fade>
          )}
      </div>
        )}
             {width >1200 ? (
            <div className="cover mt-4">
            <Grow in={true} timeout={1000}>
          <Card className="col-md-4 m-5">
              <CardContent>
                <Typography variant="h5" component="h2">
                  What is BNK Token?
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  Everything which you know about Blockchain Technology of BNK48 and BNK Token
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  Topic which you known
                  <ListItem>
                    <ListItemText primary="1. Why iAM use Blockchain Technology." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. Partner of Blockchain Technology" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. What is BNK Token" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="4. How to use Token and trading" />
                  </ListItem>
                </Typography>
              </CardContent>
            </Card>
            </Grow>
          </div>
          ) : (
        <div className="pb-5 pt-2">
    <Grow in={true} timeout={1000}>
  <Card className=" bnktheme ml-2 mr-2">
        <CardContent>
                <Typography variant="h5" component="h2">
                  What is BNK Token?
                </Typography>
                <hr />
                <Typography color="textSecondary">
                  Everything which you know about Blockchain Technology of BNK48 and BNK Token
                </Typography>
                <hr />
                <Typography variant="body1" component="p">
                  Topic which you known
                  <ListItem>
                    <ListItemText primary="1. Why iAM use Blockchain Technology." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. Partner of Blockchain Technology" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. What is BNK Token" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="4. How to use Token and trading" />
                  </ListItem>
                </Typography>
              </CardContent>
    </Card>
    </Grow>
  </div>
          )}
  
  <div className="stage pt-5 pb-2">
            <Card className='mt-3' data-aos="fade-down">
                <CardContent>
                    <CardHeader className='text-center' title='Why iAM use Blockchain Technology' />
                    <Typography>
                    Due to the situation of the epidemic of Covid-19. It's too hard to organized an offline events. (Handshake Event, Theater Stage, 2-Shot, Special Concert, Roadshow) Also Blockchain Technology is the popular technology to increase transparency and credibility.
                    An also participation in the Decentralized Good Governance type. As well as you have chance to pronounce your thinking or Election Voting.
                    </Typography>
                </CardContent>
            </Card>
            <Card className='mt-3' data-aos="fade-up">
                <CardContent>
                    <CardHeader className='text-center' title='Partner of Blockchain Technology' />
                    <Typography>
                    <ListItem>
                    <ListItemText primary="Token X Co.,Ltd" secondary="It's Blockchain Technology Solution company which behind BNK48 Blockchain technology. It's a part of SCB X PCL. (Also known as SCB or Siam Commercial Bank PCL. in former name)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Talent Connect Co.,Ltd" secondary="The joint venture company between iAM and Ookbee Co.,Ltd to provided official mobile app for BNK48 and CGM48 fans called 'iAM48 Application'. They also develop blockchain technology dashboard in app." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Baker McKenzie" secondary="The Global Financial Legal Adviser" />
                  </ListItem>
                    </Typography>
                </CardContent>
            </Card>
            <Card className='mt-3' data-aos="fade-down">
                <CardContent>
                    <CardHeader className='text-center' title='What is BNK Token' />
                    <Typography>
                        BNK Governance Token or BNK Token is digital crypto currency to use only for buying BNK48 good merchandise or service with token. As well as you have chance to pronounce your thinking or Election Voting. You maybe see common question below to more understanding about this.
                    <ListItem>
                    <ListItemText primary="Are BNK Tokens expired date?" secondary="No, you can keep your token until there is a change from holder company" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Can I Top-up Token?" secondary="You can earn BNK Token by purchase merchandise like CD or Photobook of Single or Album of BNK48 or CGM48. And also buy and redeem on IAM48 Shop in 68 THB per 1 Token in IAM48 Application." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="What's Rate Exchange of Token to Thai Baht?" secondary="There is no fixed exchange rate. It maybe depending on many components, such as Demand or supply for trading at a time." />
                  </ListItem>
                    </Typography>
                </CardContent>
            </Card>
            <Card className='mt-3' data-aos="fade-up">
                <CardContent>
                    <CardHeader className='text-center' title='How to use Token and trading' />
                    <Typography>
                        These are all you know about trading and using BNK Token which we can do.
                    <ListItem>
                    <ListItemText primary="1. Update app and apply wallet" secondary="You not need to download additional application to drain phone storage. Just update iAM48 Application. Then open app and you will see token tab on below of application. (Middle Tab) And reading Acceptment confirmation and create 6 digits pin to login BNK Token wallet" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. If you see verify email popup alert, don't be check your email inbox!" secondary="Some user may receive popup alert to verify email. We take personal and account information strictly. You need to verify email and re-login account again to done. If you have any issue. Please contact Talen Connect Teams in app." />
                  </ListItem>
                  <ListItem>
                  <ListItemText primary="3. Wallet Verification" secondary={(<p>Starting June 1, 2023, you are required to verify by e-KYC (Electronic Know Your Customer) to verify wallet ownership and enhance transaction security. See more description <a href='https://www.facebook.com/BNKToken/posts/pfbid0bRX1ubBdvoJLqeZo8UbotxSHZMFCpVSqyMC54LQ9KBvExC7Z7rGzgJrB49oMTZPbl' target='_blank'>here</a></p>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="4. See more using Token in BNK Token page" secondary={(<p>See more update for BNK Token <a href='https://www.scb.co.th/en/about-us/news/feb-2022/bnk-governance-token.html' target='_blank'>here</a></p>)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="5. What is BNK Auction Token" secondary="BNK Auction Token (Blue Token) is another token which use for auction special rare merchandise (Like Photo Canvas with BNK48 or CGM48 signature etc.)." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="6. How to earn BNK Auction Token" secondary="You need to top-up BNK Token at least 100 tokens before before the end of this month, earned amount of BNK Auction Token will be affected on next month. The amount of Auction Tokens depends on your Tier level (Silver or Gold). Please top-up BNK Token regularly to maintain your Tier rights and receive Auction Tokens continuously." />
                  </ListItem>
                    </Typography>
                </CardContent>
            </Card>
  </div>
        </>
    );
}
 
export default HomeCom;
