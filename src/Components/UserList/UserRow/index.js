/* eslint-disable no-lone-blocks */

import { useState, useRef } from 'react'
import { Select, Hidden, MenuItem, FormHelperText, FormControl, InputLabel, Grid, TableCell, TableRow, Button, ButtonGroup, IconButton, Modal, Backdrop } from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountBox as AccountBoxIcon,
} from '@material-ui/icons'
import { TextValidator } from 'react-material-ui-form-validator'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useSnackbar } from 'notistack'
import _ from 'lodash'

import { deleteUser, updateUser } from "@/Logic/redux"
import { BaseForm } from '@/Components'
import { ALL_LANGS } from '@/Config'
import useStyles from './styles'


const mapStateToProps = (state) => ({
  users: state.actions.users,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    deleteUser: (payload) => dispatch(deleteUser(payload)),
    updateUser: (payload) => dispatch(updateUser(payload)),
  }
})

const UserRow = (props) => {
  /** VARS **/
  const {
    classes,
    users,
    user,
    dispatch,
  } = props
  const { enqueueSnackbar } = useSnackbar()
  const formRef = useRef()
  const selectRef = useRef()
  const [modalOpen, setModalOpen] = useState(false)
  const [titleInput, setTitleInput] = useState(user.name.title)
  const [titleErrorMsg, setTitleErrorMsg] = useState('')
  const [firstNameInput, setFirstNameInput] = useState(user.name.first)
  const [lastNameInput, setLastNameInput] = useState(user.name.last)
  const [emailInput, setEmailInput] = useState(user.email)
  const [countryInput, setCountryInput] = useState(user.location.country)
  const [cityInput, setCityInput] = useState(user.location.city)
  const [streetNameInput, setStreetNameInput] = useState(user.location.street.name)
  const [streetNumberInput, setStreetNumberInput] = useState(user.location.street.number)


  /** EFFECTS **/
  { }


  /** VALIDATORS **/
  const doesEmailExist = (userEmail) => (value) => {
    return !Boolean(_.chain(users)
      .reject({ email: userEmail })
      .find({ email: value })
      .value())
  }

  const parseTitle = (title) => {
    switch (title?.toLowerCase()) {
      case 'monsieur':
      case 'mr':
        return 'Mr'

      case 'madame':
      case 'mrs':
        return 'Mrs'

      case 'mademoiselle':
      case 'miss':
      case 'ms':
        return 'Miss'

      default:
        return ''
    }
  }


  /** HANDLERS **/
  const handleDelete = (e) => {
    dispatch.deleteUser({ user })
    enqueueSnackbar(`User ${user.name.first} ${user.name.last} deleted`, { variant: 'info' })
  }

  const handleSubmit = (e) => {
    const newUser = {
      ...user,
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
    dispatch.updateUser({ user: newUser })
    enqueueSnackbar(`User ${user.name.first} ${user.name.last} updated`, { variant: 'info' })
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

  const openModal = () => {
    setTitleInput(user.name.title)
    setFirstNameInput(user.name.first)
    setLastNameInput(user.name.last)
    setEmailInput(user.email)
    setCountryInput(user.location.country)
    setCityInput(user.location.city)
    setStreetNameInput(user.location.street.name)
    setStreetNumberInput(user.location.street.number)

    setTitleErrorMsg('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }


  /** RENDER **/
  return (
    <>
      {/* TABLE VIEW */}
      <TableRow>
        <TableCell>
          {
            user.picture?.thumbnail ?
              <img src={user.picture?.thumbnail} alt='thumbnail' />
              :
              <AccountBoxIcon style={{ width: 60, height: 60 }} />
          }
        </TableCell>
        <TableCell>{user.id?.value ?? '-'}</TableCell>
        <TableCell>{Object.values(user.name).join(' ')}</TableCell>
        <TableCell>{user.location.country}</TableCell>
        <TableCell>{user.location.city}</TableCell>
        <TableCell>{Object.values(user.location.street).join(' ')}</TableCell>

        <Hidden mdDown>
          <TableCell>{user.email}</TableCell>
        </Hidden>
        <Hidden lgUp>
          <TableCell>{user.email.length > 15 ? user.email.slice(0, 15) + '...' : user.email}</TableCell>
        </Hidden>

        <TableCell>
          <ButtonGroup variant='text'>
            <IconButton onClick={openModal}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>

      {/* MODAL FORM VIEW */}
      <Modal
        BackdropComponent={Backdrop}
        className={classes.modal}
        open={modalOpen}
        onClose={closeModal}
      >
        <BaseForm
          formRef={formRef}
          validationRules={{ [`doesEmailExist-${user.email}`]: doesEmailExist(user.email) }}
          onSubmit={handleSubmit}
          onError={handleError}
          instantValidate={false}
          header='Edit User'
          icon={() =>
            user.picture?.medium ?
              <img src={user.picture?.medium} alt='thumbnail' />
              :
              <AccountBoxIcon style={{ width: 100, height: 100 }} />
          }

          content={() =>
            <Grid container spacing={2} style={{ alignItems: 'center' }}>
              <Grid item xs='auto'>
                <FormControl size='small' style={{ margin: 6, minWidth: 120 }} error={titleErrorMsg !== ''}>
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
                    value={parseTitle(titleInput)}
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
                  validators={['required', 'isEmail', `doesEmailExist-${user.email}`]}
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
      </Modal>
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      UserRow
    )
  )