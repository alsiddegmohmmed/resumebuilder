// pages/api/auth.js
import { getSession } from 'next-auth/react';

const authHandler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.status(200).json({ user: session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

export default authHandler;