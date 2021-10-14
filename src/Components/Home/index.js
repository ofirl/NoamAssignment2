/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import { Typography, Paper, Grid } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"
import { connect } from "react-redux"
// import { useHistory } from "react-router";

import { setCurrentTab } from "@/Logic/redux"
import useStyles from "./styles"


const mapStateToProps = (state) => ({
  currentTab: state.actions.topMenu.currentTab,
})

const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Home = (props) => {
  //VARS
  // const history = useHistory();
  // const [width,] = useSize(document.body)
  const {
    classes,
    // username,
    dispatch,
  } = props

  //EFFECTS
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'home' })
  }, [])

  // useEffect( () => {
  //   MagicdexApi
  //     .getAllCards()
  //     .then(res => console.log(res))
  // }, [username])

  //HANDLERS
  // const handleTabChange = (event, value) => {
  //   dispatch.setCurrentTab({tab:value});
  //   history.push( '/' + value )
  // }

  //RENDER
  return (
    <Grid container justifyContent='center' className={classes.root}>
      <Grid item component={Paper} xs={12} sm={10} md={9} lg={8} className={classes.content}>
        <Typography variant="h2" style={{ paddingBottom: 16 }}>
          Welcome AppsForce!
        </Typography>
        <Typography variant='body1'>
          Made by Noam Levi
        </Typography>
      </Grid>
    </Grid>
  )
}

// EXPORT WITH HOOKS AND DECORATORS
export default
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(useStyles)(
      Home
    )
  )