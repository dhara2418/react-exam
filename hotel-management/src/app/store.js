import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../features/roomSlice';
import reservationReducer from '../features/reservationSlice';

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    reservations: reservationReducer,
  },
});