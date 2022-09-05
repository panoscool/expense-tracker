import { rest } from 'msw';

export const accountHandlers = [
  rest.get('/api/account', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          _id: 'id',
          user: 'user_id',
          name: 'Personal',
          users: [
            {
              _id: 'user_id',
              name: 'User',
              email: 'user@email.com',
              image: 'https://source.unsplash.com/random/640x640',
            },
          ],
          description: 'Personal account description',
          currency: 'EUR',
          created_at: '2022-07-27T10:31:12.879Z',
          updated_at: '2022-07-27T10:31:12.879Z',
          __v: 0,
        },
      ]),
    );
  }),
];
