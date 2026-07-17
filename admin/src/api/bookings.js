import axiosClient from './axiosClient';

const BASE = '/admin/bookings/';

export const listBookings = (params = {}) =>
  axiosClient.get(BASE, { params }).then((res) => res.data);

export const getBooking = (id) => axiosClient.get(`${BASE}${id}/`).then((res) => res.data);

export const createBooking = (payload) => axiosClient.post(BASE, payload).then((res) => res.data);

export const updateBooking = (id, payload) =>
  axiosClient.patch(`${BASE}${id}/`, payload).then((res) => res.data);

export const deleteBooking = (id) => axiosClient.delete(`${BASE}${id}/`);
