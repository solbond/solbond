import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  create.model({
    slug: 'account',
    fields: [
      { slug: 'userId', target: 'user', required: true, type: 'link' },
      { slug: 'accountId', type: 'string' },
      { slug: 'providerId', type: 'string' },
      { slug: 'accessToken', type: 'string' },
      { slug: 'refreshToken', type: 'string' },
      { slug: 'accessTokenExpiresAt', type: 'date' },
      { slug: 'refreshTokenExpiresAt', type: 'date' },
      { slug: 'scope', type: 'string' },
      { slug: 'idToken', type: 'string' },
      { slug: 'password', type: 'string' },
      { slug: 'createdAt', type: 'date' },
      { slug: 'updatedAt', type: 'date' },
    ],
  }),
  create.model({
    slug: 'session',
    fields: [
      { slug: 'userId', target: 'user', required: true, type: 'link' },
      { slug: 'token', type: 'string' },
      { slug: 'expiresAt', type: 'date' },
      { slug: 'ipAddress', type: 'string' },
      { slug: 'userAgent', type: 'string' },
      { slug: 'createdAt', type: 'date' },
      { slug: 'updatedAt', type: 'date' },
    ],
  }),
  create.model({
    slug: 'verification',
    fields: [
      { slug: 'identifier', type: 'string' },
      { slug: 'value', type: 'string' },
      { slug: 'expiresAt', type: 'date' },
      { slug: 'createdAt', type: 'date' },
      { slug: 'updatedAt', type: 'date' },
    ],
  }),
];
