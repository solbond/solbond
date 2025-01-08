import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  alter
    .model('user')
    .create.field({
      slug: 'clerkId',
      unique: true,
      type: 'string',
      model: { slug: 'user' },
    }),
  create.model({
    slug: 'RONIN_TEMP_user',
    fields: [
      { slug: 'email', unique: true, type: 'string' },
      { slug: 'clerkId', unique: true, type: 'string' },
      { slug: 'username', type: 'string' },
    ],
  }),
  add.RONIN_TEMP_user.to(() => get.user()),
  drop.model('user'),
  alter.model('RONIN_TEMP_user').to({ slug: 'user' }),
  create.model({
    slug: 'RONIN_TEMP_product',
    fields: [
      { slug: 'name', type: 'string' },
      { slug: 'description', type: 'string' },
      { slug: 'createdBy', target: 'user', type: 'link' },
    ],
  }),
  add.RONIN_TEMP_product.to(() => get.product()),
  drop.model('product'),
  alter.model('RONIN_TEMP_product').to({ slug: 'product' }),
];
