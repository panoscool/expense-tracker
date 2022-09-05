import { rest } from 'msw';

type UserRequestBody = {
  name: string;
  email: string;
  password: string;
};

export const userHandlers = [
  rest.post<UserRequestBody>('/api/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Ok' }));
  }),
];
