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
  InputNumber,
  DatePicker,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
//ranAdd
const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
export default class CampiagnReport extends PureComponent {
  state = {
    data: [],
  };
  componentDidMount() {}

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: 'Campaign',
        dataIndex: 'campaign',
      },
      {
        title: 'Clicks',
        dataIndex: 'clicks',
      },
      {
        title: 'Conversions',
        dataIndex: 'conversions',
        // sorter: true,
        // align: 'right',
        // render: val => `${val} 万`,
        // mark to display a total number
        // needTotal: true,
      },
      {
        title: 'CVR%',
        dataIndex: 'cvr',
        // filters: [
        //   {
        //     text: status[0],
        //     value: 0,
        //   },
        //   {
        //     text: status[1],
        //     value: 1,
        //   },
        //   {
        //     text: status[2],
        //     value: 2,
        //   },
        //   {
        //     text: status[3],
        //     value: 3,
        //   },
        // ],
        // onFilter: (value, record) => record.status.toString() === value,
        // render(val) {
        //   return <Badge status={statusMap[val]} text={status[val]} />;
        // },
      },
      {
        title: 'Fraud%',
        dataIndex: 'fraud',
        // sorter: true,
        // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'KPI%',
        dataIndex: 'kpi',
      },
      {
        title: 'KPI Required%',
        dataIndex: 'kpiRequired',
      },
      // {
      //   title: '操作',
      //   render: () => (
      //     <Fragment>
      //       <a href="">配置</a>
      //       <Divider type="vertical" />
      //       <a href="">订阅警报</a>
      //     </Fragment>
      //   ),
      // },
    ];

    return (
      <div>
        <PageHeaderLayout />
        <Card bordered={false}>
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="规则编号">
                  {getFieldDecorator('no')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="调用次数">
                  {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="更新日期">
                  {getFieldDecorator('date')(
                    <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="使用状态">
                  {getFieldDecorator('status3')(
                    <Select placeholder="请选择" style={{ width: '182px' }}>
                      <Option value="0">关闭</Option>
                      <Option value="1">运行中</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ float: 'right', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
              </span>
            </div>
          </Form>
          <Table columns={columns} dataSource={this.state.data} bordered />
        </Card>
      </div>
    );
  }
}
