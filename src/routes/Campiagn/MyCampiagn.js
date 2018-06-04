import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import { createBrowserHistory } from 'history';
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
} from 'antd';

//ranAdd
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './MyCampiagn.less';
const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;

//通过@connect进行model的数据传输
@connect(({ campaign, list, loading }) => ({
  campaign,
  list,
  loading: loading.models.list,
}))
export default class MyCampiagn extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  enterHandle = () => {
    this.props.history.push({ pathname: '/campiagn/detail', state: { id: 1 } });
  };

  render() {
    const { list: { list }, loading } = this.props;
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const Info = ({ title, value, bordered }) => (
      <div>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.selectWrapper}>
          <label>FILTER</label>
          <Select
            mode="multiple"
            style={{ width: '80%' }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={this.handleChange}
          >
            {children}
          </Select>
        </div>
        <Search style={{ width: '30%' }} placeholder="Search by ID, Name" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.detailsWrapper}>
          <div className={styles.listContentItem} style={{width:"40%",marginRight:"20px"}}>
            <span>Daily Cap</span>
            <p>{owner}</p>
          </div>
          <div className={styles.listContentItem} style={{width:"40%"}}>
            <span>Price Model</span>
            <p>CPI/0.5$</p>
          </div>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 120 }} showInfo={false}/>
          <span style={{marginLeft:20}}>18/5/31</span>
        </div>
      </div>
    );

    return (
      <div className={styles.campiagnHeader}>
        <PageHeaderLayout />
        {/* 头部信息 */}
        <Card bordered={false}>
          <Row>
            <Col
              sm={8}
              xs={24}
              style={{ padding: '24px', borderRight: '1px solid #e8e8e8', textAlign: 'center' }}
            >
              <Info title="In-Progress" value="7 Campaigns" bordered />
            </Col>
            <Col
              sm={8}
              xs={24}
              style={{ padding: '24px', borderRight: '1px solid #e8e8e8', textAlign: 'center' }}
            >
              <Info title="Last 2 days" value="2 Updates" bordered />
            </Col>
            <Col sm={8} xs={24} style={{ padding: '24px', textAlign: 'center' }}>
              <Info title="Last 20 days" value="2 News" />
            </Col>
          </Row>
        </Card>
        {/* body体信息 */}
        <Card
          bordered={false}
          style={{ marginTop: 30 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            dataSource={list}
            renderItem={item => (
              <List.Item actions={[<a onClick={this.enterHandle}>Detail</a>]}>
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  title={<span>{item.title}</span>}
                  description={item.subDescription}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}
