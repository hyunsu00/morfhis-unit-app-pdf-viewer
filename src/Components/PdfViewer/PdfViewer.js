import React from 'react';
import Container from './Container/Container';
import Header from './Header/Header';
import Content from './Content/Content';

const PdfViewer = () => {
  return (
    <>
      <Container header={<Header />} content={<Content />} />
    </>
  );
};

export default PdfViewer;
