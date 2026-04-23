import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// Data fetch karne ka thunk
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const querySnapshot = await getDocs(collection(db, "rooms"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const roomSlice = createSlice({
  name: 'rooms',
  initialState: { items: [], status: 'idle', filter: 'All', sortBy: 'none' },
  reducers: {
    setFilter: (state, action) => { state.filter = action.payload; },
    setSort: (state, action) => { state.sortBy = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  }
});

export const { setFilter, setSort } = roomSlice.actions;
export default roomSlice.reducer;