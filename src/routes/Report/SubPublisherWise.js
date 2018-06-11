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
import {getDate,getTheFirstDay} from '../../utils/commonFunc';
//ranAdd
const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
let selectDate1 = '';
let selectDate2 = '';

@Form.create()
@connect(({report, loading }) => ({
    report,
    loading: loading.models.report,
}))
export default class SubPublisherWise extends PureComponent {
    state = {
        dataSource: [],
        start_date:getTheFirstDay(),
        end_date:getDate(0),
        page_no:1,
        page_size:2
    };
    
    componentDidMount() {
        this.props.dispatch({
            type: 'report/fetch',
            payload:{'is_sub':1,"page_no":1,"page_size":2,"start_date":getTheFirstDay(),"end_date":getDate(0)}
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
        this.setState({
            'page_no':page,
            'page_size':pageSize
        },function(){
            const {start_date,page_no,end_date,page_size} = this.state;
            this.props.dispatch({
                type: 'report/fetch',
                payload:{'is_sub':1,"start_date":start_date,"end_date":end_date,"page_no":page_no,"page_size":page_size}
            })
        });
    }

    //每页条数发生变化
    onShowSizeChange = (current,size) =>{
        this.setState({
            'page_no':1,
            'page_size':size
        },function(){
            const {start_date,page_no,end_date,page_size} = this.state;
            this.props.dispatch({
                type: 'report/fetch',
                payload:{'is_sub':1,"start_date":start_date,"end_date":end_date,"page_no":page_no,"page_size":page_size}
            })
        })
    }

    //搜索栏日期发生变化
    dateChange = (dates,dateStrings) =>{
        this.setState({
            start_date:'',
            end_date:''
        });
        selectDate1 = dateStrings[0];
        selectDate2 = dateStrings[1]; 
    }

    //点击query按钮
    queryList = (e) =>{
        e.preventDefault();
        this.setState({
            page_no:1
        },function(){
            const {start_date,page_no,end_date,page_size} = this.state;
            this.props.dispatch({
                type: 'report/fetch',
                payload:{'is_sub':1,"page_no":page_no,"page_size":page_size,'start_date':start_date,'end_date':end_date}
            })
        });
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
            <Form onSubmit={this.queryList} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                    <FormItem label="Date Range">
                    {getFieldDecorator('date',{
                        'initialValue':[moment(getTheFirstDay()),moment(getDate(0))]
                    })(
                        <RangePicker 
                            style={{ width: '250px' }} 
                            onChange={this.dateChange}
                        />
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
                    'current':this.state.page_no,
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
