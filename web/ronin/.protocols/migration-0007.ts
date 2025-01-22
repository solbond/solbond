import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  alter
    .model('user')
    .create.field({
      slug: 'jwtAccessToken',
      type: 'string',
      model: { slug: 'user' },
    }),
  alter.model('user').drop.field('clerkId'),
  create.model({
    slug: 'RONIN_TEMP_user',
    fields: [
      { slug: 'email', unique: true, type: 'string' },
      { slug: 'verified', type: 'boolean' },
      { slug: 'username', type: 'string' },
      { slug: 'description', type: 'string' },
      { slug: 'jwtAccessToken', type: 'string' },
    ],
  }),
  add.RONIN_TEMP_user.to(() => get.user()),
  drop.model('user'),
  alter.model('RONIN_TEMP_user').to({ slug: 'user' }),
  create.model({
    slug: 'RONIN_TEMP_product',
    fields: [
      { slug: 'partOfProduct', target: 'product', type: 'link' },
      { slug: 'content', type: 'blob' },
      { slug: 'name', type: 'string' },
      { slug: 'description', type: 'string' },
    ],
  }),
  add.RONIN_TEMP_product.to(() => get.product()),
  drop.model('product'),
  alter.model('RONIN_TEMP_product').to({ slug: 'product' }),
];
