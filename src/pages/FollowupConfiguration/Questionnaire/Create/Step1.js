import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Form, List, Card, Input, Icon, Avatar, Button } from 'antd';

import styles from './Step1.less';

const templateList = [
  {
    id: '11211132221',
    title: '妊娠高血压产后复诊提醒',
    hospital: '华侨医院',
    description: '自动发送复诊提醒 · 管理复诊结果',
  },
  {
    id: '11211142221',
    title: '高危复诊提醒',
    hospital: '华侨医院',
    description: '自动发送复诊提醒 · 管理复诊结果',
  },
  {
    id: '11216112221',
    title: '产后42天复诊复诊提醒',
    hospital: '华侨医院',
    description: '自动发送复诊提醒 · 管理复诊结果',
  },
  {
    id: '11211712221',
    title: '妊娠糖尿病产后复诊提醒',
    hospital: '华侨医院',
    description: '自动发送复诊提醒 · 管理复诊结果',
  },
];
@connect(({ global, questionnaire_model }) => ({
  global,
  selectedTags: questionnaire_model.selectedTags,
  lists: questionnaire_model.lists,
  category: questionnaire_model.category,
  secondaryCategory: questionnaire_model.secondaryCategory,
}))
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTemplate: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'questionnaire_model/query',
    });
  }

  onSearch = () => {
    // console.log('onSearch', value);
  };

  // 移除tag标签
  handleTagRemove = removedTag => {
    const { dispatch } = this.props;
    dispatch({
      type: 'questionnaire_model/removeTag',
      payload: removedTag,
    });
  };

  handleSelect = () => {
    // this.handleModalVisible();
    // console.log('template handleSelect', currentTemplate);
    router.push('/followup-configuration/questionnaire/create/step2');
  };

  render() {
    const { showTemplate } = this.state;
    const { loading, lists } = this.props;

    return (
      <div className={styles.step1}>
        {!showTemplate ? (
          // 选择随访任务类型
          <>
            <Form layout="inline">
              <Form.Item className={styles.searchItem}>
                <Input.Search
                  placeholder="请输入..."
                  enterButton="搜索"
                  style={{ width: 400 }}
                  onSearch={this.onSearch}
                />
              </Form.Item>
            </Form>

            <List
              rowKey="id"
              style={{ marginTop: 24 }}
              grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              loading={loading}
              dataSource={lists}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    bodyStyle={{ paddingBottom: 20 }}
                    onClick={() => this.onClick(item)}
                  >
                    <Card.Meta
                      style={{ cursor: 'pointer' }}
                      avatar={<Avatar size="small" src={item.avatar} />}
                      title={item.title}
                      description={item.description}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </>
        ) : (
          // 选择随访任务模板
          <>
            <h3>推荐模板</h3>
            <List
              rowKey="id"
              style={{ marginTop: 24 }}
              grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              loading={loading}
              dataSource={['', ...templateList]}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      bodyStyle={{ paddingBottom: 20 }}
                      onClick={() => this.handleSelect()}
                    >
                      <Card.Meta
                        style={{ cursor: 'pointer' }}
                        avatar={<Avatar size="small" src={item.avatar} />}
                        title={item.title}
                        description={item.hospital}
                      />
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                    <Button
                      type="dashed"
                      className={styles.newButton}
                      onClick={() => this.handleSelect()}
                    >
                      <Icon type="plus" /> 新建模板
                    </Button>
                  </List.Item>
                )
              }
            />
          </>
        )}
      </div>
    );
  }
}

export default Form.create()(Step1);
