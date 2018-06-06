import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

//ranAdd 仪表盘部分获取数据排行信息--get请求
export async function getConversionAndClicksData() {
  return request('/api/conversionAndClicksData');
}

export async function queryNewCampaignList(params) {
    return request(`/api/getNewCampaignList?${stringify(params)}`);
}

//与接口数据匹配的api
export async function recent30d() {
    return request('/pub/dash/recent30d');
}
export async function queryByDateRange() {
    return request('/pub/dash/queryByDateRange');
}
export async function lastestCampaigns() {
    return request('/pub/dash/lastestCampaigns');
}
export async function latestUpdates() {
    return request('/pub/dash/latestUpdates');
}
export async function myCampaigns() {
    return request('/pub/dash/myCampaigns');
}
export async function campaigns() {
    return request('/pub/campaigns');
}


