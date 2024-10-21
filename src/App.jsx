import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import LoginPage from './pages/loginPage/LoginPage';
import ContactsPage from './pages/contactsPage/ContactsPage';
import HomePage from './pages/homePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refresh } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';
import { PrivateRoute } from './components/PrivateRoute';
import { RestrictedRoute } from './components/RestrictedRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);
  const isRefreshing = useSelector(selectIsRefreshing);
  return isRefreshing ? null : (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
