import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取角色列表（用户组）
 */
export async function query(params) {
  return request(`/api/management/roles?${stringify(params)}`);
}

/**
 * 新增角色
 * @param {object} params
 */
export async function add(params) {
  return request('/api/groups', {
    method: 'post',
    data: params,
  });
}

/**
 * 更新角色
 * @param {object} params
 */
export async function update(params) {
  return request('/api/groups', {
    method: 'put',
    data: params,
  });
}

/**
 * 删除角色
 * @param id
 * @returns {Promise<void>}
 */
export async function deleted(id) {
  return request('/api/groups', {
    method: 'delete',
    data: {
      id,
    },
  });
}
