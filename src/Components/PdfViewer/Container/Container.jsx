import Main from '../Main/Main';

const Container = ({ header, content, sidebar }) => {
  return (
    <>
      <Main header={header} content={content} />
      {sidebar}
    </>
  );
};

export default Container;
