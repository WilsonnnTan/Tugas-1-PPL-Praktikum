import prisma from '@/lib/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createAuthMiddleware } from 'better-auth/api';
import { bearer, openAPI } from 'better-auth/plugins';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI(), bearer()],
  hooks: {
    // delete set-cookie header to avoid NULL origin on Postman
    after: createAuthMiddleware(async (ctx) => {
      const responseHeaders = ctx.context.responseHeaders;
      responseHeaders?.delete('set-cookie');
    }),
  },
});
