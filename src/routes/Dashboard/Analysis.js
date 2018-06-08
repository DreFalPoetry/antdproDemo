/**
 * created by ran 20180604
 */
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

@connect(({chart,homepage, loading }) => ({
	chart,
	homepage,
	loading: loading.effects['homepage/recent30d'],
}))
export default class Analysis extends Component {
	state = {
		rangePickerValue: getTimeDistance('year'),
	};

    componentDidMount() {
        //请求后端服务接口数据
        this.props.dispatch({
            type: 'homepage/recent30d'
        });
        this.props.dispatch({
            type: 'homepage/queryByDateRange'
        });
        this.props.dispatch({
            type: 'homepage/lastestCampaigns',
        });
        this.props.dispatch({
            type: 'homepage/latestUpdates',
        });
    }

    //在组件销毁的时候清除model中的数据信息
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
        console.log(rangePickerValue);
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
        const { rangePickerValue } = this.state;
        const { loading,homepage } = this.props;
        
        const {
            //服务端获取数据信息
            recent30d,
            queryByDateRange,
            lastestCampaigns,
            latestUpdates
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
                {/* <div className={styles.pageHeaderContent}>
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
                            <div className={styles.contentTitle}>早安，{announcement.info?announcement.info:""}，祝你开心每一天！</div>
                            <div>{announcement.info?announcement.info:""}</div>
                        </div>
                    </div>
                </div> */}
                {/* 最近30天收益之类 */}
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Last 30 days Revenue"
                            total={numeral(recent30d.sum?recent30d.sum.rev.total:"0").format('0,0')}
                            footer={<Field label="daily avg." value={`$ ${numeral(recent30d.sum?recent30d.sum.rev.total/30:'0').format('0,0.00')}`} />}
                            contentHeight={46}
                        >
                            <div style={{ marginRight: 16 }}>
                                increase<span className={styles.trendText}>{recent30d.sum?recent30d.sum.rev.incr+"%":""}</span>
                            </div>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Last 30 days clicks"
                            total={numeral(recent30d.sum?recent30d.sum.clk.total:'0').format('0,0')}
                            footer={<Field label="daily avg." value={numeral(recent30d.sum?recent30d.sum.clk.total/30:'0').format('0,0')} />}
                            contentHeight={46}
                        >
                            <MiniArea color="#975FE4" data={recent30d.sum?recent30d.sum.clk.each:[]} />
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Last 30 days conversions"
                            total={numeral(recent30d.sum?recent30d.sum.conv.total:'0').format('0,0.00')}
                            footer={<Field label="daily avg." value={numeral(recent30d.sum?recent30d.sum.conv.total/30:'0').format('0,0.00')} />}
                            contentHeight={46}
                        >
                            <MiniArea data={recent30d.sum?recent30d.sum.conv.each:[]} />
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="Campaigns"
                            total={recent30d.camp?recent30d.camp.total+" In-Progress":"0 In-Progress"}
                            footer={<Field label="Today Deliveried" value={recent30d.camp?recent30d.camp.deliveried:''} />}
                            contentHeight={46}
                        >
                            <div>Daily Cap   {recent30d.camp?recent30d.camp.caps:''}</div>
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
                                            <Bar height={295} title="Conversion Trend" data={queryByDateRange.conv?queryByDateRange.conv.each:[]} />
                                        </div>
                                    </Col>
                                    {/* 转换列表 */}
                                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>Top 10 Campaign</h4>
                                            <ul className={styles.rankingList}>
                                                {queryByDateRange.conv?queryByDateRange.conv.top10.map((item, i) => (
                                                <li key={item.name}>
                                                    <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                    <span>{item.name}</span>
                                                    <span>{numeral(item.cnt).format('0,0.00')}</span>
                                                </li>
                                                )):""}
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
                                            <Bar height={292} title="Clicks Trend" data={queryByDateRange.clk?queryByDateRange.clk.each:[]} />
                                        </div>
                                    </Col>
                                    {/* 点击量列表 */}
                                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>Top 10 Campaign</h4>
                                            <ul className={styles.rankingList}>
                                                {queryByDateRange.clk?queryByDateRange.clk.top10.map((item, i) => (
                                                <li key={item.name}>
                                                    <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                    <span>{item.name}</span>
                                                    <span>{numeral(item.cnt).format('0,0.00')}</span>
                                                </li>
                                                )):""}
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
                            dataSource={lastestCampaigns}
                            renderItem={item => (
                                <List.Item key={item.id} style={{ marginBottom: 0 }}>
                                    <Card hoverable className={styles.card}>
                                        <Card.Meta
                                            avatar={<img alt="" className={styles.cardAvatar} src={item.icon} />}
                                            title={<span>{item.name}</span>}
                                            description={
                                                <div>
                                                    <Ellipsis className={styles.item} lines={3}>
                                                        {item.category+" "+item.kpi+" "+item.currency}
                                                    </Ellipsis>
                                                    <div className={styles.footerTime}>
                                                        <span>{item.payfor+"/$"+item.payout}</span>
                                                        <i style={{fontStyle:"normal"}}>{item.created_at?moment(item.created_at).format('YYYY-MM-DD'):""}</i>
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
                        dataSource={latestUpdates}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.icon} shape="square" size="large" />}
                                description={
                                    <div>
                                    <div>
                                    {
                                        item.id+" "+item.name+" "+
                                        (item.type==1?"update cap":(item.type==2?"update payout":(item.type==3?"update creative":"terminate")))+
                                        " from "+item.old+" to "+item.new
                                    }
                                    </div>
                                    <div>{item.time}</div>
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
