import { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import darkSet from './DarkSet.json';
import lightSet from './LightSet.json';

export default function PdfViewerTheme() {
  const [theme, setTheme] = useState({});

  useEffect(() => {
    const lightThemeObject = initThemeObject('light');
    const darkThemeObject = initThemeObject('dark');
    const dark = createTheme(darkThemeObject);
    const light = createTheme(lightThemeObject);
    const theme = {
      dark: dark,
      light: light,
    };
    setTheme(theme);

    // eslint-disable-next-line
  }, []);

  const initThemeObject = (mode) => {
    let themeObject = {};
    themeObject.palette = {
      mode: mode,
      divider: mode === 'dark' ? darkSet.palette.divider : lightSet.palette.divider,
      background: {
        default: mode === 'dark' ? darkSet.palette.background.default : lightSet.palette.background.default,
        paper: mode === 'dark' ? darkSet.palette.background.paper : lightSet.palette.background.paper,
        system: mode === 'dark' ? darkSet.palette.background.system : lightSet.palette.background.system,
        header: mode === 'dark' ? darkSet.palette.background.header : lightSet.palette.background.header,
        header_pagination_input: mode === 'dark' ? darkSet.palette.background.header_pagination_input : lightSet.palette.background.header_pagination_input,
        dialog: mode === 'dark' ? darkSet.palette.background.dialog : lightSet.palette.background.dialog,
        sidebar: mode === 'dark' ? darkSet.palette.background.sidebar : lightSet.palette.background.sidebar,
        backdrop: mode === 'dark' ? darkSet.palette.background.backdrop : lightSet.palette.background.backdrop,
        action_hover: mode === 'dark' ? darkSet.palette.background.action_hover : lightSet.palette.background.action_hover,
      },
      text: {
        primary: mode === 'dark' ? darkSet.palette.text.primary : lightSet.palette.text.primary,
        secondary: mode === 'dark' ? darkSet.palette.text.secondary : lightSet.palette.text.secondary,
        disabled: mode === 'dark' ? darkSet.palette.text.disabled : lightSet.palette.text.disabled,
      },
      border: {
        outline: mode === 'dark' ? darkSet.palette.border.outline : lightSet.palette.border.outline,
        outline_focused: mode === 'dark' ? darkSet.palette.border.outline_focused : lightSet.palette.border.outline_focused,
        divider: mode === 'dark' ? darkSet.palette.border.divider : lightSet.palette.border.divider,
      },
      secondary: {
        main: mode === 'dark' ? darkSet.palette.secondary.main : lightSet.palette.secondary.main,
      },
      error: {
        main: mode === 'dark' ? darkSet.palette.error.main : lightSet.palette.error.main,
      },
      primary: {
        light: mode === 'dark' ? darkSet.palette.primary.light : lightSet.palette.primary.light,
        main: mode === 'dark' ? darkSet.palette.primary.main : lightSet.palette.primary.main,
        dark: mode === 'dark' ? darkSet.palette.primary.dark : lightSet.palette.primary.dark,
      },
      action: {
        active: mode === 'dark' ? darkSet.palette.action.active : lightSet.palette.action.active,
        hover: mode === 'dark' ? darkSet.palette.action.hover : lightSet.palette.action.hover,
        selected: mode === 'dark' ? darkSet.palette.action.selected : lightSet.palette.action.selected,
        disabled: mode === 'dark' ? darkSet.palette.action.disabled : lightSet.palette.action.disabled,
        disabled_background: mode === 'dark' ? darkSet.palette.action.disabled_background : lightSet.palette.action.disabled_background,
        focus: mode === 'dark' ? darkSet.palette.action.focus : lightSet.palette.action.focus,
      },
      scrollbar: {
        thumb: mode === 'dark' ? darkSet.palette.scrollbar.thumb : lightSet.palette.scrollbar.thumb,
      },
    };

    return themeObject;
  };

  return theme;
}
