import { myCampaigns,campaigns } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'campaign',

    state: {
        myCampaigns:{},
        pageNo:"",
        totalCount:"",
        campsList:[]
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
    },
};
