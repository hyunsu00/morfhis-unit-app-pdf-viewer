import create from 'zustand';

const DialogState = create((set) => ({
  protectCopyDialogOpen: false,
  protectCopyMessage: undefined,

  passwordDialogOpen: false,
  passwordDialogErrorCode: undefined,
  passwordDialogPasswordInputCount: 0,
  passwordDialogPassword: undefined,

  downloadDialogOpen: false,
  downloadDialogDownloadType: 'original',

  defaultDialogOpen: false,
  defaultDialogTitle: undefined,
  defaultDialogMessage: undefined,

  errorDialogOpen: false,
  errorDialogCode: undefined,

  setProtectCopyDialogOpen: (value) => {
    set((state) => {
      if (state.protectCopyDialogOpen !== value) {
        return { protectCopyDialogOpen: value };
      } else {
        return { protectCopyDialogOpen: state.protectCopyDialogOpen };
      }
    });
  },

  setPasswordDialogOpen: (value) => {
    set((state) => {
      if (state.passwordDialogOpen !== value) {
        return { passwordDialogOpen: value };
      } else {
        return { passwordDialogOpen: state.passwordDialogOpen };
      }
    });
  },

  setDownloadDialogOpen: (value) => {
    set((state) => {
      if (state.downloadDialogOpen !== value) {
        return { downloadDialogOpen: value };
      } else {
        return { downloadDialogOpen: state.downloadDialogOpen };
      }
    });
  },

  setProtectCopyMessage: (value) => {
    set((state) => {
      if (state.protectCopyMessage !== value) {
        return { protectCopyMessage: value };
      } else {
        return { protectCopyMessage: state.protectCopyMessage };
      }
    });
  },

  setDownloadDialogDownloadType: (value) => {
    set((state) => {
      if (state.downloadDialogDownloadType !== value) {
        return { downloadDialogDownloadType: value };
      } else {
        return { downloadDialogDownloadType: state.downloadDialogDownloadType };
      }
    });
  },

  setPasswordDialogErrorCode: (value) => {
    set((state) => {
      if (state.passwordDialogErrorCode !== value) {
        return { passwordDialogErrorCode: value };
      } else {
        return { passwordDialogErrorCode: state.passwordDialogErrorCode };
      }
    });
  },

  setPasswordDialogPassword: (value) => {
    set((state) => {
      if (state.passwordDialogPassword !== value) {
        return { passwordDialogPassword: value };
      } else {
        return { passwordDialogPassword: state.passwordDialogPassword };
      }
    });
  },

  setPasswordDialogPasswordInputCount: (value) => {
    set((state) => {
      if (state.passwordDialogPasswordInputCount !== value) {
        return { passwordDialogPasswordInputCount: value };
      } else {
        return { passwordDialogPasswordInputCount: state.passwordDialogPasswordInputCount };
      }
    });
  },

  setDefaultDialogOpen: (value) => {
    set((state) => {
      if (state.defaultDialogOpen !== value) {
        return { defaultDialogOpen: value };
      } else {
        return { defaultDialogOpen: state.defaultDialogOpen };
      }
    });
  },

  setDefaultDialogCode: (value) => {
    set((state) => {
      if (state.defaultDialogCode !== value) {
        return { defaultDialogCode: value };
      } else {
        return { defaultDialogCode: state.defaultDialogCode };
      }
    });
  },

  setDefaultDialogTitle: (value) => {
    set((state) => {
      if (state.defaultDialogTitle !== value) {
        return { defaultDialogTitle: value };
      } else {
        return { defaultDialogTitle: state.defaultDialogTitle };
      }
    });
  },

  openDefaultDialog: (defaultDialogTitle, defaultDialogMessage) =>
    set((state) => ({
      defaultDialogOpen: (state.defaultDialogOpen = true),
      defaultDialogTitle: (state.defaultDialogTitle = defaultDialogTitle),
      defaultDialogMessage: (state.defaultDialogMessage = defaultDialogMessage),
    })),

  setErrorDialogOpen: (value) => {
    set((state) => {
      if (state.errorDialogOpen !== value) {
        return { errorDialogOpen: value };
      } else {
        return { errorDialogOpen: state.errorDialogOpen };
      }
    });
  },

  setErrorDialogCode: (value) => {
    set((state) => {
      if (state.errorDialogCode !== value) {
        return { errorDialogCode: value };
      } else {
        return { errorDialogCode: state.errorDialogCode };
      }
    });
  },

  openErrorDialog: (defaultDialogTitle, defaultDialogMessage, errorDialogCode) =>
    set((state) => ({
      errorDialogOpen: (state.errorDialogOpen = true),
      defaultDialogTitle: (state.defaultDialogTitle = defaultDialogTitle),
      defaultDialogMessage: (state.defaultDialogMessage = defaultDialogMessage),
      errorDialogCode: (state.errorDialogCode = errorDialogCode),
    })),
}));

export default DialogState;
