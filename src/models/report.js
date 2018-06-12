import { queryReportList ,campaigns} from '../services/api';
//引入判断 成功返回执行和session失效状态和 callBack提示错误信息状态
import {callbackDeal} from '../utils/serviceCallBack';

export default {
    namespace: 'report',

    state: {
        dataList:[],
        total:null,
        pageSize:null,
        dataSource:[]
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
        *fetchCampaign({payload}, { call, put }) {//autocomplete
            const response = yield call(campaigns,payload);
            // callbackStatus successfully
            const finallResult = callbackDeal(response);
            if(finallResult == 'successCallBack'){
                const campaignDataSouce = response.camps;
                let dataSource=[];
                campaignDataSouce.map((item,index) => {
                    dataSource.push({
                        text:item.id+"-"+item.name,
                        value:item.id,
                        key:index
                    })
                });
                yield put({
                    type: 'syancDataSources',
                    payload:dataSource
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
        syancDataSources(state, {payload}) {
            return {
                ...state,
                dataSource:payload
            };
        },
    },
};
