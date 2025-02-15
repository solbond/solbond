import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  alter.model('user').create.field({ slug: 'name', type: 'string' }),
  alter.model('user').create.field({ slug: 'image', type: 'string' }),
];
