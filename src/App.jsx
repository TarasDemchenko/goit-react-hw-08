import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import LoginPage from './pages/loginPage/LoginPage';
import ContactsPage from './pages/contactsPage/ContactsPage';
import HomePage from './pages/homePage/HomePage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refresh } from './redux/auth/operations';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
