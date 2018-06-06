import { queryReportList } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'report',

    state: {
        dataList:[],
        total:null,
        pageCount:null
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryReportList);
            const dataList = response.datagraid;
            const total = response.total_pages;
            const pageCount = response.page_no;
            yield put({
                type: 'syancList',
                payload:{dataList,total,pageCount}
            });
        },
    },

    reducers: {
        syancList(state, {payload:{dataList,total,pageCount}}) {
            return {
                ...state,
                dataList,total,pageCount
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
