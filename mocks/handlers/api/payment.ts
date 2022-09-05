import { rest } from 'msw';

export const paymentHandlers = [
  rest.get('/api/payment', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Ok' }));
  }),
];
