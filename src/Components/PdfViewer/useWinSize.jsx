import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

export default function useWinSize() {
  const [winSize, setWinSize] = useState(undefined);
  const refWinSize = useRef({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = _.debounce(() => {
      const newWinSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      if (refWinSize?.current?.width !== newWinSize?.width || refWinSize?.current?.height !== newWinSize?.height) {
        refWinSize.current.width = newWinSize.width;
        refWinSize.current.height = newWinSize.height;
        handleResize();
      } else {
        setWinSize(newWinSize);
      }
    }, 500);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return winSize;
}
