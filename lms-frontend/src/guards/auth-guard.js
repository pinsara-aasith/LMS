import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated, authData } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }

      ignore.current = true;

      if (!isAuthenticated) {
        console.log('Not authenticated, redirecting');
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);

        return;

      }
      if (router.pathname.startsWith("/student-panel") && authData?.user.role === 'student') {
        setChecked(true);
        return;
      }

      if (router.pathname.startsWith("/lecturer-panel") && authData?.user.role === 'lecturer') {
        setChecked(true);
        return;
      }

      if (router.pathname.startsWith("/admin-panel") && authData?.user.role === 'admin') {
        setChecked(true);
        return;
      }

      if (router.pathname.startsWith("/")) {
        window.location = `/${authData?.user.role}-panel`;
        return;
      }

      if (router.pathname.startsWith("/admin-panel") && authData?.user.role !== 'admin') {
        router.push({ pathname: '/404' })
        setChecked(true)
        return;
      }

      if (router.pathname.startsWith("/lecturer-panel") && authData?.user.role !== 'lecturer') {
        router.push({ pathname: '/404' })
        return;
      }

      if (router.pathname.startsWith("/student-panel") && authData?.user.role !== 'student') {
        router.push({ pathname: '/404' })
        return;
      }


      setChecked(true);
    },
    [router.isReady, router.pathname]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
