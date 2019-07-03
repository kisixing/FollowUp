import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryLists(params) {
  return request(`/api/followup/tasklists?${stringify(params)}`);
}

export async function queryTaskTemplates(params) {
  return request(`/api/followup/tasktemplates?${stringify(params)}`);
}
