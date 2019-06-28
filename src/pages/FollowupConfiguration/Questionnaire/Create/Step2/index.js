
import React, { Component } from 'react';
import router from 'umi/router';
import { Button, Row, Col } from 'antd';
import styles from './index.less'
import EditArea from "./EditArea";
const { questionBtn, title } = styles
function mapStateToProps(rootState) {
  return { rootState };
}

export default connect(mapStateToProps)((props) => {
  const [state, setState] = useState({});
  const { } = props;
  const { } = state;
  return (
    <Row>
      <Col span={6}>
        <Title>
          选择填空
        </Title>
        <Button type="ghost" className={questionBtn}>选择题</Button>
        <Button type="ghost" className={questionBtn}>选择题</Button>
        <Button type="ghost" className={questionBtn}>选择题</Button>
        <Button type="ghost" className={questionBtn}>选择题</Button>
        <br />
        <br />
        <Title>
          选择填空
        </Title>
        <Button type="ghost" className={questionBtn}>选择题</Button>
        <br />
        <br />
        <Title>
          选择填空
        </Title>
        <Button type="ghost" className={questionBtn} draggable  onDrag={e => {
          e.dataTransfer.setData('text/plain', 'aaaa')
        }}>选择题</Button>
      </Col>



      <Col span={12}>

        <div>
          <EditArea />
          <Button onClick={() => router.push('/followup-configuration/questionnaire/create/step3')} >
            提交
          </Button>
        </div>
      </Col>



      <Col span={6}>
        <div></div>
      </Col>
    </Row>
  );
});

function Title({ children }) {
  return (
    <div className={styles.title}>
      {children}
    </div>
  )
}