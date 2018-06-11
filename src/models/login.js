import { routerRedux } from 'dva/router';
import { fakeAccountLogin ,realUserLogin} from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
//引入判断session失效状态和 callBack提示错误信息状态
import {sessionInvalid,errorCallBack,callbackDeal} from '../utils/serviceCallBack';

export default {
    namespace: 'login',

    state: {
        status: undefined,
        userinfo:{
            "name":"",
            "email":"",
            "avatar":"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
        }
    },

    effects: {
        // *login({ payload }, { call, put }) {
        //     const response = yield call(fakeAccountLogin, payload);
        //     yield put({
        //         type: 'changeLoginStatus',
        //         payload: response,
        //     });
        // // Login successfully
        //     if (response.status === 'ok') {
        //         reloadAuthorized();
        //         yield put(routerRedux.push('/dashboard/analysis'));
        //     }
        // },
        *realLogin({ payload }, { call, put }) {
            const response = yield call(realUserLogin, payload);
            response.currentAuthority = "admin";
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // callbackStatus successfully
            const finallResult = callbackDeal(response);
            if(finallResult == 'successCallBack'){
                const userinfo = response.userinfo;
                userinfo.avatar = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
                localStorage.setItem('loginUserInfo',JSON.stringify(userinfo));
                yield put({
                    type: 'asyncUserInfo',
                    payload: {userinfo},
                });
                reloadAuthorized();
                yield put(routerRedux.push('/dashboard/analysis'));
            }
            // if(response.code!=null && response.code!= undefined){
            //     if (response.code == 0) {
            //         const userinfo = response.userinfo;
            //         userinfo.avatar = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
            //         localStorage.setItem('loginUserInfo',JSON.stringify(userinfo));
            //         yield put({
            //             type: 'asyncUserInfo',
            //             payload: {userinfo},
            //         });
            //         reloadAuthorized();
            //         yield put(routerRedux.push('/dashboard/analysis'));
            //     }else if(response.code == 1){
            //         sessionInvalid();
            //     }else{
            //         errorCallBack(response);
            //     }
            // }
        },
        *logout(_, { put, select }) {
        try {
            // get location pathname
            const urlParams = new URL(window.location.href);
            const pathname = yield select(state => state.routing.location.pathname);
            // add the parameters in the url
            urlParams.searchParams.set('redirect', pathname);
            window.history.replaceState(null, 'login', urlParams.href);
        } finally {
            yield put({
            type: 'changeLoginStatus',
            payload: {
                status: false,
                currentAuthority: 'guest',
            },
            });
            reloadAuthorized();
            yield put(routerRedux.push('/user/login'));
        }
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
        asyncUserInfo(state, { payload:{userinfo} }){
            return {
                ...state,
                userinfo
            };
        }
    },
};
