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
  Form,
  Input,
} from 'antd';
import numeral from 'numeral';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
import moment from 'moment';

//ranAdd
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import Ellipsis from 'components/Ellipsis';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()
export default class BasicSettings extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout>
        <Card title="Change Password" bordered={false} style={{ marginTop: 32, padding: 0 }}>
          <Form onSubmit={this.handleSearch}>
            <Row gutter={24}>
              <Col span={6}>
                <FormItem label="Old Password">
                  {getFieldDecorator('oldPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Input something!',
                      },
                    ],
                  })(<Input placeholder="placeholder" />)}
                </FormItem>
              </Col>
              <Col span={6} offset={2}>
                <FormItem label="New Password">
                  {getFieldDecorator('newPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Input something!',
                      },
                    ],
                  })(<Input placeholder="placeholder" />)}
                </FormItem>
              </Col>
              <Col span={6} offset={2}>
                <FormItem label="Repeat Password">
                  {getFieldDecorator('repeatPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Input something!',
                      },
                    ],
                  })(<Input placeholder="placeholder" />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="Finances" bordered={false} style={{ marginTop: 32, padding: 0 }} />
      </PageHeaderLayout>
    );
  }
}
