import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar, Icon, Calendar, Badge } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './index.less';

@connect(({ user, project, activities, loading }) => ({
  currentUser: user.currentUser,
  project,
  activities,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  projectLoading: loading.effects['project/fetchNotice'],
}))
class CalendarComponent extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  getListData = value => {
    let listData;
    switch (value.date()) {
      case 7:
        listData = [{ type: 'warning', content: '高危复诊管理' }];
        break;
      case 8:
        listData = [
          { type: 'warning', content: '高危复诊管理' },
          { type: 'error', content: 'OGTT异常...' },
        ];
        break;
      case 9:
        listData = [{ type: 'warning', content: '唐筛+羊穿+无...' }];
        break;
      case 10:
        listData = [{ type: 'success', content: '投诉与建议处理' }];
        break;
      case 14:
        listData = [{ type: 'warning', content: '高危复诊管理' }];
        break;
      case 15:
        listData = [
          { type: 'warning', content: '高危复诊管理' },
          { type: 'error', content: 'OGTT异常...' },
        ];
        break;
      case 16:
        listData = [{ type: 'warning', content: '唐筛+羊穿+无...' }];
        break;
      case 17:
        listData = [{ type: 'success', content: '投诉与建议处理' }];
        break;
      case 21:
        listData = [{ type: 'warning', content: '高危复诊管理' }];
        break;
      case 22:
        listData = [
          { type: 'warning', content: '高危复诊管理' },
          { type: 'error', content: 'OGTT异常...' },
        ];
        break;
      case 23:
        listData = [{ type: 'warning', content: '唐筛+羊穿+无...' }];
        break;
      case 24:
        listData = [{ type: 'success', content: '投诉与建议处理' }];
        break;
      default:
    }
    return listData || [];
  };

  dateCellRender = value => {
    const listData = this.getListData(value);
    return (
      <ul style={{ padding: 0 }}>
        {listData.map(item => (
          <li key={item.content}>
            <Badge
              status={item.type}
              text={item.content}
              onClick={() =>
                router.push('/followup-management/task-lists/table/220000197207104257')
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const { currentUserLoading, projectLoading } = this.props;

    const notices = [
      {
        id: '1',
        icon: 'medicine-box',
        title: '高危复诊提醒',
        status: '运行中',
        total: '1.6万',
        today: '1235',
      },
      {
        id: '2',
        icon: 'medicine-box',
        title: '高危复诊提醒',
        status: '运行中',
        total: '1.6万',
        today: '1235',
      },
      {
        id: '3',
        icon: 'medicine-box',
        title: '高危复诊提醒',
        status: '运行中',
        total: '1.6万',
        today: '1235',
      },
      {
        id: '4',
        icon: 'medicine-box',
        title: '高危复诊提醒',
        status: '运行中',
        total: '1.6万',
        today: '1235',
      },
      {
        id: '5',
        icon: 'medicine-box',
        title: '高危复诊提醒',
        status: '运行中',
        total: '1.6万',
        today: '1235',
      },
      {
        id: '6',
        icon: 'medicine-box',
        title: '高危复诊提醒',
        status: '运行中',
        total: '1.6万',
        today: '1235',
      },
    ];

    const cardIcon = ['edit', 'book', 'diff', 'fund'];

    return (
      <PageHeaderWrapper loading={currentUserLoading}>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <div style={{ width: '100 %' }}>
              <Calendar
                style={{ border: '1px solid #d9d9d9', borderRadius: 4, backgroundColor: 'white' }}
                dateCellRender={this.dateCellRender}
              />
            </div>

            <Card
              className={styles.projectList}
              style={{ margin: '24px 0' }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {notices.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{ padding: '16px' }}
                    // bordered={false}
                    title={
                      <div className={styles.cardTitle}>
                        <Icon type={item.icon} theme="twoTone" style={{ fontSize: '20px' }} />
                        <Link to="/">{item.title}</Link>
                      </div>
                    }
                    extra={<Link to="/">{item.status}</Link>}
                    actions={cardIcon.map(item2 => (
                      <Link to="#" key={item2}>
                        <Icon type={item2} />
                      </Link>
                    ))}
                  >
                    <Row>
                      <Col span={12}>
                        <div style={{ textAlign: 'center', marginBottom: 5, color: '#FF00FF' }}>
                          紧急随访
                        </div>
                        <div
                          style={{
                            textAlign: 'center',
                            font: 'bold 20px/20px Georgia,serif',
                            color: '#FF00FF',
                          }}
                        >
                          {item.total}
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ textAlign: 'center', marginBottom: 5 }}>待随访</div>
                        <div style={{ textAlign: 'center', font: 'bold 20px/20px Georgia,serif' }}>
                          {item.today}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>

          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card style={{ marginBottom: 24 }}>
              <Row>
                <Col span={12}>
                  <div style={{ textAlign: 'center' }}>今日随访总量</div>
                  <div style={{ textAlign: 'center', font: 'bold 20px/20px Georgia,serif' }}>
                    6431 人
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ textAlign: 'center' }}>人工随访总量</div>
                  <div style={{ textAlign: 'center', font: 'bold 20px/20px Georgia,serif' }}>
                    312 人
                  </div>
                </Col>
              </Row>
            </Card>

            <Card title="在线咨询" bordered={false} style={{ marginBottom: 24 }}>
              <Row type="flex" justify="space-around" style={{ marginBottom: 10 }}>
                <Col style={{ color: '#0096FA' }}>待接入的咨询</Col>
                <Col style={{ color: '#0096FA' }}>120人</Col>
              </Row>
              <Row type="flex" justify="space-around">
                <Col style={{ color: '#0096FA' }}>待回复</Col>
                <Col style={{ color: '#0096FA' }}>34人</Col>
              </Row>
            </Card>
            <Card title="投诉提醒" bordered={false} style={{ marginBottom: 24 }}>
              <Row type="flex" justify="space-around" style={{ marginBottom: 10 }}>
                <Col style={{ color: '#0096FA' }}>待受理的投诉</Col>
                <Col style={{ color: '#0096FA' }}>1起</Col>
              </Row>
              <Row type="flex" justify="space-around">
                <Col style={{ color: '#0096FA' }}>待处理的投诉</Col>
                <Col style={{ color: '#0096FA' }}>9起</Col>
              </Row>
            </Card>
            <Card title="人工随访提醒" bordered={false} style={{ marginBottom: 24 }}>
              <Row type="flex" justify="space-around" style={{ marginBottom: 10 }}>
                <Col style={{ color: '#0096FA' }}>待随访的患者</Col>
                <Col style={{ color: '#0096FA' }}>9人</Col>
              </Row>
              <Row type="flex" justify="space-around" style={{ marginBottom: 10 }}>
                <Col style={{ color: '#0096FA' }}>待跟进的随访</Col>
                <Col style={{ color: '#0096FA' }}>17起</Col>
              </Row>
              <Row type="flex" justify="space-around">
                <Col style={{ color: '#0096FA' }}>紧急的随访</Col>
                <Col style={{ color: '#0096FA' }}>8起</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default CalendarComponent;
