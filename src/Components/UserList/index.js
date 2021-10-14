/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useEffect, useState } from 'react'
import { Paper, Grid, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Fab, Backdrop, Modal, TextField, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Add as AddIcon } from '@material-ui/icons'
import { connect } from 'react-redux'
// import _ from 'lodash'
// import { useHistory } from 'react-router'

import { setCurrentTab } from "@/Logic/redux"
import FilteredDataProvider from './FilteredDataProvider'
// import UserRow from './UserRow'
import NewUserForm from './NewUserForm'
import useStyles from './styles'


const mapStateToProps = (state) => ({
  users: state.actions.users,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})


/** COMPONENTS **/
// const CustomRows = (props) => {
//   const {
//     data
//   } = props

//   console.log(data)

//   return (
//     data.map((user, i) => (
//       <UserRow
//         key={i}
//         user={user}
//       />
//     ))
//   )
// }

const UserList = (props) => {
  /** VARS **/
  // const history = useHistory()
  const {
    classes,
    dispatch,
    users,
  } = props
  const [modalOpen, setModalOpen] = useState(false)
  const [searchType, setSearchType] = useState('name')
  const [searchInput, setSearchInput] = useState('')
  const [filters, setFilters] = useState({})


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'users' })
  }, [])

  useEffect(() => {
    switch (searchType) {
      default:
      case 'name':
        return setFilters({
          name: (value, item) => Object.values(item.name).join(' ').toLowerCase().includes(searchInput),
        })
      case 'email':
        return setFilters({
          email: v => v.toLowerCase().includes(searchInput),
        })
      case 'country':
        return setFilters({
          location: loc => loc.country.toLowerCase().includes(searchInput),
        })
      case 'city':
        return setFilters({
          location: loc => loc.city.toLowerCase().includes(searchInput),
        })
      case 'street':
        return setFilters({
          location: loc => loc.street.name.toLowerCase().includes(searchInput),
        })
    }
  }, [searchType, searchInput])


  /** HANDLERS **/
  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }


  /** RENDER **/
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item container justifyContent='center' xs={12} style={{ alignItems: 'center' }}>
          <Grid item xs={10} lg={8}>
            <TextField fullWidth
              variant='outlined'
              type='search'
              label='Search'
              color='secondary'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              <InputLabel id="search-label" color='secondary' style={{ top: -6, left: 14 }}>Search By</InputLabel>
              <Select
                color='secondary'
                label='Search By'
                variant='outlined'
                labelId="search-label"
                id="search"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <MenuItem value='name'>Name</MenuItem>
                <MenuItem value='email'>Email</MenuItem>
                <MenuItem value='country'>Country</MenuItem>
                <MenuItem value='city'>City</MenuItem>
                <MenuItem value='street'>Street</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell /> {/* avatar */}
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell /> {/* edit & delete */}
                </TableRow>
              </TableHead>
              <TableBody>
                <FilteredDataProvider
                  data={users}
                  filters={filters}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Fab
        className={classes.fab}
        color='primary'
        onClick={openModal}
      >
        <AddIcon />
      </Fab>
      <Modal
        BackdropComponent={Backdrop}
        className={classes.modal}
        open={modalOpen}
        onClose={closeModal}
      >
        <NewUserForm
          closeModal={closeModal}
        />
      </Modal>
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      UserList
    )
  )