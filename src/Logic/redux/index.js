import store from "./store"
import reducer, {
  setUserList,
  updateUser,
  addUser,
  deleteUser,
  setCurrentTab,
  toggleCurrentThemeType,
} from './reducerSlice'


export default reducer

export {
  store,
  setUserList,
  updateUser,
  deleteUser,
  addUser,
  setCurrentTab,
  toggleCurrentThemeType,
}