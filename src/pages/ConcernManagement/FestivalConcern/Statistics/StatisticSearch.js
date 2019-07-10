import { Form, DatePicker, Button } from 'antd';
import MyDropdown from '@/components/MyDropdown';

const { Item } = Form;
export default ({ status }) => {
  return (
    <Form layout="inline" style={{ padding: '20px 0', lineHeight: '40px' }}>
      <Item label="开始时间">
        <DatePicker />
      </Item>
      <Item label="结束时间">
        <DatePicker />
      </Item>
      <Item label="发送状态">
        <MyDropdown
          dataset={['全部', '成功', '失败'].map(i => ({
            label: i,
            value: Math.random().toString(),
          }))}
          value={status}
          placeholder="请选择发送状态"
        />
      </Item>
      <div style={{ float: 'right' }}>
        <Button style={{ margin: '0 10px' }}>重置</Button>
        <Button type="primary">开始搜索</Button>
      </div>
    </Form>
  );
};
