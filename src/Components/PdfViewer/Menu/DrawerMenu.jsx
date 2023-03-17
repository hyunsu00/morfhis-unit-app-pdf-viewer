import React, { useEffect, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import _ from 'lodash';
import Utils from '../Utils';
import PdfViewerState from '../Store/PdfViewerState';

const DrawerMenu = ({ anchorEl, setAnchorEl, menuList, width, height }) => {
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
        popperPaperRef.current.style.display = 'none';
      } else {
        popperPaperRef.current.style.scale = zoomScale();
        popperPaperRef.current.style.left = window.visualViewport.offsetLeft + 'px';
        popperPaperRef.current.style.height = getDrawerHeight() + 'px';
        popperPaperRef.current.style.top = getOffsetBottom() - getDrawerHeight() * zoomScale() + 'px';
        popperPaperRef.current.style.display = 'flex';
      }
    }
  }, 100);

  const getDrawerHeight = () => {
    if (height === undefined) {
      height = React.Children.count(menuList.props.children) * parseInt(menuList.props.children[0].props.sx.height, 10) + 16;
    }
    if (height > winSize.height / 2) {
      height = winSize.height / 2;
    }

    return height;
  };

  const getDrawerWidth = () => {
    if (width !== undefined) {
      return width;
    }
    return winSize.width;
  };

  const getOffsetBottom = () => {
    return window.visualViewport.offsetTop + window.visualViewport.height;
  };

  return (
    <Drawer
      anchor={'bottom'}
      open={anchorEl !== null}
      onClose={() => {
        setAnchorEl(null);
      }}
      PaperProps={{
        ref: popperPaperRef,
        sx: {
          width: getDrawerWidth(),
          maxHeight: winSize.height / 2,
          backgroundColor: 'background.dialog',
          display: 'none',
          position: 'fixed',
          transformOrigin: '0 0',
          boxSizing: 'border-box',
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
    </Drawer>
  );
};

export default DrawerMenu;
