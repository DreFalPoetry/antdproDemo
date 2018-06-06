import { myCampaigns,campaigns,campaignDetails } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'campaign',

    state: {
        myCampaigns:{},
        pageNo:"",
        totalCount:"",
        campsList:[],
        campaignsDetails:{},
        targeting:{},
        updates:[],
        creative:{}
    },

    effects: {
        *myCampaigns(_, { call, put }) {
            const response = yield call(myCampaigns);
            yield put({
                type: 'syancMyCampaigns',
                payload: response,
            });
        },
        *filterCampaigns(_, { call, put }) {
            const response = yield call(campaigns);
            const pageNo = response.page_no;//页数
            const totalCount = response.total_pages//总条数
            const campsList = response.camps;
            yield put({
                type: 'syancFilterCampaigns',
                payload: {pageNo,totalCount,campsList},
            });
        },
        *fetchCampaignsDetail(_, { call, put }) {
            const response = yield call(campaignDetails);
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
        },
    },

    reducers: {
        syancMyCampaigns(state, {payload}) {
            return {
                ...state,
                myCampaigns: payload,
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
