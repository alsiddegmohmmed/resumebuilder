// utils/withAuth.js
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isGuest = router.query.guest === 'true';

    useEffect(() => {
      if (status === 'unauthenticated' && !isGuest) {
        signIn();
      }
    }, [status, isGuest]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    return session || isGuest ? <WrappedComponent {...props} /> : null;
  };

  AuthenticatedComponent.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return AuthenticatedComponent;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;