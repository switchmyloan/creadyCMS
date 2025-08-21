import Api from './api'


export const getTags = async payload => Api().get('/tag', payload);
