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

import styleWorkSpace from './Workplace.less';

import stylesCard from '../List/CardList.less';

import stylesBasic from '../List/BasicList.less';

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

@connect(({ list, chart, loading }) => ({
  list,
  chart,
  loading: loading.effects['chart/fetch'],
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
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

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
    const { list: { list }, chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;

    const salesPieData =
      salesType === 'all'
        ? salesTypeData
        : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

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

    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle="转化率"
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={stylesBasic.listContent}>
        <div className={stylesBasic.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={stylesBasic.listContentItem}>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={stylesBasic.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    return (
      <div>
        {/* 头部公告信息 */}
        <div className={styleWorkSpace.pageHeaderContent}>
          <div className={styles.announcement}>
            <span>Announcement</span>
            <i style={{fontStyle:"normal"}}>&nbsp;&nbsp;mark as read</i>
          </div>
          <div className={styles.headerInfoWrapper} style={{display:"flex"}}>
            <div className={styleWorkSpace.avatar}>
              <Avatar
                size="large"
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              />
            </div>
            <div className={styleWorkSpace.content}>
              <div className={styleWorkSpace.contentTitle}>早安，曲丽丽，祝你开心每一天！</div>
              <div>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
            </div>
          </div>
        </div>
        {/* 最近30天收益之类 */}
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Last 30 days Revenue"
              total={"$126560"}
              footer={<Field label="daily avg." value={`$ ${numeral(413.00).format('0,0')}`} />}
              contentHeight={46}
            >
              <div style={{ marginRight: 16 }}>
                increase<span className={styles.trendText}>20%</span>
              </div>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Last 30 days clicks"
              total={numeral(123212123).format('0,0')}
              footer={<Field label="daily avg." value={numeral(423232).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Last 30 days conversions"
              total={numeral(100232).format('0,0')}
              footer={<Field label="daily avg." value={numeral(3232).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Campaigns"
              total="17 In-Progress"
              footer={<Field label="Today Deliveried" value="23%" />}
              contentHeight={46}
            >
              <div>Daily Cap   2032</div>
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
                      <Bar height={295} title="Conversion Trend" data={salesData} />
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
                      <Bar height={292} title="Clicks Trend" data={salesData} />
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
          <div className={stylesCard.cardList} style={{ marginBottom: '0px' }}>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 0, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={[...list]}
              renderItem={item => (
                <List.Item key={item.id} style={{ marginBottom: 0 }}>
                  <Card hoverable className={stylesCard.card}>
                    <Card.Meta
                      avatar={<img alt="" className={stylesCard.cardAvatar} src={item.avatar} />}
                      title={<span>{item.title}</span>}
                      description={
                        <div>
                          <Ellipsis className={stylesCard.item} lines={3}>
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
