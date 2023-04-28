import create from 'zustand';

const PdfViewerState = create((set) => ({
  winSize: undefined,
  locale: undefined,
  viewportResizing: false,
  touchScreen: undefined,
  headerZIndex: 1000,
  visibleHeader: true,
  headerHeight: 80,
  visibleSidebar: true,
  sidebarWidth: 260,
  selectTheme: undefined,
  undoRedoLength: { undo: 0, redo: 0 },

  setWinSize: (value) => {
    set((state) => {
      if (state.winSize !== value) {
        return { winSize: value };
      } else {
        return { winSize: state.winSize };
      }
    });
  },

  setLocale: (value) => {
    set((state) => {
      if (state.locale !== value) {
        return { locale: value };
      } else {
        return { locale: state.locale };
      }
    });
  },

  setViewportResizing: (value) => {
    set((state) => {
      if (value === null || value !== false) {
        value = true;
      }
      if (state.viewportResizing !== value) {
        return { viewportResizing: value };
      } else {
        return { viewportResizing: state.viewportResizing };
      }
    });
  },

  setTouchScreen: (value) => {
    set((state) => {
      if (value === null || value !== false) {
        value = true;
      }
      if (state.touchScreen !== value) {
        return { touchScreen: value };
      } else {
        return { touchScreen: state.touchScreen };
      }
    });
  },

  setHeaderZIndex: (value) => {
    set((state) => {
      if (state.headerZIndex !== value) {
        return { headerZIndex: value };
      } else {
        return { headerZIndex: state.headerZIndex };
      }
    });
  },

  setVisibleSidebar: (value) => {
    set((state) => {
      if (value === null || value !== false) {
        value = true;
      }
      if (state.visibleSidebar !== value) {
        return { visibleSidebar: value };
      } else {
        return { visibleSidebar: state.visibleSidebar };
      }
    });
  },

  setSelectTheme: (value) => {
    set((state) => {
      if (value === null || value === undefined || value !== 'dark') {
        value = 'light';
      }
      if (state.selectTheme !== value) {
        return { selectTheme: value };
      } else {
        return { selectTheme: state.selectTheme };
      }
    });
  },

  setUndoRedoLength: (value) => {
    set((state) => {
      if (state.undoRedoLength !== value) {
        return { undoRedoLength: value };
      } else {
        return { undoRedoLength: state.undoRedoLength };
      }
    });
  }
}));

export default PdfViewerState;
