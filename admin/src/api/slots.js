import axiosClient from './axiosClient';

const BASE = '/admin/slots/';

export const listSlots = (params = {}) => axiosClient.get(BASE, { params }).then((res) => res.data);

export const createSlot = (payload) => axiosClient.post(BASE, payload).then((res) => res.data);

export const updateSlot = (id, payload) =>
  axiosClient.patch(`${BASE}${id}/`, payload).then((res) => res.data);

export const deleteSlot = (id) => axiosClient.delete(`${BASE}${id}/`);

export const toggleSlot = (id, isActive) => updateSlot(id, { is_active: isActive });
