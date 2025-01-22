import { add, alter, create, drop, get, set } from 'ronin';
export default () => [
  create.model({
    slug: 'file',
    fields: [
      {
        slug: 'partOfProduct',
        target: 'product',
        required: true,
        type: 'link',
      },
      { slug: 'content', type: 'blob' },
      { slug: 'name', type: 'string' },
      { slug: 'description', type: 'string' },
    ],
  }),
  alter.model('user').alter.field('verified').to({ slug: 'verifiedCreator' }),
  alter.model('user').alter.field('description').to({ slug: 'bio' }),
  alter.model('user').alter.field('description').to({ slug: 'jwtAccessToken' }),
  alter.model('user').drop.field('clerkId'),
  create.model({
    slug: 'RONIN_TEMP_user',
    fields: [
      { slug: 'email', unique: true, required: true, type: 'string' },
      { slug: 'username', unique: true, required: true, type: 'string' },
      { slug: 'verifiedCreator', type: 'boolean' },
      { slug: 'bio', type: 'string' },
      { slug: 'jwtAccessToken', type: 'string' },
    ],
  }),
  add.RONIN_TEMP_user.to(() => get.user()),
  drop.model('user'),
  alter.model('RONIN_TEMP_user').to({ slug: 'user' }),
  alter
    .model('product')
    .create.field({
      slug: 'url',
      required: true,
      unique: true,
      type: 'string',
      model: { slug: 'product' },
    }),
  alter
    .model('product')
    .create.field({
      slug: 'priceInUsd',
      type: 'number',
      model: { slug: 'product' },
    }),
  alter
    .model('product')
    .create.field({
      slug: 'published',
      type: 'boolean',
      model: { slug: 'product' },
    }),
  alter
    .model('product')
    .create.field({
      slug: 'approved',
      type: 'boolean',
      model: { slug: 'product' },
    }),
  alter
    .model('product')
    .create.field({
      slug: 'featured',
      type: 'boolean',
      model: { slug: 'product' },
    }),
  alter
    .model('product')
    .create.field({
      slug: 'createdBy',
      target: 'user',
      required: true,
      type: 'link',
      model: { slug: 'product' },
    }),
  alter.model('product').drop.field('partOfProduct'),
  alter.model('product').drop.field('content'),
  create.model({
    slug: 'RONIN_TEMP_product',
    fields: [
      { slug: 'name', required: true, type: 'string' },
      { slug: 'url', required: true, unique: true, type: 'string' },
      { slug: 'description', type: 'string' },
      { slug: 'priceInUsd', type: 'number' },
      { slug: 'published', type: 'boolean' },
      { slug: 'approved', type: 'boolean' },
      { slug: 'featured', type: 'boolean' },
      { slug: 'createdBy', target: 'user', required: true, type: 'link' },
    ],
  }),
  add.RONIN_TEMP_product.to(() => get.product()),
  drop.model('product'),
  alter.model('RONIN_TEMP_product').to({ slug: 'product' }),
];
