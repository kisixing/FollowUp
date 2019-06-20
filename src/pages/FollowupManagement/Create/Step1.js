/*
 * @Description: 新建随访任务步骤一
 * @Author: zhong jun
 * @Date: 2019-06-20 16:00:45
 */
import React, { Component, PropTypes } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import  { Form, List, Card, Tooltip, Menu, Input, Dropdown, Icon, Avatar, Button } from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import styles from './Step1.less';

@connect(({ global, followupCreate }) => ({
  global,
  lists: followupCreate.lists,
}))
class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  onSearch = value => {
    console.log('onSearch', value)
  };

  onClick = value => {
    console.log('card onClick', value)
  };

  render () {
    const { loading, form, lists } = this.props;
    const { getFieldDecorator } = form;

    const actionsTextMap = {
      expandText: '展开',
      collapseText: '收起',
      selectAllText: '全部',
    };

    return (
      <div>
        <Form layout="inline">
          <Form.Item className={styles.searchItem}>
            <Input.Search
              placeholder="请输入..."
              enterButton="搜索"
              style={{ width: 400 }}
              onSearch={this.onSearch}
            />
          </Form.Item>
          <StandardFormRow title="您选择的类目" block style={{ paddingBottom: 11 }}>

          </StandardFormRow>
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <Form.Item>
              {getFieldDecorator('category')(
                <TagSelect expandable actionsText={actionsTextMap}>
                  <TagSelect.Option value="cat1">科室随访</TagSelect.Option>
                  <TagSelect.Option value="cat2">专项随访</TagSelect.Option>
                  <TagSelect.Option value="cat3">关怀类随访</TagSelect.Option>
                  <TagSelect.Option value="cat4">管理类随访</TagSelect.Option>
                  <TagSelect.Option value="cat5">科研随访</TagSelect.Option>
                </TagSelect>
              )}
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="二级类目" block style={{ paddingBottom: 11 }}>
            <Form.Item>
              {getFieldDecorator('secondaryCategory')(
                <TagSelect expandable actionsText={actionsTextMap}>
                  <TagSelect.Option value="cat001">高危妊娠管理</TagSelect.Option>
                  <TagSelect.Option value="cat002">妊娠糖尿病管理</TagSelect.Option>
                  <TagSelect.Option value="cat003">妊娠高血压管理</TagSelect.Option>
                  <TagSelect.Option value="cat004">产后随访</TagSelect.Option>
                  <TagSelect.Option value="cat005">术后随访</TagSelect.Option>
                </TagSelect>
              )}
            </Form.Item>
          </StandardFormRow>
        </Form>

        {/* 卡片列表 */}
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
                  style={{ cursor: 'pointer'}}
                  avatar={<Avatar size="small" src={item.avatar} />}
                  title={item.title}
                  description={item.description}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default Form.create()(Step1);
