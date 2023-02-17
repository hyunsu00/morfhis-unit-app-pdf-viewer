import create from 'zustand';

const PdfViewerState = create((set) => ({
  locale: undefined,

  setLocale: (value) => {
    set((state) => {
      if (state.locale !== value) {
        return { locale: value };
      } else {
        return { locale: state.locale };
      }
    });
  },
}));

export default PdfViewerState;
