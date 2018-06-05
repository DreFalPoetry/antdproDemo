import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Button,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  List,
  Avatar,
  Progress,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
import moment from 'moment';
//ranAdd
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Analysis.less';
import Ellipsis from 'components/Ellipsis';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
	rankingListData.push({
		title: `工专路 ${i} 号店`,
		total: 323234,
	});
}

@connect(({ list, chart,homepage, loading }) => ({
	list,
	chart,
	homepage,
	loading: loading.effects['homepage/fetch'],
}))
export default class Analysis extends Component {
	state = {
		salesType: 'all',
		currentTabKey: '',
		rangePickerValue: getTimeDistance('year'),
	};

  componentDidMount() {
    //ranAdd添加卡片
    this.props.dispatch({
		type: 'list/fetch',
		payload: {
			count: 8,
		},
	});

    this.props.dispatch({
      	type: 'chart/fetch',
	});
	
	//ranAdd--请求homepage model中的数据信息
	this.props.dispatch({
		type: 'homepage/fetch',
	});
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
	});
	dispatch({
		type: 'homepage/clear',
	});
  }

  //改变已读和未读状态
  changeReadStatus = () =>{
	console.log('已读和未读状态');
  }

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { list: { list }, chart, loading,homepage } = this.props;
    const {
      visitData,
      salesData,
	} = chart;
	
	const {
		conversionsData,
		clicksData,
		announcement,
		thirtyDaysInfo
	  } = homepage;

	// 按月份或年份筛选
    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            This Month
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            This Year
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
	);

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <div>
        {/* 头部公告信息 */}
        <div className={styles.pageHeaderContent}>
          <div className={styles.announcement}>
            <span>Announcement</span>
            <i style={{fontStyle:"normal",color:"#ddb64e",cursor:"pointer"}} onClick={this.changeReadStatus}>&nbsp;&nbsp;mark as read</i>
          </div>
          <div className={styles.headerInfoWrapper} style={{display:"flex"}}>
            <div className={styles.avatar}>
              <Avatar
                size="large"
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>早安，{announcement?announcement.info:""}，祝你开心每一天！</div>
              <div>{announcement?announcement.info:""}</div>
            </div>
          </div>
        </div>
        {/* 最近30天收益之类 */}
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Last 30 days Revenue"
              total={thirtyDaysInfo?thirtyDaysInfo.Revenue.count:""}
              footer={<Field label="daily avg." value={`$ ${numeral(thirtyDaysInfo?thirtyDaysInfo.Revenue.dailyAvg:'0').format('0,0.00')}`} />}
              contentHeight={46}
            >
              <div style={{ marginRight: 16 }}>
                increase<span className={styles.trendText}>{thirtyDaysInfo?thirtyDaysInfo.Revenue.increase:""}</span>
              </div>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Last 30 days clicks"
              total={numeral(thirtyDaysInfo?thirtyDaysInfo.clicks.count:'0').format('0,0')}
              footer={<Field label="daily avg." value={numeral(thirtyDaysInfo?thirtyDaysInfo.clicks.dailyAvg:'0').format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Last 30 days conversions"
              total={numeral(thirtyDaysInfo?thirtyDaysInfo.conversions.count:'0').format('0,0')}
              footer={<Field label="daily avg." value={numeral(thirtyDaysInfo?thirtyDaysInfo.conversions.dailyAvg:'0').format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Campaigns"
              total={thirtyDaysInfo?thirtyDaysInfo.Campaigns.inProgress+" In-Progress":'0'+"In-Progress"}
              footer={<Field label="Today Deliveried" value={thirtyDaysInfo?thirtyDaysInfo.Campaigns.todayDeliveried:''} />}
              contentHeight={46}
            >
              <div>Daily Cap   {thirtyDaysInfo?thirtyDaysInfo.Campaigns.dailyCap:''}</div>
              {/* <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" /> */}
            </ChartCard>
          </Col>
        </Row>

        {/* conversions */}
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="Conversions" key="sales">
                <Row>
                  {/* 转换趋势 */}
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title="Conversion Trend" data={conversionsData} />
                    </div>
                  </Col>
                  {/* 转换列表 */}
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>Top 10 Campaign</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Clicks" key="views">
                <Row>
                  {/* 点击量趋势 */}
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={292} title="Clicks Trend" data={clicksData} />
                    </div>
                  </Col>
                  {/* 点击量列表 */}
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>Top 10 Campaign</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
        
        {/* New Campaign */}
        <Card
          className={styles.campaignBrand}
          title="New Campaign"
          bordered={false}
          style={{ marginTop: 32, padding: 0 }}
          bodyStyle={{ padding: '0px' }}
        >
          <div className={styles.cardList} style={{ marginBottom: '0px' }}>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 0, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={[...list]}
              renderItem={item => (
                <List.Item key={item.id} style={{ marginBottom: 0 }}>
                  <Card hoverable className={styles.card}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<span>{item.title}</span>}
                      description={
                        <div>
                          <Ellipsis className={styles.item} lines={3}>
                            {item.description}
                          </Ellipsis>
                          <div className={styles.footerTime}>
                            <span>CPI/$3</span>
                            <i style={{fontStyle:"normal"}}>12小时前</i>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Card>

        {/* Last 7 days updates */}
        <Card
          className={styles.campaignBrand}
          title="Last 7 days updates"
          bordered={false}
          style={{ marginTop: 32, padding: 0 }}
        >
          <List
            size="large"
            rowKey="id"
            loading={loading}
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  description={
                    <div>
                       <div>{item.subDescription}</div>
                       <div>2 hours ago</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}
