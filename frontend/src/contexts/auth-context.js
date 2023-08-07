import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { useRouter } from 'next/navigation';
import PropTypes from "prop-types";
import loginService from "src/service/login-service";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  DASH_FILES: "DASH_FILES",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const router = useRouter();

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
      
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: "5e86809283e28b96d2d38537",
        name: "John Doe",
        email: "john.doe@test.com"
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (email, password) => {
    //call backend
    const data = { email: email, password: password };
    await loginService.login(data).then((response) => {
      if (response.message === "Logged in Successfully") {
        try {
          window.sessionStorage.setItem("authenticated", "true");
          sessionStorage.setItem('id', response.id);
          sessionStorage.setItem('userName', response.userName);
        } catch (err) {
          console.error(err);
        }
      } else {
        throw new Error(response.message);
      }
      const user = {
        id: "5e86809283e28b96d2d38537",
        name: "John Doe",
        email: "john.doe@test.com"
      };
  
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    });
  };

  const signUp = async (email, name, password) => {
    const data = { name: name, email: email, password: password };
    await loginService.signUp(data).then((response) => {
      if (response === "Success") {
        return true;
      } else {
        throw new Error(response.message);
      }
    });
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
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
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
