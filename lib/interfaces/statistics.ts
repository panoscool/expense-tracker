export type DayMonth = { _id: string; count: number; total_amount: number };

export type Week = { _id: { week: number; year: number }; count: number; total_amount: number };

export type Quarter = { _id: { quarter: number; year: number }; count: number; total_amount: number };

export type AccountStatistic = DayMonth | Week | Quarter;

export type CategoryStatistic = { _id: { date: string; category: string }; count: number; total_amount: number };
