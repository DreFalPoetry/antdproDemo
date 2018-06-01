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
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="创建人">曲丽丽</Description>
    <Description term="订购产品">XX 服务</Description>
    <Description term="创建时间">2017-07-07</Description>
    <Description term="关联单据">
      <a href="">12421</a>
    </Description>
    <Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>
    <Description term="备注">请于两个工作日内确认</Description>
  </DescriptionList>
);

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="error" text="驳回" />
      ),
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
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
          <Card title="用户信息" style={{ marginBottom: 24 }}>
            <DescriptionList style={{ marginBottom: 24 }}>
              <Description term="用户姓名">付小小</Description>
              <Description term="会员卡号">32943898021309809423</Description>
              <Description term="身份证">3321944288191034921</Description>
              <Description term="联系方式">18112345678</Description>
              <Description term="联系地址">
                曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
              </Description>
            </DescriptionList>
            <DescriptionList style={{ marginBottom: 24 }} title="信息组">
              <Description term="某某数据">725</Description>
              <Description term="该数据更新时间">2017-08-08</Description>
              <Description>&nbsp;</Description>
              <Description
                term={
                  <span>
                    某某数据
                    <Tooltip title="数据说明">
                      <Icon
                        style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                        type="info-circle-o"
                      />
                    </Tooltip>
                  </span>
                }
              >
                725
              </Description>
              <Description term="该数据更新时间">2017-08-08</Description>
            </DescriptionList>
          </Card>
          <Card title="Creative" style={{ marginBottom: 24 }}>
            <DescriptionList style={{ marginBottom: 24 }}>
              <Description term="用户姓名">付小小</Description>
              <Description term="会员卡号">32943898021309809423</Description>
              <Description term="身份证">3321944288191034921</Description>
              <Description term="联系方式">18112345678</Description>
              <Description term="联系地址">
                曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
              </Description>
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
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>待审批</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>订单金额</div>
          <div className={styles.heading}>¥ 568.08</div>
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
