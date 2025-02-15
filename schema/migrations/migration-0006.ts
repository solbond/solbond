import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  alter.model('user').create.field({ slug: 'emailVerified', type: 'boolean' }),
];
