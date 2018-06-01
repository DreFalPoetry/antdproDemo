import { queryActivities } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'campaign',

  state: {},

  effects: {
    *changeToDetail({ payload }, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // });
      // Login successfully
      // if (response.status === 'ok') {
      //   reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/campiagn/detail/',
          query: {
            id: 2,
          },
        }) //装载路由
      );
      // }
    },
  },

  reducers: {
    // saveList(state, action) {
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };
    // },
  },
};
