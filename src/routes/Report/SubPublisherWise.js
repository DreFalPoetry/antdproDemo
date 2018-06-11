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
  AutoComplete,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
//ranAdd
const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

@Form.create()
@connect(({report, loading }) => ({
    report,
    loading: loading.models.report,
}))
export default class SubPublisherWise extends PureComponent {
    state = {
        dataSource: [],
    };
    
    componentDidMount() {
        this.props.dispatch({
            type: 'report/fetch',
            payload:{'is_sub':1,"page_no":1,"page_size":2}
        })
    }

    //select
    selectCampaign = (value) => {
        console.log('onSelect', value);
    }

    //搜索Campaign项目
    searchCampaign = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    }

    //点击下一页或上一页操作
    pageChange  = (page,pageSize) => {
        this.props.dispatch({
            type: 'report/fetch',
            payload:{"page_no":page,"page_size":pageSize}
        })
    }

    //每页条数发生变化
    onShowSizeChange = (current,size) =>{
        this.props.dispatch({
            type: 'report/fetch',
            payload:{"page_no":1,"page_size":size}
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { report } = this.props;
        const { dataSource } = this.state;
        const { dataList,total,pageSize} = report;

        const columns = [
        {
            title: 'Campaign',
            dataIndex: 'group_id',
        },
        {
            title: 'Sub Publisher',
            dataIndex: 'aff_pub',
        },
        {
            title: 'Clicks',
            dataIndex: 'gross_clks',
        },
        {
            title: 'Conversions',
            dataIndex: 'gross_cons',
        },
        {
            title: 'CVR%',
            dataIndex: 'cvr',
        },
        {
            title: 'Fraud%',
            dataIndex: 'fraud',
        },
        {
            title: 'KPI%',
            dataIndex: 'kpi',
        },
        {
            title: 'KPI Required%',
            dataIndex: 'kpi_required',
        },
        {
            title: 'Optimize Advice',
            dataIndex: 'advice',
        }
        ];

        return (
        <div>
            <PageHeaderLayout />
            <Card bordered={false} style={{marginTop:30}}>
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                    <FormItem label="Date Range">
                    {getFieldDecorator('date')(
                        <RangePicker style={{ width: '250px' }} />
                    )}
                    </FormItem>
                </Col>
                <Col md={8} sm={24}>
                    <FormItem label="Campaign">
                    {getFieldDecorator('status3')(
                        <AutoComplete
                            dataSource={dataSource}
                            style={{ width: 200 }}
                            onSelect={this.selectCampaign}
                            onSearch={this.searchCampaign}
                            placeholder="input here"
                        />
                    )}
                    </FormItem>
                </Col>
                <span style={{ float: 'right', marginBottom: 24 }}>
                    <Button type="primary" htmlType="submit">
                    Query
                    </Button>
                </span>
                </Row>
            </Form>
            <Table 
                columns={columns} 
                dataSource={dataList} 
                bordered 
                rowKey="group_id"
                pagination={{
                    'total':total,
                    'defaultCurrent':1,
                    'pageSize':pageSize,
                    'onChange':this.pageChange,
                    'showSizeChanger':true,
                    'pageSizeOptions':['2','5','10', '15', '20'],
                    'onShowSizeChange':this.onShowSizeChange
                }}
            />
            </Card>
        </div>
        );
    }
}
