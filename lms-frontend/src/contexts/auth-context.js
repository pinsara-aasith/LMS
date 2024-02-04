import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  authData: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const authData = action.payload;

    if (authData) {
      axios.defaults.headers.common = {
        'Authorization': `Bearer ${authData.token}`,
        'Accept': 'application/json'
      };

    }

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        authData
          ? ({
            isAuthenticated: true,
            isLoading: false,
            authData
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const authData = action.payload;

    window.sessionStorage.setItem('authData', JSON.stringify(authData));

    axios.defaults.headers.common = {
      'Authorization': `Bearer ${authData.token}`,
      'Accept': 'application/json'
    };

    return {
      ...state,
      isAuthenticated: true,
      authData
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      authData: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = !!window.sessionStorage.getItem('authData');

      if (isAuthenticated) {
        const authData = JSON.parse(window.sessionStorage.getItem('authData'));
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: authData
        });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }
    } catch (err) {
      window.sessionStorage.removeItem('authData')
      dispatch({
        type: HANDLERS.INITIALIZE
      });
      console.error(err);
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    // const user = {
    //   id: '5e86809283e28b96d2d38537',
    //   avatar: '/assets/avatars/avatar-anika-visser.png',
    //   name: 'Anika Visser',
    //   email: 'anika.vissergmail.com'
    // };

    // dispatch({
    //   type: HANDLERS.SIGN_IN,
    //   payload: user
    // });
  };

  const signIn = async (email, password) => {

    try {
      let { data, status } = await axios.post(`${BACKEND_URL}/login`, { email, password })
      if (data.status != 'success') {
        throw new Error("Please check the password again!")
      }

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: data.data
      });

      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
