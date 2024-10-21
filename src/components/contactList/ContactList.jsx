import { useDispatch, useSelector } from 'react-redux';
import Contact from '../contact/Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contacts/slice';
// import { selectNameFilter } from '../../redux/filtersSlice';
import {
  deleteContactThunk,
  fetchContacts,
} from '../../redux/contacts/operations';
import { useEffect } from 'react';

// import { useEffect } from 'react';
// import { fetchContacts } from '../../redux/contactsOps';

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  // const { items, loading, error } = useSelector((state) => state.contacts);

  const items = useSelector(selectFilteredContacts);
  // const searchData = useSelector(selectNameFilter);
  // const filteredData = items.filter(item =>
  //   item.name.toLowerCase().includes(searchData.toLowerCase())
  // );
  // const selectFilteredContacts = createSelector([
  //   selectContacts,
  //   selectNameFilter,
  // ], (items, searchData) => {
  //   items.filter(item =>
  //     item.name.toLowerCase().includes(searchData.toLowerCase())
  //   );
  // });
  // useEffect(() => {
  //   dispatch(fetchContacts);
  // }, [dispatch]);

  return (
    <>
      {/* {loading && <h2>Loading...</h2>}
      {error && <h2>Error</h2>} */}
      <ul className={css.con_list}>
        {items.map(({ id, name, number }) => (
          <Contact
            key={id}
            name={name}
            number={number}
            onDelete={() => dispatch(deleteContactThunk(id))}
          />
        ))}
      </ul>
    </>
  );
};

export default ContactList;
