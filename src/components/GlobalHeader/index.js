import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip ,AutoComplete} from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { connect } from 'dva';

@connect(({report }) => ({
    report
}))

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

    //搜索Campaign项目
    searchCampaign = (value) => {
        this.props.dispatch({
            type: 'report/fetchCampaign',
            payload:{"keywords":value}
        })
    }

    //select
    selectCampaign = (value) => {
        this.props.changePath(value)
    }

  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      login,
      report
    } = this.props;
    const { dataSource} = report;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {/* <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    let loginUserInfo = JSON.parse(sessionStorage.getItem('loginUserInfo'));
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          {/* <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            dataSource={dataSource}
            onSearch={this.searchCampaign}
            onChange={this.changeCampaing}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          /> */}
          <AutoComplete
                dataSource={dataSource}
                style={{ width: 200 }}
                onSelect={this.selectCampaign}
                onSearch={this.searchCampaign}
                placeholder="select campaigns"
            />
          {loginUserInfo ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={loginUserInfo.avatar} />
                <span className={styles.name}>{loginUserInfo.name}</span>
              </span>
            </Dropdown>
          ) : (
              ""
            // <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
