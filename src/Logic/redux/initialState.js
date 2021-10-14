import { getDarkTheme, getLightTheme } from "@/Themes";

/** LOCAL STORAGE **/
let themeType = localStorage.getItem("themeType");

themeType = themeType ? themeType : "dark";


/** STATE **/
const INITIAL_STATE = {
  users: [],
  theme: {
    currentTheme: themeType === 'dark' ? getDarkTheme() : getLightTheme(),
    currentThemeType: themeType,
  },
  topMenu: {
    currentTab: 'home',
  }
};

export default INITIAL_STATE;
