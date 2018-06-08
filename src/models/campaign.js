import { myCampaigns,campaigns,campaignDetails,campaignOptions } from '../services/api';
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
        creative:{},
        filterList:[]
    },

    effects: {
        *myCampaigns(_, { call, put }) {
            const response = yield call(myCampaigns);
            if(response.code!=undefined && response.code!=null && response.code == 0){
                yield put({
                    type: 'syancMyCampaigns',
                    payload: response,
                });
            }
        },
        *filterCampaigns(_, { call, put }) {
            const response = yield call(campaigns);
            console.log(response);
            if(response.code!=undefined && response.code!=null && response.code == 0){
                const pageNo = response.page_no;//页数
                const totalCount = response.total_pages;//总条数
                const campsList = response.camps;
                yield put({
                    type: 'syancFilterCampaigns',
                    payload: {pageNo,totalCount,campsList},
                });
            }
        },
        *getFilterList(_, { call, put }) {
            const response = yield call(campaignOptions);
            console.log(response);
            if(response.code!=undefined && response.code!=null){
                if(response.code == 0){
                    const filterList = response.data;
                    yield put({
                        type: 'syancFilterList',
                        payload: filterList,
                    });
                }else if(response.code == 1){
                    
                }else{
                    
                }
            }
        },
        *fetchCampaignsDetail(_, { call, put }) {
            const response = yield call(campaignDetails);
            if(response.code!=undefined && response.code!=null && response.code == 0){
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
