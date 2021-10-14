/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, createRef } from 'react'
import { Button, CssBaseline, ThemeProvider } from "@material-ui/core"
import { Close as CloseIcon } from '@material-ui/icons'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/styles"
import { SnackbarProvider } from 'notistack'
// import { useHistory } from 'react-router';

import { TopMenu, Login, Register, Home } from "@/Components"
import { setActiveUser } from "@/Logic/redux"
import useStyles from "./styles"


const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
  // accessToken: state.actions.activeUser.accessToken,
  // username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setActiveUser: (payload) => dispatch(setActiveUser(payload)),
  }
})


const App = (props) => {
  /** VARS **/
  // const history = useHistory()
  const snackbarRef = createRef()
  const {
    // dispatch,
    theme: _theme,
  } = props
  const theme = Object.assign({}, _theme)
  const classes = makeStyles(useStyles(theme))()

  const routes = [
    {
      component: Route,
      props: {
        path: '/',
        component: Home,
        exact: true,
      }
    },
    {
      component: Route,
      props: {
        path: '/home',
        component: () => <Redirect to='/' />,
        exact: true,
      }
    },
    {
      component: Route,
      props: {
        path: '/login',
        component: Login,
        exact: true,
      }
    },
    {
      component: Route,
      props: {
        path: '/register',
        component: Register,
        exact: true,
      }
    },
    {
      component: Redirect,
      props: {
        to: '/login',
        exact: false,
      }
    },
  ]


  /** EFFECTS **/
  useEffect(() => {
    // onMount
  }, [])


  /** RENDER **/
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        ref={snackbarRef}
        autoHideDuration={3250}
        maxSnack={3}
        action={toastId => (
          <Button
            endIcon={<CloseIcon />}
            onClick={e => snackbarRef.current.closeSnackbar(toastId)}
            color="inherit"
          >
            Dismiss
          </Button>
        )}
      >
        <div className={classes.root}>
          <Router>
            <TopMenu />
            <div className={classes.content}>
              <Switch>
                {
                  routes.map((item, i) => (
                    <item.component
                      key={i}
                      {...item.props}
                    />
                  ))
                }
              </Switch>
            </div>
          </Router>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)