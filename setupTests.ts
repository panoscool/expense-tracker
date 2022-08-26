import '@testing-library/jest-dom/extend-expect';

import { mswServer } from './mocks/mswServer';

beforeAll(() => {
  mswServer.listen();
});

afterEach(() => {
  mswServer.resetHandlers();
});

afterAll(() => {
  mswServer.close();
});
