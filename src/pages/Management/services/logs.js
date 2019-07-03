import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取角色列表（用户组）
 */
export async function query(params) {
  return request(`/api/management/logs?${stringify(params)}`);
}

/**
 * 新增角色
 * @param {object} params
 */
export async function add(params) {
  return request('/api/authorities', {
    method: 'post',
    data: params,
  });
}
