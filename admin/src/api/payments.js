import axiosClient from './axiosClient';

const BASE = '/admin/payments/';

export const listPayments = (params = {}) => axiosClient.get(BASE, { params }).then((res) => res.data);

export const createPayment = (payload) => axiosClient.post(BASE, payload).then((res) => res.data);

export const updatePayment = (id, payload) =>
  axiosClient.patch(`${BASE}${id}/`, payload).then((res) => res.data);

export const deletePayment = (id) => axiosClient.delete(`${BASE}${id}/`);
