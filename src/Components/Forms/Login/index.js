/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useRef } from 'react'
import { Box, Button, Grid } from '@material-ui/core'
// import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { withStyles } from "@material-ui/styles"
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { TextValidator } from 'react-material-ui-form-validator'
import { useSnackbar } from 'notistack'

import { setUserList, setCurrentTab } from '@/Logic/redux'
import { BaseForm } from './..'
import useStyles from './styles'


const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    // setActiveUser: (payload) => dispatch(setActiveUser(payload)),
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Login = (props) => {
  /** VARS **/
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const formRef = useRef()
  const {
    classes,
    dispatch,
    username,
  } = props


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'login' })
  }, [])

  useEffect(() => {
    if (username)
      history.push('/')
  }, [username])


  /** HANDLERS **/
  const handleSubmit = async (e) => {
    setIsLoading(true)
    setPasswordInput('')
    setErrorMessages([])

    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
    
    setIsLoading(false)
    enqueueSnackbar('Login not implemented', { variant: 'error' })
  }

  const handleError = (e) => {
    setErrorMessages([])
  }

  const handleClear = (e) => {
    setErrorMessages([])
    setUsernameInput('')
    setPasswordInput('')
    formRef.current.resetValidations()
  }


  /** RENDER **/
  return (
    <Grid container className={classes.root}>
      <BaseForm
        formRef={formRef}
        onSubmit={handleSubmit}
        onError={handleError}
        instantValidate={false}

        header='Login'
        // icon     = {() => <AccountCircleIcon fontSize='inherit' />}
        icon={() => <Box marginBottom={2}>💩</Box>}
        content={() => (
          <>
            <TextValidator
              id='username'
              type='text'
              label='Username'
              variant='outlined'
              size='small'
              color='secondary'
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              validators={['required', `matchRegexp:^([A-Za-z0-9]|[-_.'])*$`]}
              errorMessages={['Field is required', 'Special characters are not allowed']}
              autoComplete='current-username'
            />
            <TextValidator
              id='password'
              type='password'
              label='Password'
              variant='outlined'
              size='small'
              color='secondary'
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              validators={['required']}
              errorMessages={['Field is required']}
              autoComplete='current-password'
            />
            <Grid container direction='column'>
              {
                Object.values(errorMessages).map((value, i) => (
                  <Grid item key={i} className={classes.errorMessages}>
                    {value[0].toUpperCase() + value.slice(1)} {/* capitalize first letter */}
                  </Grid>
                ))
              }
            </Grid>
          </>
        )}
        actions={() => (
          <Grid container spacing={1}>
            <Grid item>
              <Button
                size="medium"
                variant="outlined"
                onClick={handleClear}
                disabled={isLoading}
              >
                Clear
              </Button>
            </Grid>
            <Grid item style={{ paddingRight: 0 }}>
              <Button
                type="submit"
                size="medium"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        )}
      />
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Login
    )
  )