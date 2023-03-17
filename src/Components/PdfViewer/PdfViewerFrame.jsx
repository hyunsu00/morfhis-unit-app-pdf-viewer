import { useEffect, useRef, useState } from 'react';
import intlEnUS from './Intl/En-US.json';
import intlKoKR from './Intl/Ko-KR.json';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PdfViewer from './PdfViewer';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import PdfViewerTheme from './Theme/PdfViewerTheme';
import PdfViewerState from './Store/PdfViewerState';
import _ from 'lodash';
import useWinSize from './useWinSize';
import { isMobile } from 'react-device-detect';
import { useMediaQuery } from '@mui/material';

const PdfViewerFrame = ({ props }) => {
  const [isLoading, setLoading] = useState(undefined);
  const initWinSize = useWinSize();
  const [locale, setLocale] = useState(undefined);
  const [queryClient, setQueryClient] = useState(undefined);
  const [messages, setMessages] = useState(undefined);
  const [emotionCache, setEmotionEmotionCache] = useState(undefined);
  const theme = PdfViewerTheme();
  const prefersColorSchemeDark = useMediaQuery('(prefers-color-scheme: dark)');
  const { winSize, setWinSize, setViewportResizing, touchScreen, setTouchScreen, selectTheme, setSelectTheme } = PdfViewerState();

  useEffect(() => {
    initLocale();
    initMessages();
    initQueryClient();
    initEmotionCache();
    initPinchZoom();
    initRootOverflow();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initRootOverflow();

    if (isLoading === false) {
      window.location.reload();
    }

    // eslint-disable-next-line
  }, [touchScreen]);

  useEffect(() => {
    setSelectTheme(prefersColorSchemeDark === false ? 'light' : 'dark');

    // eslint-disable-next-line
  }, [prefersColorSchemeDark]);

  useEffect(() => {
    initHtmlBackgroundColor();

    // eslint-disable-next-line
  }, [theme, selectTheme]);

  useEffect(() => {
    if (_.isEqual(initWinSize, winSize) === false) {
      setWinSize(initWinSize);
    }

    // eslint-disable-next-line
  }, [initWinSize]);

  useEffect(() => {
    checkTouchScreen();

    // eslint-disable-next-line
  }, [winSize]);

  useEffect(() => {
    initLocale();

    // eslint-disable-next-line
  }, [props]);

  const initMessages = () => {
    const messages = {
      'en-US': intlEnUS,
      'ko-KR': intlKoKR,
    };
    setMessages(messages);
  };

  const initQueryClient = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    });
    setQueryClient(queryClient);
  };

  function initLocale() {
    setLocale(getLocale());
  }

  const getLocale = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    let urlLanguage = urlSearchParams.get('lang');
    if (urlLanguage === null || urlLanguage === undefined) {
      urlLanguage = urlSearchParams.get('language');
    }
    let language = urlLanguage;
    if (language === null || language === undefined || language.trim().length === 0) {
      language = props.parentLocale;
    }
    if (language === null || language === undefined || language.trim().length === 0) {
      language = navigator.language;
    }

    if (language === null || language === undefined) {
      return 'ko-KR';
    }
    language = language.replace('-', '');
    language = language.replace('_', '');
    language = language.toLowerCase();
    switch (language) {
      case 'en':
      case 'enus':
        return 'en-US';
      case 'ko':
      case 'kokr':
        return 'ko-KR';
      default: {
        if (language.startsWith('en')) {
          return 'en-US';
        }
      }
    }

    return 'ko-KR';
  };

  function initEmotionCache() {
    let cacheObject = { key: 'css', prepend: true };
    setEmotionEmotionCache(createCache(cacheObject));
  }

  const initPinchZoom = () => {
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=' + 3 + ', user-scalable=yes');
      if (window.visualViewport.onresize === null) {
        window.visualViewport.onresize = (event) => {
          setViewportResizing(true);
          checkViewportResizingEndPoint();
        };
      }

      if (window.visualViewport.onscroll === null) {
        window.visualViewport.onscroll = (event) => {
          setViewportResizing(true);
          checkViewportResizingEndPoint();
        };
      }
    }
  };

  const initRootOverflow = () => {
    if (touchScreen === true) {
      document.documentElement.removeAttribute('style');
    } else {
      document.documentElement.style.overflow = 'overlay';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
    }
  };

  const initHtmlBackgroundColor = () => {
    if (theme?.light?.palette?.background?.system !== undefined) {
      document.documentElement.style.backgroundColor = selectTheme === 'light' ? theme.light.palette.background.system : theme.dark.palette.background.system;
      document.documentElement.style.setProperty('--scrollbar-thumb-background-color', selectTheme === 'light' ? theme.light.palette.scrollbar.thumb : theme.dark.palette.scrollbar.thumb);
    }
  };

  const checkViewportResizingEndPoint = _.debounce(() => {
    setViewportResizing(false);
  }, 500);

  const frameFinishedLoading = _.debounce(() => {
    setLoading(false);
  }, 500);

  const checkTouchScreen = _.debounce(() => {
    const touchScreen = isMobile || 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    setTouchScreen(touchScreen);
  }, 200);

  if (winSize !== undefined && touchScreen !== undefined && selectTheme !== undefined && messages !== undefined && locale !== undefined && queryClient !== undefined && emotionCache !== undefined && theme !== undefined) {
    frameFinishedLoading();
  }

  if (isLoading === undefined || isLoading === true) {
    return <div>페이지 로딩 중 </div>;
  }

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={selectTheme === 'light' ? theme.light : theme.dark}>
            <PdfViewer />
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </IntlProvider>
  );
};

export default PdfViewerFrame;
