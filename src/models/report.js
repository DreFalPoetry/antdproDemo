import { queryReportList } from '../services/api';
//引入判断 成功返回执行和session失效状态和 callBack提示错误信息状态
import {callbackDeal} from '../utils/serviceCallBack';

export default {
    namespace: 'report',

    state: {
        dataList:[],
        total:null,
        pageSize:null
    },

    effects: {
        *fetch({payload}, { call, put }) {
            const response = yield call(queryReportList,payload);
            // callbackStatus successfully
            const finallResult = callbackDeal(response);
            if(finallResult == 'successCallBack'){
                const dataList = response.datagraid;
                const total = response.total_records;
                const pageSize = response.page_size;
                yield put({
                    type: 'syancList',
                    payload:{dataList,total,pageSize}
                });
            }
        },
    },

    reducers: {
        syancList(state, {payload:{dataList,total,pageSize}}) {
            return {
                ...state,
                dataList,total,pageSize
            };
        },
        syancFilterCampaigns(state, {payload:{pageNo,totalCount,campsList}}) {
            return {
                ...state,
                pageNo,totalCount,campsList
            };
        },
        syancCampaignsDetail(state, {payload}) {
            return {
                ...state,
                campaignsDetails: payload,
            };
        },
        syancDetailList(state, {payload:{updates,targeting,creative}}) {
            return {
                ...state,
                updates,targeting,creative
            };
        },
    },
};
