import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../reducer';
import { loadCustomerID, saveCustomerID } from '../localstorage/localstorage'; 

const preloadedState = {
  customerID: loadCustomerID() || { value: 0 },
};

const store = configureStore({
  reducer: {
    customerID: customerReducer, 
  },
  preloadedState, 
});


store.subscribe(() => {
  saveCustomerID(store.getState().customerID);
});

export default store;