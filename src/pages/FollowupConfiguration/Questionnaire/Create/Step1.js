
import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Form,List, Card, Input, Icon, Avatar, Button  } from 'antd';



import styles from './Step1.less';

// const category = ['科室随访', '专项随访', '关怀类随访', '管理类随访', '科研随访'];
// const secondaryCategory = [
//   '高危妊娠孕妇复诊管理',
//   '妊娠糖尿病孕妇管理',
//   '产后随访',
//   '无创基因检查随访',
//   'OGTT异常随访',
//   '节日问候',
//   '生日问候',
//   '三伏天通知',
//   '新生儿疾病护理讲座通知',
//   '可是满意度',
//   '投诉建议',
//   '妊娠期体重管理与巨大儿',
//   '妊娠糖尿病产后病情发展',
// ];

/**
 * 主页面内容
 */
// eslint-disable-next-line camelcase
@connect(({ global, questionnaire_model }) => ({
  global,
  selectedTags: questionnaire_model.selectedTags,
  lists: questionnaire_model.lists,
  category: questionnaire_model.category,
  secondaryCategory: questionnaire_model.secondaryCategory,
  templateList: questionnaire_model.templateList,
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
    const { loading,  lists, templateList,  } = this.props;





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
                    <Button type="dashed" className={styles.newButton} onClick={()=>this.handleSelect()}>
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
