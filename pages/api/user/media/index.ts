import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../../lib/config/cloudinary';
import dbConnect from '../../../../lib/config/db-connect';
import User from '../../../../lib/models/user';
import { getDecodedUserId, hasAccess, authenticated } from '../../helpers';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const { file_string } = req.body;

    const userId = (await getDecodedUserId(req, res)) as string;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const authorized = hasAccess(userId, user?._id);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    const uploaded = await cloudinary.uploader.upload(file_string, {
      resource_type: 'image',
      format: 'webp',
      folder: 'user_images',
      public_id: `${userId}`,
      overwrite: true,
      // crop the image to 640x640 pixels
      eager: [
        {
          width: 640,
          height: 640,
          crop: 'thumb',
          gravity: 'face',
        },
      ],
    });

    if (!uploaded) {
      return res.status(400).send({ error: 'Could not upload image' });
    }

    await user.updateOne({ image: uploaded.eager[0]?.secure_url || uploaded.secure_url });

    res.status(200).json({ data: uploaded, message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const deleteImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const userId = (await getDecodedUserId(req, res)) as string;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const authorized = hasAccess(userId, user?._id);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    await cloudinary.uploader.destroy(`user_images/${userId}`);

    await user.updateOne({ image: null });

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      return await uploadImage(req, res);
    case 'DELETE':
      return await deleteImage(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
