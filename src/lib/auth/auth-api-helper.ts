import { headers } from 'next/headers';

import { auth } from './auth';

export class UnauthorizedError extends Error {
  status: number;
  constructor(message = 'Unauthorized') {
    super(message);
    this.status = 401;
    this.name = 'UnauthorizedError';
  }
}

export async function requireUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    throw new UnauthorizedError();
  }

  return session.user.id;
}
