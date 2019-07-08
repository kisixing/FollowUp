import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Card, Col } from 'antd';

export default () => {
  return (
    <PageHeaderWrapper>
      <Row gutter={20}>
        <Col span={18}>
          <Card title="生日关怀配置">
            <div>1213</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="生日关怀配置">
            <div>2222</div>
          </Card>
        </Col>
      </Row>
      <Card title="生日关怀配置">
        <div>2222</div>
      </Card>
    </PageHeaderWrapper>
  );
};
