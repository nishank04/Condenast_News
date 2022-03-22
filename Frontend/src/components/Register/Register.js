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

export default function RegisterPage (props) {
  const useStyles=makeStyles(theme=>({
    inputTextColor:{
        color:"black"
    }
}))

const classes=useStyles();


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isEmpty = !name || !email || !password || alert.show
  const onClear = () => {
    setName('')
    setEmail('')
    setPassword('')
  }
  const onSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/register', { name, email, password })
      .then(d => {
        console.log('token from d', d)
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
        marginBottom:100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid>
        <Typography variant='h4' style={{ textAlign: 'center' }}>
          Register
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
              label='Name'
              value={name}
              onChange={e => setName(e.target.value)}
              InputProps={{classes:{
                input:classes.inputTextColor
            }}}
            ></TextField>
          </FormControl>
          <FormControl>
            <TextField
              type={'email'}
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
              type={'password'}
              label='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{classes:{
                input:classes.inputTextColor
            }}}
            ></TextField>
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
              Register
            </Button>
          )}
          <FormHelperText>
            Already Have Account?{' '}
            <Link
              underline='hover'
              color='inherit'
              onClick={()=>props.setRegister(false)}
              style={{ cursor: 'pointer' }}
            >
              Login Here
            </Link>
          </FormHelperText>
        </Box>
      </Grid>
    </Grid>
  )
}
