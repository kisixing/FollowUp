import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryLists(params) {
  return request(`/api/followup/tasklists?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/followuo/tasklists', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
