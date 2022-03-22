import React, { useState } from 'react'
import axios from 'axios'
import {
  Grid,
  Typography,
  Box,
  FormControl,
  TextField,
  Button,
  FormHelperText,
  Link,makeStyles
} from '@material-ui/core'

export default function Login (props) {
    const useStyles=makeStyles(theme=>({
        inputTextColor:{
            color:"black"
        }
    }))

    const classes=useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isEmpty = !email || !password || alert.show
  const onClear = () => {
    setEmail('')
    setPassword('')
  }
  const onSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/login', { email, password })
      .then(d => {
        if (d.data.token) {
          props.setLoggedIn(true);

          onClear()
          
        }
      })

  }
  return (
    <Grid
      style={{
        marginTop: 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:100,
      }}
    >
      <Grid>
        <Typography variant='h4' style={{ textAlign: 'center' }}>
          Login
        </Typography>
        <Box
          style={{
            display: 'flex',
            border: '2px solid #F64c72',
            borderRadius: '20px',
            flexDirection: 'column',
            gap: '20px',
            padding: '50px 40px',
            marginTop: '10px',
            boxShadow: '10px 8px 5px -5px rgba(0,0,0,0.62)',
            WebkitBoxShadow: '10px 8px 5px -5px rgba(0,0,0,0.62)',
            MozBoxShadow: '10px 8px 5px -5px rgba(0,0,0,0.62)'
          }}
        >
          <FormControl>
            <TextField
              label='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputProps={{classes:{
                  input:classes.inputTextColor
              }}}
             
            ></TextField>
          </FormControl>

          <FormControl>
            <TextField
              type='password'
              label='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{classes:{
                input:classes.inputTextColor
            }}}
            />
          </FormControl>
          {isEmpty ? (
            <Typography variant='h6' style={{ color: 'red' }}>
              Please enter all the fields
            </Typography>
          ) : (
            <Button
              variant='outlined'
              id='button'
              type='submit'
              style={{ color: 'inherit', borderColor: '#F64c72' }}
              onClick={e => onSubmit(e)}
            >
              Submit
            </Button>
          )}

          <FormHelperText>
            Don't Have Account...?{' '}
            <Link
              underline='hover'
              color='inherit'
              style={{ backgroundColor: 'red' }}
              onClick={()=>props.setRegister(true)}
              style={{ cursor: 'pointer' }}
            >
              Register Here
            </Link>
          </FormHelperText>
        </Box>
      </Grid>
    </Grid>
  )
}
