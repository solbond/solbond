import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  alter
    .model('user')
    .create.field({
      slug: 'verified',
      type: 'boolean',
      model: { slug: 'user' },
    }),
  alter
    .model('user')
    .create.field({
      slug: 'description',
      type: 'string',
      model: { slug: 'user' },
    }),
  create.model({
    slug: 'RONIN_TEMP_user',
    fields: [
      { slug: 'email', unique: true, type: 'string' },
      { slug: 'verified', type: 'boolean' },
      { slug: 'username', type: 'string' },
      { slug: 'description', type: 'string' },
      { slug: 'clerkId', unique: true, type: 'string' },
    ],
  }),
  add.RONIN_TEMP_user.to(() => get.user()),
  drop.model('user'),
  alter.model('RONIN_TEMP_user').to({ slug: 'user' }),
  alter
    .model('product')
    .create.field({
      slug: 'partOfProduct',
      target: 'product',
      type: 'link',
      model: { slug: 'product' },
    }),
  alter
    .model('product')
    .create.field({
      slug: 'content',
      type: 'blob',
      model: { slug: 'product' },
    }),
  alter.model('product').drop.field('createdBy'),
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
