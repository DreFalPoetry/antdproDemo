// import { fakeChartData } from '../services/api';
import { getConversionAndClicksData,queryNewCampaignList } from '../services/api';

export default {
  namespace: 'homepage',

  state: {
    conversionsData:[],//conversion柱状图数据信息
    clicksData:[],//clicks柱状图数据信息
    topCampaigns:[],
    topClicks:[],
    announcement:{},
    thirtyDaysInfo:{},
    newCampaignList:[]
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getConversionAndClicksData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchList({payload}, { call, put }) {
        const response = yield call(queryNewCampaignList,payload);
        yield put({
          type: 'asyncList',
          payload: response,
        });
      },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    asyncList(state, { payload }) {
        return {
          ...state,
          newCampaignList:payload,
        };
    },
    clear() {
      return {
        conversionsData:[],//conversion柱状图数据信息
        clicksData:[],//clicks柱状图数据信息
        topCampaigns:[],
        topClicks:[],
        announcement:{},
        thirtyDaysInfo:{},
        newCampaignList:[]
      };
    },
  },
};
