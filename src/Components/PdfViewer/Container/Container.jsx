import Main from '../Main/Main';

const Container = ({ sidebar, header, content, propertyBar }) => {
  return (
    <>
      {sidebar}
      <Main header={header} content={content} />
      {propertyBar}
    </>
  );
};

export default Container;
