import React, { Component } from 'react';
import { Modal, Tabs, Form, Row, Col, Card, Tag, Timeline } from 'antd';
import styles from './index.less';
import {
  CallinDetailForm,
  CalloutDetailForm,
  ManualDetailForm,
  CallinCard,
  CalloutCard,
} from './Template';

const { TabPane } = Tabs;
const TimelineItem = Timeline.Item;

export function PatientInfo({ name }) {
  return (
    <div>
      <Card className={styles.card}>
        <Row>
          姓名：
          <b>{name}</b>
        </Row>
        <Row>年龄： 28</Row>
        <Row>
          <Col span={8}>标签：</Col>
          <Col span={16}>
            <Tag color="magenta">双胎</Tag>
            <Tag color="volcano">妊娠糖尿病</Tag>
          </Col>
        </Row>
        <Row>孕周： 28+3</Row>
        <Row>高危等级： IV级</Row>
      </Card>
      <Card className={styles.card2}>
        <Timeline className={styles.timeline}>
          <TimelineItem>
            <div>
              12+3周
              <span className={styles.timelineItemDate}>2019.03.12</span>
            </div>
            <div>
              <Tag color="blue">诊</Tag>
              轻度贫血、早期妊娠...
            </div>
            <div>
              <Tag color="blue">检</Tag>
              <a>血常规</a>
              <a>B超</a>
            </div>
            <div>
              <Tag color="blue">药</Tag>
              钙维生素D软胶囊
            </div>
          </TimelineItem>
          <TimelineItem color="red">
            <div>
              23+1周
              <span className={styles.timelineItemDate}>2019.05.15</span>
            </div>
            <div>
              <Tag color="blue">诊</Tag>
              轻度贫血、早期妊娠...
            </div>
            <div>
              <Tag color="blue">检</Tag>
              <a>血常规</a>
              <a>B超</a>
            </div>
            <div>
              <Tag color="blue">药</Tag>
              硫酸亚铁片
            </div>
          </TimelineItem>
          <TimelineItem color="green">
            <div>
              23+1周
              <span className={styles.timelineItemDate}>2019.06.15</span>
            </div>
            <div>
              <Tag color="blue">诊</Tag>
              健康
            </div>
            <div>
              <Tag color="blue">检</Tag>
              <a>血常规</a>
              <a>B超</a>
            </div>
            <div>
              <Tag color="blue">药</Tag>无
            </div>
          </TimelineItem>
        </Timeline>
      </Card>
    </div>
  );
}

@Form.create()
class Call extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { visible, onOk, onNext, onCancel, detail } = this.props;

    let detailForm;
    let title;
    let phoneCard;
    if (detail === 'callin') {
      detailForm = <CallinDetailForm onOk={onOk} onNext={onNext} />;
      title = '咨询记录';
      phoneCard = <CallinCard />;
    } else if (detail === 'callout') {
      detailForm = <CalloutDetailForm onOk={onOk} />;
      title = '当前随访';
      phoneCard = <CalloutCard />;
    } else if (detail === 'manual') {
      detailForm = <ManualDetailForm onOk={onOk} />;
      title = '问卷追踪';
      phoneCard = <CalloutCard />;
    }

    return (
      <Modal
        visible={visible}
        footer={null}
        width={800}
        onCancel={onCancel}
        style={{ top: 15 }}
        bodyStyle={{ backgroundColor: '#f0f2f5', maxHeight: 685, overflow: 'auto' }}
      >
        <Row gutter={8}>
          <Col span={6}>
            <PatientInfo name="张珊珊" />
            {phoneCard}
          </Col>

          <Col span={18}>
            <Tabs
              type="card"
              activeKey="0"
              tabBarExtraContent="2019-06-22 16:48"
              style={{ backgroundColor: 'white' }}
              tabBarStyle={{ backgroundColor: '#f0f2f5' }}
            >
              <TabPane tab={title} key="0" className={styles.tabPane}>
                {detailForm}
              </TabPane>
              <TabPane tab="历史记录" key="1" className={styles.tabPane} />
              <TabPane tab="知识库" key="2" className={styles.tabPane} />
            </Tabs>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default Call;
