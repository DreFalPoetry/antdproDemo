import moment from 'moment';

// mock data
const conversionsData = [];
const beginDay = new Date().getTime();

const conversionsClick = [112, 1313, 331, 1112, 1432, 1343, 1424, 152, 1553, 1455, 1978, 2344, 6343, 123, 6343, 123, 1444];
for (let i = 0; i < conversionsClick.length; i += 1) {
    conversionsData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: conversionsClick[i],
  });
}

const clicksData = [];

const clicksCount = [1231, 223, 3231, 1333, 1123, 312, 1313, 645, 4646, 345, 4546, 7676, 333, 3434, 1232, 5353, 765];
for (let i = 0; i < clicksCount.length; i += 1) {
    clicksData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: clicksCount[i],
  });
}

const announcement = {"info":"交互专家|蚂蚁金服-技术部-UED","userName":"李艺彤"};

const thirtyDaysInfo = {
                        "Revenue":{"count":"12123.00","increase":"20%","dailyAvg":"412.13"},
                        "clicks":{"count":"12334222","dailyAvg":"34112"},
                        "conversions":{"count":"100233","dailyAvg":"2313"},
                        "Campaigns":{"inProgress":17,"dailyCap":"4239","todayDeliveried":"23%"}
                    };

export const homepageChartData = {
    conversionsData,
    clicksData,
    announcement,
    thirtyDaysInfo
};

export default {
    homepageChartData,
};
