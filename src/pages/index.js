// pages/index.js
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGuestLogin = () => {
    router.push('/resume?guest=true');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Interactive Resume Builder
      </Typography>
      {session ? (
        <div>
          <Typography variant="h6">
            Signed in as {session.user.email}
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => signOut()}>
            Sign Out
          </Button>
          <Link href="/resume">
            <Button variant="contained" color="primary" style={{ marginLeft: 16 }}>
              Build Resume
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <Button variant="contained" color="primary" onClick={() => signIn('google')}>
            Sign In with Google
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGuestLogin}
            style={{ marginLeft: 16 }}
          >
            Enter as Guest
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Home;
