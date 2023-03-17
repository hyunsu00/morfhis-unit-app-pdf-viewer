import React, { useEffect, useRef } from 'react';
import Popover from '@mui/material/Popover';
import _ from 'lodash';
import Utils from '../Utils';
import PdfViewerState from '../Store/PdfViewerState';

const PopoverMenu = ({ anchorEl, setAnchorEl, anchorOrigin, transformOrigin, menuList, width, height, sx }) => {
  const { zoomScale } = Utils();
  const { winSize } = PdfViewerState();
  const popperPaperRef = useRef(null);

  useEffect(() => {
    setAnchorEl(null);

    // eslint-disable-next-line
  }, [winSize]);

  useEffect(() => {
    lazyAdjustStyle();

    // eslint-disable-next-line
  }, [anchorEl]);

  const lazyAdjustStyle = _.debounce(() => {
    if (popperPaperRef?.current !== null) {
      if (anchorEl === null) {
        popperPaperRef.current.style.visibility = 'hidden';
      } else {
        popperPaperRef.current.style.scale = zoomScale();
        popperPaperRef.current.style.visibility = 'visible';
        if (transformOrigin.horizontal === 'left' && anchorOrigin.horizontal === 'left' && transformOrigin.vertical === 'bottom' && anchorOrigin.vertical === 'top') {
          // 시트 리스트 뷰가 어긋난다.
          let transformOrigin = popperPaperRef.current.style.transformOrigin.split(' ');
          popperPaperRef.current.style.transformOrigin = '0px ' + transformOrigin[1];
          let newLeft = window.visualViewport.offsetLeft + anchorEl.offsetLeft * zoomScale();
          popperPaperRef.current.style.left = newLeft + 'px';
        }
      }
    }
  }, 100);

  const getPopoverHeight = () => {
    if (height === undefined) {
      height = React.Children.count(menuList.props.children) * parseInt(menuList.props.children[0].props.sx.height, 10) + 16;
    }
    if (height > 400 / 2) {
      height = 400;
    }

    return height;
  };

  const getPopoverWidth = () => {
    if (width !== undefined) {
      return width;
    }
    return popperPaperRef.current?.offsetWidth;
  };

  return (
    <Popover
      open={anchorEl !== null}
      anchorEl={anchorEl}
      onClose={() => {
        setAnchorEl(null);
      }}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      sx={{
        maxHeight: '400px',
      }}
      PaperProps={{
        ref: popperPaperRef,
        sx: {
          visibility: 'hidden',
          backgroundColor: 'background.dialog',
          width: getPopoverWidth(),
          height: getPopoverHeight(),
          ...sx,
        },
      }}
      onTouchMove={() => {
        setAnchorEl(null);
      }}
      onTouchStart={(event) => {
        if (event.touches.length > 1) {
          setAnchorEl(null);
        }
      }}>
      {menuList}
    </Popover>
  );
};

export default PopoverMenu;
