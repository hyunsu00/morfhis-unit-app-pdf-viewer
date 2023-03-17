import Main from '../Main/Main';

const Container = ({ header, content, propertyBar }) => {
  return (
    <>
      <Main header={header} content={content} />
      {propertyBar}
    </>
  );
};

export default Container;
