
const useStyles = (theme) => {
  return {
    root: {
      marginBottom: theme.spacing(11),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(4),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formControl: {
      margin: 6,
      minWidth: 110,
    },
  }
}

export default useStyles