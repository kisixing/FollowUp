import { stringify } from 'qs';
import request from '@/utils/request'; //

export async function query(params) {
  return request(`/api/knowledge/nursing?${stringify(params)}`);
}

export async function queryFAQ(params) {
  return request(`/api/knowledge/faq?${stringify(params)}`);
}
