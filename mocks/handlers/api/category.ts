import { rest } from 'msw';

export const categoryHandlers = [
  rest.get('/api/category', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        _id: 'id',
        user: 'user_id',
        labels: [
          'transportation',
          'entertainment',
          'supermarket',
          'shopping',
          'water',
          'electricity',
          'telecommunication',
          'subscription',
          'education',
          'beauty',
          'health',
          'gift',
          'other',
        ],
        created_at: '2022-06-13T16:54:23.076Z',
        updated_at: '2022-07-06T17:08:24.335Z',
        __v: 0,
      }),
    );
  }),
];
