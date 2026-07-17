import axiosClient from './axiosClient';

const BASE = '/admin/pricing/';

export const listPricingSettings = (params = {}) =>
  axiosClient.get(BASE, { params }).then((res) => res.data);

export const updatePricingSetting = (id, payload) =>
  axiosClient.patch(`${BASE}${id}/`, payload).then((res) => res.data);
