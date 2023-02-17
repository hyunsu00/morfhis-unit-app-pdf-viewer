import { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

export default function PdfViewerTheme(themeContainer) {
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
    if (themeContainer !== null && themeContainer !== undefined) {
      themeObject.components = {
        MuiPopover: {
          defaultProps: {
            container: themeContainer,
          },
        },
        MuiPopper: {
          defaultProps: {
            container: themeContainer,
          },
        },
        MuiModal: {
          defaultProps: {
            container: themeContainer,
          },
        },
      };
    }
    return themeObject;
  };

  return theme;
}
