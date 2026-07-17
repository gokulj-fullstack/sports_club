import axiosClient from './axiosClient';

export const getDashboardStats = () =>
  axiosClient.get('/admin/stats/dashboard/').then((res) => res.data);

export const getReportsAnalytics = () =>
  axiosClient.get('/admin/stats/reports/').then((res) => res.data);
