import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface state {
  navbar: {
    isBigNavbar: boolean | null;
    big: {
      isOpen: boolean;
    };
    small: {
      isSettingsOpen: boolean;
    }
  }
}

const initialState: state = {
  navbar: {
    isBigNavbar: null,
    big: {
      isOpen: false,
    },
    small: {
      isSettingsOpen : false,
    }
  }
}

const uiStateSlice = createSlice({
  name: 'uiState',
  initialState: initialState,
  reducers: {
    setIsBigNavbar(state, {payload} : PayloadAction<boolean>) {
      state.navbar.isBigNavbar = payload;
      if (state.navbar.small.isSettingsOpen) {
        state.navbar.small.isSettingsOpen = false;
      }
    },
    setIsOpen(state, {payload} : PayloadAction<boolean>) {
      state.navbar.big.isOpen = payload;
    },
    setIsSettingsOpen ( state, {payload}: PayloadAction<boolean>) {
      state.navbar.small.isSettingsOpen = payload;
    }
  }

});


export const { actions } = uiStateSlice;
export default uiStateSlice.reducer;
