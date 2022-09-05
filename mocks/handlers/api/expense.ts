import { rest } from 'msw';

export const expenseHandlers = [
  rest.get('/api/expense', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Ok' }));
  }),
];
