import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  create.model({
    slug: 'user',
    fields: [
      { slug: 'email', type: 'string' },
      { slug: 'clerkId', type: 'string' },
      { slug: 'username', type: 'string' },
    ],
  }),
  create.model({
    slug: 'product',
    fields: [
      { slug: 'name', type: 'string' },
      { slug: 'description', type: 'string' },
      { slug: 'createdBy', target: 'user', type: 'link' },
    ],
  }),
];
