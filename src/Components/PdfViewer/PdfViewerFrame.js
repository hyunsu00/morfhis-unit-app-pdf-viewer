import { useEffect, useState } from 'react';
import intlEnUS from './Intl/en-US.json';
import intlKoKR from './Intl/ko-KR.json';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PdfViewer from './PdfViewer';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import PdfViewerTheme from './PdfViewerTheme';

const PdfViewerFrame = ({ parentLocale, cacheContainer, themeContainer }) => {
  const [locale, setLocale] = useState(undefined);
  const [queryClient, setQueryClient] = useState(undefined);
  const [messages, setMessages] = useState(undefined);
  const [emotionCache, setEmotionEmotionCache] = useState(undefined);
  const theme = PdfViewerTheme(themeContainer);

  useEffect(() => {
    initLocale();
    initMessages();
    initQueryClient();
    initEmotionCache();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initLocale();

    // eslint-disable-next-line
  }, [parentLocale]);

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
      language = parentLocale;
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
    if (cacheContainer !== undefined) {
      cacheObject.container = cacheContainer;
    }
    setEmotionEmotionCache(createCache(cacheObject));
  }

  if (messages === undefined || locale === undefined || queryClient === undefined || emotionCache === undefined || theme === undefined) {
    return <div>페이지 로딩 중 </div>;
  }

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme.light}>
            <PdfViewer />
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </IntlProvider>
  );
};

export default PdfViewerFrame;
