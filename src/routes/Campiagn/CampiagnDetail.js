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
const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const { Description } = DescriptionList;

const description = (
  <DescriptionList className={styles.headerList} size="small" col="1">
    <Description term="Category">Shopping</Description>
    <Description term="Lifetime cycle">2018-05-01 ~ 2018-05-31</Description>
    <Description term="Fraud Demand"></Description>
    <Description term="Fraud Description"></Description>
    <Description term="KPI"></Description>
    <Description term="KPI Description"></Description>
  </DescriptionList>
);

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Change From',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Change To',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  }
];

//通过@connect进行model的数据传输
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class MyCampiagnDetail extends Component {
  state = {
    operationkey: 'tab1',
  };
  componentDidMount() {
    console.log(this.props.location.state);
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });
  }

  onOperationTabChange = key => {
    // console.log(key);
    this.setState({ operationkey: key });
  };

  render() {
    const { list: { list }, loading } = this.props;
    const { profile } = this.props;
    const advancedOperation1 = [];

    const contentList = {
      tab1: (
        <div>
          <Card title="Targeting" style={{ marginBottom: 24 }}>
            <DescriptionList style={{ marginBottom: 24 }} col="2">
              <Description term="Country">india</Description>
              <Description term="State or City">a, b, c</Description>
              <Description term="Connection Type">2G, 3G, 4G</Description>
              <Description term="Carrier">Vodafone, Airtel</Description>
              <Description term="Mandatory Device ID">IDFA</Description>
              <Description term="Sub Publisher">--</Description>
              <Description term="Device Type">mobile</Description>
              <Description term="Device Make">--</Description>
              <Description term="Device Model">--</Description>
              <Description term="OS">--</Description>
              <Description term="OSV">--</Description>
            </DescriptionList>
          </Card>
          <Card title="Creative" style={{ marginBottom: 24 }} col="1">
            <DescriptionList style={{ marginBottom: 24 }}>
              <Description term="Creative">click download</Description>
              <Description term="Tracking Link">http://ad.moca-tech.net/xxxxxx</Description>
            </DescriptionList>
          </Card>
        </div>
      ),
      tab2: (
        <Card title="Targeting" style={{ marginBottom: 24 }}>
          <Table
            pagination={false}
            loading={loading}
            dataSource={advancedOperation1}
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
            dataSource={advancedOperation1}
            columns={columns}
          />
        </Card>
      ),
    };

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>Status</div>
          <div className={styles.heading}>In-Progress</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>Price Model</div>
          <div className={styles.heading}>CPI/0.3$</div>
        </Col>
      </Row>
    );

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
