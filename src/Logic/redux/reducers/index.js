import usersReducers from './usersReducers';
import themeReducers from './themeReducers';
import topMenuReducers from './topMenuReducers';

import { combineReducers } from "redux";

export default combineReducers({
    users: usersReducers,
    theme: themeReducers,
    topMenu: topMenuReducers
});

export {
    usersReducers,
    themeReducers,
    topMenuReducers,
}