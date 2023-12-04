import React from 'react';
import { Button, TextField, MenuItem, Card, CardContent, FormControlLabel, Checkbox, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  const Streamchannel = [
    {
        label: 'BNK48 LIVE',
        value: '2',
    },
    {
        label: 'CGM48 LIVE',
        value: '3',
    }
  ]
  const streamplat = [
    {
        label: 'Youtube',
        value: 'youtube',
    },
    {
      label: 'Facebook',
      value: 'facebook',
  },
      {
      label: 'Another Platform',
      value: 'other',
  }
]

const GeMana = ({fet}) => {
    const classes = useStyles();
    const [ done, setDone ] = React.useState(false);
    const [ cgmon, setCg ] = React.useState(false);

    const [list, setList] = React.useState([]); 
    const [ Tar, setTar ] = React.useState('-');
    const [mem, setMem] = React.useState([]); 
    const [ MemTar, setMemTar ] = React.useState('-');
    const [ ChannelSet, setChannel ] = React.useState('');
    const [Score, setScore] = React.useState(''); 
    const [Str, setStr] = React.useState(''); 
    const [Plat, setPlat] = React.useState(''); 

    const [load, setLoad] = React.useState(false); 

    const [member, setMember] = React.useState([]); 
    const [ranklist, setRankList] = React.useState([]); 
    const [rank, setRank] = React.useState(0); 
    const [memwin, setMemwin] = React.useState(''); 
    const [ge4body, setBody] = React.useState(''); 
    const [tokenCount, setToken] = React.useState(''); 


    const LoadMem = (val) => {
        fetch(fet + '/bnk48/ge4ListDropdown', {
            method: 'GET', // or 'PUT'
          })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMember(data.res)
            })
            .catch((error) => {
              alert('Server cannot be respond. Access denied')
              window.location.href = "/"
            });



        setCg(val)
        let temp = []
        if (val == false) {
            fetch(fet + '/bnk48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
                method :'get'
            })
                .then(response => response.json())
                .then(data => {
                    const res = data.response
                    for(var i = 0; i < res.length; i++) {
                        temp.push(
                            {
                                label: res[i].name + ' BNK48',
                                value: res[i].name.toLowerCase() + ' BNK'
                            }
                        );
                    }
                    setMem(temp)
                })
        } else {
            fetch(fet + '/cgm48/memberlist?tstamp=' + Math.floor( new Date().getTime()  / 1000), {
                method :'get'
            })
                .then(response => response.json())
                .then(data2 => {
                    const res = data2.response
                    for(var i = 0; i < res.length; i++) {
                        temp.push(
                            {
                                label: res[i].name + ' CGM48',
                                value: res[i].name.toLowerCase() + ' CGM'
                            }
                        );
                    }
                    setMem(temp)
                })
        }
    }

    const ListSt = () => {
        let a = []
            for(let i = 1 ; i < 49; i++){
                a.push(i)
            }
            setRankList(a)




        let temp = []
        const Number = 48
        for (let i = 0; i < Number; i++) {
            const ob = {
                label: (Number - i),
                value: (Number - i)
            }
            temp.push(ob)
        }
        setList(temp)
    }

    React.useEffect(() => {
        if (sessionStorage.getItem("dashad") == null) {
          let person = prompt("Please enter identity password", "");
          if (person == null || person == "") {
              alert('Access denied')
              window.location.href = "/"
          } else {
            fetch(fet + '/bnk48/authcheck?nm=' +btoa(person), {
              method: 'POST', // or 'PUT'
            })
              .then(response => response.text())
              .then(data => {
                  if (data == "true") {
                    sessionStorage.setItem("dashad", "")
                    setDone(true)
                    ListSt()
                    LoadMem(false)
                  } else {
                    alert('Access denied')
                    window.location.href = "/"
                  }
              })
              .catch((error) => {
                alert('Server cannot be respond. Access denied')
                window.location.href = "/"
              });
          }
        } else {
            sessionStorage.setItem("dashad", "")
            setDone(true)
            ListSt()
            LoadMem(false)
        }
      }, [])

    const sub = (e) => {
        e.preventDefault()
        if (Tar == '-') {
            alert("Please choose Election rank number.")
            return false
        }
        if (MemTar == '-') {
            alert("Please choose hosted BNK48 member for this event.")
            return false
        }
        setLoad(true)
        const Obj = {
            rank: Tar,
            name: MemTar,
            sc: parseFloat(Score)
          }
          fetch(fet + '/bnk48/addelec', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(Obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.text())
            .then(data => {
                if (data == "true") {
                    alert("Election result update success.")
                } else {
                    alert("Ranking is exist.")
                }
                setLoad(false)
                setTar("-")
                setMemTar("-")
                setScore("")
            })
            .catch((error) => {
                alert("System will be temporary error for a while. Please try again")
                setLoad(false)
                setTar("-")
                setMemTar("-")
                setScore("")
            });
    }

    const sub2 = (e) => {
        e.preventDefault()
        if (Str != '') {
            setLoad(true)
          fetch(fet + '/bnk48/setstream?ch=' + ChannelSet+'&uri=' + Str + '&plat=' + Plat, {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.text())
            .then(data => {
                if (data == "true") {
                    alert("Update stream success.")
                } else {
                    alert("Error to update.")
                }
                setLoad(false)
                setStr("")
                setChannel("")
            })
            .catch((error) => {
                alert("System will be temporary error for a while. Please try again")
                setLoad(false)
                setStr("")
                setChannel("")
            });
        } else {
            alert("Please add youtube ID.")
            setStr("")
            return false
        }
    }

    const subGE4 = (e) => {
        e.preventDefault()
        if (rank == 0 || rank == '0') {
            return;
        }
        if (!window.confirm("Are you sure")) {
            return;
          }
          setLoad(true)
          fetch('https://cpxstatusservice.azurewebsites.net/ge4result', {
              method: 'PUT', // or 'PUT'
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(ge4body)
          })
          .then(response => response.text())
          .then(data => {
            if (data != "") {
              alert('ok')
              setToken('')
            } else {
                alert("Error")
            }
            setLoad(false)
          })
          .catch((error) => {
              alert("System will be temporary error for a while. Please try again")
              setLoad(false)
              setStr("")
              setChannel("")
          });
    }

    const setVal = (v) => {
        setMemwin(v)
        const check = member.filter(x => x.id == v);
        if (check.length > 0) {
                 setBody({
                    rank: parseInt(rank),
                    label : check[0].label,
                    token: parseFloat(tokenCount),
                    val : check[0].id
                })
        }
    }

    if (done) {
      return ( 
          <>
        <Card>
            <form autoComplete='off' onSubmit={sub2}>
            <CardContent className='row pl-5 pr-5'>
                <div className='col-md-5'>
                    <TextField
                        required={true}
                        label="Add Youtube Stream ID or Facebook Live Url / Facebook Watch Url"
                        value={Str}
                        fullWidth={true}
                        className="mb-3"
                        type="text"
                        onChange={(e) => setStr(e.target.value)}
                    />
                </div>
                <div className='col-md-3'>
                <TextField
                        required={true}
                        fullWidth={true}
                        select
                        label="Channel"
                        value={ChannelSet}
                        className="mb-3"
                        onChange={(e) => setChannel(e.target.value)}
                        >
                            {Streamchannel.length > 0 && Streamchannel.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <div className='col-md-3'>
                <TextField
                        required={true}
                        fullWidth={true}
                        id="platselect"
                        select
                        label="Platform"
                        value={Plat}
                        className="mb-3"
                        onChange={(e) => setPlat(e.target.value)}
                        >
                            {streamplat.length > 0 && streamplat.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <Button color='primary' type='submit'>Update</Button>
            </CardContent>
            </form>

            <form autoComplete='off' onSubmit={subGE4}>
                <h4>GE4</h4>
            <CardContent className='row pl-5 pr-5'>
                <div className='col-md-3'>
                <TextField
                        required={true}
                        fullWidth={true}
                        select
                        label="rank"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        >
                            {ranklist.length > 0 && ranklist.map((option) => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <div className='col-md-3'>
                    <TextField
                        required={true}
                        label="Token Spent"
                        value={tokenCount}
                        fullWidth={true}
                        className="mb-3"
                        type="text"
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>
                <div className='col-md-5'>
                <TextField
                        required={true}
                        fullWidth={true}
                        select
                        label="Members"
                        value={memwin}
                        className="mb-3"
                        onChange={(e) => setVal(e.target.value)}
                        >
                            {member.length > 0 && member.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
                <Button color='primary' type='submit'>Update</Button>
            </CardContent>
            </form>
        </Card>
        <Backdrop className={classes.backdrop} open={load}>
            <img src="https://cdn.statically.io/gl/cpx2017/cpxcdnbucket@main/main/bnk-circular.svg" width="50px" />
        </Backdrop>
        </>
     );
    }
    return null
}
 
export default GeMana;
