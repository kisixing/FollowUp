import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryPatient(params) {
  return request(`/api/archives/patient?${stringify(params)}`);
}

export async function queryTreatmentRecord(params) {
  return request(`/api/archives/treatmentRecord?${stringify(params)}`);
}

export async function queryFollowupRecord(params) {
  return request(`/api/archives/followupRecord?${stringify(params)}`);
}

export async function querySearchRecord(params) {
  return request(`/api/archives/searchRecord?${stringify(params)}`);
}

export async function queryEMR(params) {
  return request(`/api/archives/EMR?${stringify(params)}`);
}
