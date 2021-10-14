import _ from 'lodash'


const usersReducers = {
  setUserList: (state, action) => {
    const { users } = action.payload

    state.users = [
      ...users,
    ]
  },

  addUser: (state, action) => {
    const { user: newUser } = action.payload

    state.users = [
      ...state.users,
      newUser,
    ]
  },

  deleteUser: (state, action) => {
    const { user: oldUser } = action.payload

    state.users = _.filter(state.users,
      user => oldUser.email !== user.email
    )
  },

  updateUser: (state, action) => {
    let { user: newUser } = action.payload
    const idx = _.findIndex(state.users, { email: newUser.email })

    state.users[idx] = _.merge(state.users[idx], newUser)
  },
}

export default usersReducers