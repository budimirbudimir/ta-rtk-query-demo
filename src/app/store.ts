import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'
import { dogsSlice } from '../features/dogs/dogsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [dogsSlice.reducerPath]: dogsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(dogsSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;