import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  alter.model('user').create.field({ slug: 'createdAt', type: 'date' }),
  alter.model('user').create.field({ slug: 'updatedAt', type: 'date' }),
];
