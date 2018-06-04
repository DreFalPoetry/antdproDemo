// import { fakeChartData } from '../services/api';
import { getConversionAndClicksData } from '../services/api';

export default {
  namespace: 'homepage',

  state: {
    conversionsData:[],//conversion柱状图数据信息
    // campaignListRank:[],//转变的排行
    clicksData:[],//clicks柱状图数据信息
    // clickRank:[],//点击的排行
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getConversionAndClicksData);
      yield put({
        type: 'save',
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
    clear() {
      return {
        conversionsData: [],
        clicksData: []
      };
    },
  },
};
