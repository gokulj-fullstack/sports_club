import axiosClient from './axiosClient';

const BASE = '/admin/users/';

export const listUsers = (params = {}) => axiosClient.get(BASE, { params }).then((res) => res.data);

export const deleteUser = (id) => axiosClient.delete(`${BASE}${id}/`);
