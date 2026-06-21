import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CardItem = {
  id: number;
  title: string;
  description: string;
};

type SelectedItemsState = {
  items: Record<number, CardItem>;
};

const initialState: SelectedItemsState = {
  items: {},
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<CardItem>) {
      const item = action.payload;
      if (state.items[item.id]) {
        delete state.items[item.id];
      } else {
        state.items[item.id] = item;
      }
    },
    unselectAll(state) {
      state.items = {};
    },
  },
});

export const { toggleItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
