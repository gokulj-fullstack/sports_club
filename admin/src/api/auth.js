import axiosClient from './axiosClient';

export const login = (email, password) =>
  axiosClient.post('/login/', { email, password }).then((res) => res.data);

export const fetchProfile = () => axiosClient.get('/profile/').then((res) => res.data);
