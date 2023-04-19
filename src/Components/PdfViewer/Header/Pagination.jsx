import { useEffect, useRef, useState } from 'react';
import DividerVertical from '../DividerVertical/DividerVertical';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import TextField from '@mui/material/TextField';

import webPdfLib, {ACTION_ID, EVENT_ID} from '../../../web-pdf-lib/webPdfLib';

const Pagination = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const refCurrentPage = useRef(null);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    refCurrentPage.current.value = currentPage;

    const onDocumentLoaded = function() {
      setCurrentPage(webPdfLib.getCurrentPageNumber());
      setTotalPage(webPdfLib.getTotalPageNumber());
    };
    const onUpdateUi = function(event) {
      const {name, value} = event.detail;
      if (name == 'page_number') {
        setCurrentPage(value.pageNumber);
      }
    };
    webPdfLib.getEventManager().on(EVENT_ID.onDocumentLoaded, onDocumentLoaded);
    webPdfLib.getEventManager().on(EVENT_ID.onUpdateUi, onUpdateUi);
    return () => {
      webPdfLib.getEventManager().off(EVENT_ID.onDocumentLoaded, onDocumentLoaded);
      webPdfLib.getEventManager().on(EVENT_ID.onUpdateUi, onUpdateUi);
    }
  }, [currentPage]);

  const setPageNumber = (goToPageNumber) => {
    const currentPageNumber = webPdfLib.getCurrentPageNumber();
    if (goToPageNumber != currentPageNumber) {
      webPdfLib.getActionManager().Execute(ACTION_ID.GOTO_PAGE, goToPageNumber);
      setCurrentPage(goToPageNumber);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '24px',
        gap: '10px',
        '@media (max-width: 599px)': {
          marginLeft: '6px',
          marginRight: '10px',
        },
      }}>
      <TextField
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: 'background.header_pagination_input',
            '&:hover fieldset': {
              borderColor: 'border.outline',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              borderColor: 'border.outline_focused',
            },
          },
        }}
        inputRef={refCurrentPage}
        type='number'
        InputProps={{
          inputProps: {
            style: {
              width: '40px',
              height: '24px',
              padding: '0',
              fontSize: '14px',
              textAlign: 'center',
              color: 'text.primary',
            },
          },
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setPageNumber(refCurrentPage.current.value);
          }
        }}
        onBlur={() => {
          setPageNumber(refCurrentPage.current.value);
        }}
      />
      <Typography
        variant='body2'
        component='span'
        sx={{
          flexGrow: 0,
          flexShrink: 0,
          color: 'text.primary',
        }}>
        / {totalPage}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '@media (max-width: 1023px)': {
            display: 'none',
          },
        }}>
        <DividerVertical />
        <IconButton
          sx={{ color: 'action.active', borderRadius: '4px', margin: '4px' }}
          onClick={() => {
            webPdfLib.getActionManager().Execute(ACTION_ID.PREV_PAGE);
            setCurrentPage(webPdfLib.getCurrentPageNumber());
          }}>
          <ArrowCircleUpIcon />
        </IconButton>
        <IconButton
          sx={{ color: 'action.active', borderRadius: '4px', margin: '4px' }}
          onClick={() => {
            webPdfLib.getActionManager().Execute(ACTION_ID.NEXT_PAGE);
            setCurrentPage(webPdfLib.getCurrentPageNumber());
          }}>
          <ArrowCircleDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Pagination;
