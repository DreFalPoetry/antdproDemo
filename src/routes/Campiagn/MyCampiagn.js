/**
 * created by Ran 20180606
 */
import React, { Component } from 'react';
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
    TreeSelect 
} from 'antd';

//ranAdd
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './MyCampiagn.less';
const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const treeData = [{
    label: 'Citys',
    value: '1',
    key: '1',
    children: [{
        label: 'India',
        value: '11',
        key: '11',
    },{
        label: 'USA',
        value: '12',
        key: '12',
    },{
        label: 'China',
        value: '13',
        key: '13',
    }],
},{
    label: 'Status',
    value: '2',
    key: '2',
    children: [{
        label: 'InProcess',
        value: '21',
        key: '21',
    }, {
        label: 'NotDone',
        value: '22',
        key: '22',
    }, {
        label: 'Done',
        value: '23',
        key: '23',
    }],
}];

//通过@connect进行model的数据传输
@connect(({ campaign, list, loading }) => ({
    campaign,
    list,
    loading: loading.models.list,
}))
export default class MyCampiagn extends Component {
    state = {
        value:[]
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'campaign/myCampaigns',
        });
        this.props.dispatch({
            type: 'campaign/filterCampaigns',
        });
        // this.props.dispatch({
        //     type: 'list/fetch',
        //     payload: {
        //         count: 5,
        //     },
        // });
    }

    //树形选择发生变化的时候
    changeTreeVal = (value) => {
        console.log('onChange ', value);
        this.setState({ value });
    }

    //获取搜索框中的值
    getSearchVal = (value) => {
        console.log(value);
    }

    //进入详情页面
    enterHandle = (id) => {
        this.props.history.push({ pathname: '/campiagn/detail', state: { id: id } });
    };

    render() {
        const { list: { list },campaign, loading } = this.props;
        const {myCampaigns,pageNo,totalCount,campsList} = campaign;
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

        const selectTreeProps = {
            treeData,
            value: this.state.value,
            onChange: this.changeTreeVal,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            treeNodeFilterProp:'label',
            style: {
                width: '80%',
            },
        };

        const filterInfo = (
            <div className={styles.extraContent}>
                <div className={styles.selectWrapper}>
                    <label>FILTER</label>
                    <TreeSelect {...selectTreeProps}/>
                </div>
                <Search style={{ width: '30%' }} placeholder="Search by ID, Name" onSearch={this.getSearchVal} />
            </div>
        );

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5,
            total: 50,
        };

        const ListContent = ({ data }) => (
            <div className={styles.listContent}>
                <div className={styles.detailsWrapper}>
                    <div className={styles.listContentItem} style={{width:"40%",marginRight:"20px"}}>
                        <span>Daily Cap</span>
                        <p>{data?data.daily_cap:""}</p>
                    </div>
                    <div className={styles.listContentItem} style={{width:"40%"}}>
                        <span>Price Model</span>
                        <p>{data?data.payfor+"/$"+data.payout:""}</p>
                    </div>
                </div>
                <div className={styles.listContentItem}>
                    <Progress percent={80} strokeWidth={6} style={{ width: 120 }} showInfo={false}/>
                    <span style={{marginLeft:20}}>{data?data.created_at:""}</span>
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
                            <Info title="In-Progress" value={myCampaigns.inprogress?myCampaigns.inprogress+" Campaigns":"0 Campaigns"} bordered />
                        </Col>
                        <Col
                            sm={8}
                            xs={24}
                            style={{ padding: '24px', borderRight: '1px solid #e8e8e8', textAlign: 'center' }}
                        >
                            <Info title="Last 2 days" value={myCampaigns.updates?myCampaigns.updates+" Updates":"0 Updates"} bordered />
                        </Col>
                        <Col 
                            sm={8} 
                            xs={24} 
                            style={{ padding: '24px', textAlign: 'center' }}
                        >
                            <Info title="Last 2 days" value={myCampaigns.news?myCampaigns.news+" News":"0 News"} />
                        </Col>
                    </Row>
                </Card>
                {/* body体信息 */}
                <Card
                    bordered={false}
                    style={{ marginTop: 30 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                    extra={filterInfo}
                >
                    <List
                        size="large"
                        rowKey="id"
                        loading={loading}
                        pagination={paginationProps}
                        dataSource={campsList}
                        renderItem={item => (
                            <List.Item actions={[<a onClick={this.enterHandle.bind(this,item.id)}>Detail</a>]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.icon} shape="square" size="large" />}
                                    title={<span>{item.id+" "+item.name}</span>}
                                    description={item.platform+","+item.countries+" "+item.category+" "+item.kpi+" "+item.currency}
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
