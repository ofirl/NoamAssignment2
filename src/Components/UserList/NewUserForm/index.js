/* eslint-disable no-lone-blocks */

import { useState, useRef } from 'react'
import { Box, Select, MenuItem, FormHelperText, FormControl, InputLabel, Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { TextValidator } from 'react-material-ui-form-validator'
import { connect } from 'react-redux'
import _ from 'lodash'

import { addUser } from "@/Logic/redux"
import { BaseForm } from '@/Components'
import { ALL_LANGS } from '@/Config'
import useStyles from './styles'


const mapStateToProps = (state) => ({
  users: state.actions.users,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    addUser: (payload) => dispatch(addUser(payload)),
  }
})

const NewUserForm = (props) => {
  /** VARS **/
  const {
    classes,
    dispatch,
    users,
    closeModal,
  } = props
  const formRef = useRef()
  const selectRef = useRef()
  const [titleInput, setTitleInput] = useState('')
  const [titleErrorMsg, setTitleErrorMsg] = useState('')
  const [firstNameInput, setFirstNameInput] = useState('')
  const [lastNameInput, setLastNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [countryInput, setCountryInput] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [streetNameInput, setStreetNameInput] = useState('')
  const [streetNumberInput, setStreetNumberInput] = useState('')


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  const handleSubmit = (e) => {
    if (titleInput === '')
      return setTitleErrorMsg('Field is required')

    setTitleErrorMsg('')
    const newUser = {
      id: {},
      email: emailInput,
      location: {
        country: countryInput,
        city: cityInput,
        street: {
          name: streetNameInput,
          number: Number(streetNumberInput),
        },
      },
      name: {
        title: titleInput,
        first: firstNameInput,
        last: lastNameInput,
      },
    }
    dispatch.addUser({ user: newUser })
    closeModal()
  }

  const handleError = (e) => {
    setTitleErrorMsg(titleInput === '' ? 'Field is required' : '')
  }

  const handleClear = (e) => {
    setTitleInput('')
    setFirstNameInput('')
    setLastNameInput('')
    setEmailInput('')
    setCountryInput('')
    setCityInput('')
    setStreetNameInput('')
    setStreetNumberInput('')

    setTitleErrorMsg('')
    formRef.current.resetValidations()
  }


  /** VALIDATORS **/
  const doesEmailExist = (value) => {
    console.log({ value, users })
    return !Boolean(_.find(users, { email: value }))
  }


  /** RENDER **/
  return (

    <BaseForm
      formRef={formRef}
      validationRules={{ doesEmailExist }}
      onSubmit={handleSubmit}
      onError={handleError}
      instantValidate={false}
      header='User Creation'
      icon={() => <Box marginBottom={2}>💁</Box>}

      content={() =>
        <Grid container spacing={2} style={{ alignItems: 'center' }}>
          <Grid item xs='auto'>
            <FormControl size='small' className={classes.formControl} error={titleErrorMsg !== ''}>
              <InputLabel
                id='title-label'
                style={{ top: -8, left: 14 }}>
                Title
              </InputLabel>
              <Select ref={selectRef}
                labelId='title-label'
                id='label'
                label='Title'
                variant='outlined'
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              >
                <MenuItem value='Mr'>Mr</MenuItem>
                <MenuItem value='Mrs'>Mrs</MenuItem>
                <MenuItem value='Miss'>Miss</MenuItem>
              </Select>
              <FormHelperText error
                style={{ display: titleErrorMsg === '' ? 'none' : 'unset', marginLeft: 14 }}
              >
                {titleErrorMsg}
              </FormHelperText>
            </FormControl>
            <TextValidator
              id='first-name'
              type='text'
              label='First Name'
              variant='outlined'
              size='small'
              color='secondary'
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              validators={['required', 'minStringLength:3', `matchRegexp:^(${ALL_LANGS}|[ ])*$`]}
              errorMessages={['Field is required', 'Name is too short', 'Special characters are not allowed']}
            />
            <TextValidator
              id='last-name'
              type='text'
              label='Last Name'
              variant='outlined'
              size='small'
              color='secondary'
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              validators={['required', 'minStringLength:3', `matchRegexp:^(${ALL_LANGS}|[ ])*$`]}
              errorMessages={['Field is required', 'Name is too short', 'Special characters are not allowed']}
            />
            <TextValidator
              id='email'
              type='text'
              label='Email'
              variant='outlined'
              size='small'
              color='secondary'
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              validators={['required', 'isEmail', 'doesEmailExist']}
              errorMessages={['Field is required', 'Email address is not valid', 'Email already exists']}
            />
          </Grid>
          <Grid item xs='auto'>
            <TextValidator
              variant='outlined'
              size='small'
              color='secondary'
              label='Country'
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              validators={['required']}
              errorMessages={['Field is required']}
            />
            <TextValidator
              variant='outlined'
              size='small'
              color='secondary'
              label='City'
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              validators={['required']}
              errorMessages={['Field is required']}
            />
            <TextValidator
              variant='outlined'
              size='small'
              color='secondary'
              label='Street Name'
              value={streetNameInput}
              onChange={(e) => setStreetNameInput(e.target.value)}
              validators={['required']}
              errorMessages={['Field is required']}
            />
            <TextValidator
              variant='outlined'
              size='small'
              color='secondary'
              label='Street Number'
              value={streetNumberInput}
              onChange={(e) => setStreetNumberInput(e.target.value)}
              validators={['required', 'isPositive']}
              errorMessages={['Field is required', 'Field shoould be a positive number']}
            />
          </Grid>
        </Grid>
      }

      actions={() =>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              onClick={handleClear}
            // disabled={isLoading}
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
            // disabled={isLoading}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      }
    />
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      NewUserForm
    )
  )