import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Card, Col, Form, Button } from 'antd';
import StatisticTable from '../FestivalConcern/Statistics/StatisticTable';
import StatisticSearch from '../FestivalConcern/Statistics/StatisticSearch';
import { router } from 'umi';

const { Item } = Form;
export default () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  return (
    <PageHeaderWrapper>
      <Row gutter={20}>
        <Col span={18}>
          <Card
            title="生日关怀配置"
            extra={
              <Button type="link" onClick={() => router.push('edit')}>
                编辑
              </Button>
            }
          >
            <Form {...formItemLayout}>
              <Item label="发送时间">
                <u>{new Date().toLocaleDateString()}</u>
              </Item>
              <Item label="发送媒介">
                <u>微信</u>
              </Item>
              <Item label="问候语">
                <u>您的安康，是我们的幸福。您的安康，是我们的祝愿。祝您节日愉快！</u>
              </Item>
            </Form>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="生日关怀配置">
            <div style={{ display: 'inline-block', width: '50%', textAlign: 'center' }}>
              <div>今日生日</div>
              <div style={{ fontSize: '22px', marginTop: '10px' }}>125人</div>
            </div>
            <div style={{ display: 'inline-block', width: '50%', textAlign: 'center' }}>
              <div>本月生日</div>
              <div style={{ fontSize: '22px', marginTop: '10px' }}>2984人</div>
            </div>
          </Card>
        </Col>
      </Row>
      <Card title="生日关怀配置" style={{ marginTop: '20px' }}>
        <StatisticSearch />
        <StatisticTable />
      </Card>
    </PageHeaderWrapper>
  );
};
