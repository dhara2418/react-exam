import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const makeReservation = createAsyncThunk('reservations/make', async (data) => {
  const docRef = await addDoc(collection(db, "reservations"), data);
  return { id: docRef.id, ...data };
});

export const fetchReservations = createAsyncThunk('reservations/fetchAll', async () => {
  const snapshot = await getDocs(collection(db, "reservations"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(makeReservation.fulfilled, (state, action) => { state.list.push(action.payload); });
  }
});
export default reservationSlice.reducer;