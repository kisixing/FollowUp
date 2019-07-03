import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取用户列表
 */
export async function query(params) {
  return request(`/api/management/users?${stringify(params)}`);
}

/**
 * 新增用户
 * @param {object} params
 */
export async function add(params) {
  return request('/api/users', {
    method: 'post',
    data: params,
  });
}

/**
 * 更新用户
 * @param {object} params
 */
export async function update(params) {
  return request('/api/users', {
    method: 'put',
    data: params,
  });
}

/**
 * 删除用户
 * @param loginName
 * @returns {Promise<void>}
 */
export async function deleted(loginName) {
  return request('/api/users', {
    method: 'delete',
    data: { login: loginName },
  });
}
