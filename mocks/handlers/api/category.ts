import { rest } from 'msw';

export const categoryHandlers = [
  rest.get('/api/category', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ labels: ['next', 'react', 'material'] }));
  }),
];
