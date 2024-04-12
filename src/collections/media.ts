import { User } from '../payload-types';
import { Access, CollectionConfig } from 'payload/types';

const isAdminOrHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user?.role === 'admin') return true;
    return {
      user: {
        equals: user.id,
      },
    };
  };

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeChange: [({ req, data }) => ({ ...data, user: req.user?.id })],
  },
  admin: {
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.get('referer') || '';

      if (!req.user || !referer?.includes('sell')) {
        return true;
      }

      return await isAdminOrHasAccessToImages()({ req });
    },
    update: isAdminOrHasAccessToImages(),
    delete: isAdminOrHasAccessToImages(),
  },
  upload: {
    staticDir: 'uploads/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
};
