// import { fakeChartData } from '../services/api';
import { getConversionAndClicksData,queryNewCampaignList } from '../services/api';
import { 
    recent30d,
    queryByDateRange,
    lastestCampaigns,
    latestUpdates
} from '../services/api';
import moment from 'moment';
import {getDate} from '../utils/commonFunc';

export default {
    namespace: 'homepage',

    state: {
        conversionsData:[],//conversion柱状图数据信息
        clicksData:[],//clicks柱状图数据信息
        topCampaigns:[],
        topClicks:[],
        announcement:{},
        thirtyDaysInfo:{},
        sevenDaysUpdateList:[],
        newCampaignList:[],
        //服务端获取数据信息
        recent30d:{},
        queryByDateRange:{},
        lastestCampaigns:[],
        latestUpdates:[]
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
        *recent30d(_, { call, put }) {
            const response = yield call(recent30d);
            let clkData = [];
            let clkEach = response.sum.clk.each;
            clkEach.map((item,index,arr)=>{
                clkData.push({x:getDate(arr.length-index),y:item})
            });

            let convData = [];
            let convEach = response.sum.conv.each;
            convEach.map((item,index,arr)=>{
                convData.push({x:getDate(arr.length-index),y:item})
            });

            response.sum.clk.each = clkData;
            response.sum.conv.each = convData;
            console.log(response);

            yield put({
                type: 'asyncRecent30d',
                payload: response,
            });
        },
        *queryByDateRange(_, { call, put }) {
            const response = yield call(queryByDateRange);
            yield put({
                type: 'asyncQueryByDateRange',
                payload: response,
            });
        },
        *lastestCampaigns(_, { call, put }) {
            const response = yield call(lastestCampaigns);
            yield put({
                type: 'asyncLastestCampaigns',
                payload: response,
            });
        },
        *latestUpdates(_, { call, put }) {
            const response = yield call(latestUpdates);
            yield put({
                type: 'asyncLatestUpdates',
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
        asyncRecent30d(state, { payload }) {
            return {
                ...state,
                recent30d:{"sum":payload.sum,"camp":payload.camp},
            };
        },
        asyncQueryByDateRange(state, { payload }) {
            return {
                ...state,
                queryByDateRange:{"clk":payload.clk,"conv":payload.conv},
            };
        },
        asyncLastestCampaigns(state, { payload }) {
            return {
                ...state,
                lastestCampaigns:payload.camps,
            };
        },
        asyncLatestUpdates(state, { payload }) {
            return {
                ...state,
                latestUpdates:payload.updates,
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
                sevenDaysUpdateList:[],
                newCampaignList:[],
                //服务端获取数据信息
                recent30d:{},
                queryByDateRange:{},
                lastestCampaigns:[],
                latestUpdates:[]
            };
        },
    },
};
