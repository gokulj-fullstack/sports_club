import axiosClient from './axiosClient';

const BASE = '/admin/members/';

export const listMembers = (params = {}) => axiosClient.get(BASE, { params }).then((res) => res.data);

export const createMember = (payload) => axiosClient.post(BASE, payload).then((res) => res.data);

export const updateMember = (id, payload) =>
  axiosClient.patch(`${BASE}${id}/`, payload).then((res) => res.data);

export const deleteMember = (id) => axiosClient.delete(`${BASE}${id}/`);
