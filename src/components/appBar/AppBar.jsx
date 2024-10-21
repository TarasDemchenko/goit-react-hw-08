import { useDispatch, useSelector } from 'react-redux';
import s from './AppBar.module.css';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';

const AppBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <div className={s.body}>
        <div>
          <NavLink className={s.navlink} to="/">
            Nome
          </NavLink>
        </div>
        {isLoggedIn && <div>Hello {user.name}</div>}

        <div className={s.nav}>
          <NavLink className={s.navlink} to="/contacts">
            Contacts
          </NavLink>
          {!isLoggedIn && (
            <>
              <NavLink className={s.navlink} to="/login">
                Login
              </NavLink>
              <NavLink className={s.navlink} to="/register">
                Register
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <button onClick={() => dispatch(logout())}>Logout</button>
          )}
        </div>
      </div>
    </>
  );
};

export default AppBar;
