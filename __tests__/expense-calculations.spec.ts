import { getTotalExpenses, getTotalUsers } from '../lib/utils/expense-calculations';

describe('expense calculations', () => {
  describe('getTotalExpenses', () => {
    it('should return the total amount', () => {
      const expenses = [
        {
          _id: '1',
          date: new Date(),
          account: '1',
          category: '1',
          amount: 1,
          details: '1',
          description: '1',
          user: {
            _id: '1',
            name: '1',
            email: '1',
          },
        },
        {
          _id: '2',
          date: new Date(),
          account: '2',
          category: '2',
          amount: 2,
          details: '2',
          description: '2',
          user: {
            _id: '2',
            name: '2',
            email: '2',
          },
        },
      ] as any;
      expect(getTotalExpenses(expenses)).toBe(3);
    });

    it('should return 0 if no expenses are passed', () => {
      expect(getTotalExpenses([])).toBe(0);
    });
  });

  describe('getTotalUsers', () => {
    it('should return the total of 3 unique users', () => {
      const expenses = [
        {
          _id: '1',
          date: new Date(),
          account: '1',
          category: '1',
          amount: 1,
          details: '1',
          description: '1',
          user: {
            _id: '1',
            name: '1',
            email: '1',
          },
        },
        {
          _id: '2',
          date: new Date(),
          account: '2',
          category: '2',
          amount: 2,
          details: '2',
          description: '2',
          user: {
            _id: '2',
            name: '2',
            email: '2',
          },
        },
        {
          _id: '3',
          date: new Date(),
          account: '3',
          category: '3',
          amount: 3,
          details: '3',
          description: '3',
          user: {
            _id: '3',
            name: '3',
            email: '3',
          },
        },
      ] as any;
      expect(getTotalUsers(expenses)).toBe(3);
    });

    it('should return the total of 2 unique users', () => {
      const expenses = [
        {
          _id: '1',
          date: new Date(),
          account: '1',
          category: '1',
          amount: 1,
          details: '1',
          description: '1',
          user: {
            _id: '1',
            name: '1',
            email: '1',
          },
        },
        {
          _id: '2',
          date: new Date(),
          account: '2',
          category: '2',
          amount: 2,
          details: '2',
          description: '2',
          user: {
            _id: '2',
            name: '2',
            email: '2',
          },
        },
        {
          _id: '3',
          date: new Date(),
          account: '3',
          category: '3',
          amount: 3,
          details: '3',
          description: '3',
          user: {
            _id: '2',
            name: '2',
            email: '2',
          },
        },
      ] as any;
      expect(getTotalUsers(expenses)).toBe(2);
    });

    it('should return 0 if no expenses are passed', () => {
      expect(getTotalUsers([])).toBe(0);
    });
  });
});
