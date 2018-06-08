import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Card,
  Select,
  Icon,
  Avatar,
  List,
  Tooltip,
  Dropdown,
  Menu,
  Input,
  Button,
  Progress,
  Table,
} from 'antd';

//ranAdd
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from 'components/DescriptionList';
import styles from './MyCampiagn.less';
import {campaignDetails} from '../../services/api';

const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const { Description } = DescriptionList;

const columns = [
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title: 'Change From',
        dataIndex: 'old',
    },
    {
        title: 'Change To',
        dataIndex: 'new',
    },
    {
        title: 'Updated At',
        dataIndex: 'gmt_update_at',
    }
];

//通过@connect进行model的数据传输
@connect(({campaign, loading }) => ({
    campaign,
    loading: loading.models.campaign,
}))
export default class MyCampiagnDetail extends Component {
    state = {
        operationkey: 'tab1',
    };
    componentDidMount() {
        console.log(this.props.location.state);
        const { dispatch } = this.props;

        const response = campaignDetails(104528);
        response.then((res) => {
            return res;
        }).then((json) => {
            const updates = json.detail.updates;
            const targeting = json.detail.targeting;
            const creative = json.detail.creative;
            dispatch({
                type: 'campaign/syancCampaignsDetail',
                payload: json.detail,
            });
            dispatch({
                type: 'campaign/syancDetailList',
                payload: {updates,targeting,creative},
            });
        })
        // yield put({
        //     type: 'syancCampaignsDetail',
        //     payload: response.detail,
        // });
        // yield put({
        //     type: 'syancDetailList',
        //     payload: {updates,targeting,creative},
        // });
        // dispatch({
        //     type: 'campaign/fetchCampaignsDetail',
        // });
    }

    onOperationTabChange = key => {
        // console.log(key);
        this.setState({ operationkey: key });
    };

    render() {
        const {campaign, loading} = this.props;
        const advancedOperation1 = [];
        const {campaignsDetails,targeting,updates,creative} = campaign;
        const description = (
            <DescriptionList className={styles.headerList} size="small" col="1">
              <Description term="Category">{campaignsDetails.category?campaignsDetails.category:"--"}</Description>
              <Description term="Lifetime cycle">{campaignsDetails.active_time?campaignsDetails.active_time+"-"+campaignsDetails.expire_time:"--"}</Description>
              <Description term="Fraud Demand">{"没发现该字段"}</Description>
              <Description term="Fraud Description">{campaignsDetails.fraud_description?campaignsDetails.fraud_description:"--"}</Description>
              <Description term="KPI">{campaignsDetails.kpi?campaignsDetails.kpi:"--"}</Description>
              <Description term="KPI Description">{"没发现该字段"}</Description>
            </DescriptionList>
        );
        const extra = (
            <Row>
                <Col xs={24} sm={12}>
                <div className={styles.textSecondary}>Status</div>
                <div className={styles.heading}>{campaignsDetails.status?campaignsDetails.status:"--"}</div>
                </Col>
                <Col xs={24} sm={12}>
                <div className={styles.textSecondary}>Price Model</div>
                <div className={styles.heading}>{campaignsDetails.payfor?campaignsDetails.payfor+"/$"+campaignsDetails.payout:"--"}</div>
                </Col>
            </Row>
        );
        const contentList = {
        tab1: (
            <div>
                <Card title="Targeting" style={{ marginBottom: 24 }}>
                    <DescriptionList style={{ marginBottom: 24 }} col="2">
                        <Description term="Country">{targeting.countries?targeting.countries:"--"}</Description>
                        <Description term="State or City">{targeting.region?targeting.region:"--"}</Description>
                        <Description term="Connection Type">{targeting.connection_types?targeting.connection_types:"--"}</Description>
                        <Description term="Carrier">{targeting.carrier?targeting.carrier:"--"}</Description>
                        <Description term="Mandatory Device ID">找不到是哪个字段</Description>
                        <Description term="Sub Publisher">找不到是哪个字段</Description>
                        <Description term="Device Type">{targeting.device_types?targeting.device_types:"--"}</Description>
                        <Description term="Device Make">{targeting.device_makes?targeting.device_makes:"--"}</Description>
                        <Description term="Device Model">{targeting.device_models?targeting.device_models:"--"}</Description>
                        <Description term="OS">{targeting.os?targeting.os:"--"}</Description>
                        <Description term="OSV">{targeting.osv?targeting.osv:"--"}</Description>
                    </DescriptionList>
                </Card>
                <Card title="Creative" style={{ marginBottom: 24 }} col="1">
                    <DescriptionList style={{ marginBottom: 24 }}>
                        <Description term="Creative">click download</Description>
                        <Description term="Tracking Link">{creative.creative?creative.creative:"--"}</Description>
                    </DescriptionList>
                </Card>
            </div>
        ),
        tab2: (
            <Card title="Targeting" style={{ marginBottom: 24 }}>
            <Table
                pagination={false}
                loading={loading}
                dataSource={updates}
                columns={columns}
                bordered
            />
            </Card>
        ),
        tab3: (
            <Card title="Targeting" style={{ marginBottom: 24 }}>
            <Table
                pagination={false}
                loading={loading}
                dataSource={updates}
                columns={columns}
                bordered
            />
            </Card>
        ),
        };

        const tabList = [
        {
            key: 'tab1',
            tab: 'Detail',
        },
        {
            key: 'tab2',
            tab: 'Updates',
        },
        {
            key: 'tab3',
            tab: 'Optimize Advice',
        },
        ];

        const breadcrumbList = [
        {
            title: 'HomePage',
            href: '/',
        },
        {
            title: 'Campiagn',
        },
        {
            title: 'My Campaign',
            href: '/campiagn/myCampiagn',
        },
        {
            title: 'MyCampaignDetail',
        },
        ];

        return (
        <div>
            <PageHeaderLayout
            breadcrumbList={breadcrumbList}
            title="104855 Amazon"
            logo={
                <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
            }
            content={description}
            extraContent={extra}
            >
            <Card bordered={false} tabList={tabList} onTabChange={this.onOperationTabChange}>
                {contentList[this.state.operationkey]}
            </Card>
            </PageHeaderLayout>
        </div>
        );
    }
}
