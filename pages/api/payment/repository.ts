import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';
import PaymentModel from '../../../lib/models/payment';

interface PaymentCreate {
  account: string;
  period: string;
  settled: boolean;
  giving_users: string[];
  receiving_users: string[];
  created_by: string;
  updated_by: string;
}

interface PaymentUpdate {
  giving_users: string[];
  receiving_users: string[];
  updated_by: string;
}

export async function createPayment(payment: PaymentCreate) {
  const period = format(parseISO(payment.period), 'MMMM-yyyy');

  return await PaymentModel.create({
    _id: uuidv4(),
    account: payment.account,
    period: period,
    settled: payment.settled,
    giving_users: payment.giving_users,
    receiving_users: payment.receiving_users,
    created_by: payment.created_by,
    updated_by: payment.updated_by,
  });
}

export async function updatePaymentById(id: string, payment: PaymentUpdate) {
  return await PaymentModel.updateOne(
    { _id: { $eq: id } },
    {
      $set: {
        giving_users: payment.giving_users,
        receiving_users: payment.receiving_users,
        updated_by: payment.updated_by,
      },
    },
  );
}

export async function getPaymentById(id: string) {
  return await PaymentModel.findById(id);
}

export async function getPaymentByAccountIdAndPeriod(accountId: string, period: string) {
  const date = format(parseISO(period), 'MMMM-yyyy');

  return await PaymentModel.findOne({
    account: { $eq: accountId },
    period: { $eq: date },
  });
}

export async function getPaymentsPopulated(filters: { account_id: string; period: string }) {
  const { account_id, period } = filters;

  let query: Record<string, unknown> = { account: { $eq: account_id } };

  if (period) {
    query.period = { $eq: format(parseISO(period), 'MMMM-yyyy') };
  }

  return await PaymentModel.find(query)
    .populate({
      path: 'giving_users',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name email image',
      },
    })
    .populate({
      path: 'receiving_users',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name email image',
      },
    });
}

export async function getPaymentPopulatedById(id: string) {
  return await PaymentModel.findById(id)
    .populate({
      path: 'giving_users',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name email',
      },
    })
    .populate({
      path: 'receiving_users',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name email',
      },
    });
}

export async function getPaymentPopulatedByAccountAndPeriod(filters: { id: string; period: string }) {
  const { id, period } = filters;

  let query: Record<string, unknown> = { account: { $eq: id } };

  if (period) {
    query.period = { $eq: format(parseISO(period), 'MMMM-yyyy') };
  }

  return await PaymentModel.findOne(query)
    .populate({
      path: 'giving_users',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name email image',
      },
    })
    .populate({
      path: 'receiving_users',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name email image',
      },
    });
}
