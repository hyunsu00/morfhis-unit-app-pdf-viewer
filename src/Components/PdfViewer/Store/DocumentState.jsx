import create from 'zustand';

const DocumentState = create((set) => ({
  filename: '파일 이름',

  setFilename: (value) => {
    set((state) => {
      if (state.filename !== value) {
        return { filename: value };
      } else {
        return { filename: state.filename };
      }
    });
  },
}));

export default DocumentState;
