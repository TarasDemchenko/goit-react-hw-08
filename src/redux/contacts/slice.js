import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/slice';
export const selectContacts = state => state.contacts.items;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectIsError = state => state.contacts.isError;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (items, name) => {
    console.log('Calculating visible tasks');
    return items.filter(item =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }
);
