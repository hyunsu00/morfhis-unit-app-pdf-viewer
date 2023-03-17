import create from 'zustand';

const BackdropState = create((set) => ({
  openState: false,
  clickClose: false,
  delay: 0,

  setOpenState: (value) =>
    set((state) => ({
      openState: (state.openState = value),
    })),

  backdropOpen: () =>
    set((state) => ({
      openState: (state.openState = true),
    })),

  backdropClose: (delay) =>
    set((state) => ({
      openState: (state.openState = false),
      delay: (state.delay = delay),
    })),
}));

export default BackdropState;
