const Utils = () => {
  const zoomScale = () => {
    return 1.0 / window.visualViewport.scale;
  };

  return { zoomScale };
};

export default Utils;
