import { myCampaigns,campaigns,campaignDetails,campaignOptions } from '../services/api';
//引入判断 成功返回执行和session失效状态和 callBack提示错误信息状态
import {callbackDeal} from '../utils/serviceCallBack';

export default {
    namespace: 'campaign',

    state: {
        myCampaigns:{},
        pageSize:null,
        total:null,
        campsList:[],
        campaignsDetails:{},
        targeting:{},
        updates:[],
        creative:{},
        filterList:[]
    },

    effects: {
        //获取头部框数据详情
        *myCampaigns(_, { call, put }) {
            const response = yield call(myCampaigns);
            // callbackStatus successfully
            const finallResult = callbackDeal(response);
            if(finallResult == 'successCallBack'){
                yield put({
                    type: 'syancMyCampaigns',
                    payload: response,
                });
            }
        },
        //获取table数据
        *filterCampaigns({payload}, { call, put }) {
            const response = yield call(campaigns,payload);
            // callbackStatus successfully
            const finallResult = callbackDeal(response);
            if(finallResult == 'successCallBack'){
                const total = response.total_records;//总条数
                const pageSize = response.page_size;//每页条数
                const campsList = response.camps;
                yield put({
                    type: 'syancFilterCampaigns',
                    payload: {pageSize,total,campsList},
                });
            }
        },
        *getFilterList(_, { call, put }) {
            const response = yield call(campaignOptions);
            // callbackStatus successfully
            const finallResult = callbackDeal(response);
            if(finallResult == 'successCallBack'){
                const filterList = response.data;
                yield put({
                    type: 'syancFilterList',
                    payload: filterList,
                });
            }
        },
        //获取campaign详情
        *fetchCampaignsDetail(_, { call, put }) {
            const response = yield call(campaignDetails);
            // callbackStatus successfully
            const finallResult = callbackDeal(response);
            if(finallResult == 'successCallBack'){
                const updates = response.detail.updates;
                const targeting = response.detail.targeting;
                const creative = response.detail.creative;
                yield put({
                    type: 'syancCampaignsDetail',
                    payload: response.detail,
                });
                yield put({
                    type: 'syancDetailList',
                    payload: {updates,targeting,creative},
                });
            }
        },
    },

    reducers: {
        syancMyCampaigns(state, {payload}) {
            return {
                ...state,
                myCampaigns: payload,
            };
        },
        syancFilterCampaigns(state, {payload:{pageSize,total,campsList}}) {
            return {
                ...state,
                pageSize,total,campsList
            };
        },
        syancCampaignsDetail(state, {payload}) {
            return {
                ...state,
                campaignsDetails: payload,
            };
        },
        syancFilterList(state, {payload}) {
            return {
                ...state,
                filterList: payload,
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
