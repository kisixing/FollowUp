import { Form, Input } from 'antd';

// const provinceData = ['Zhejiang', 'Jiangsu'];
// const cityData = {
//   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
//   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
// };

export default function Item(props) {
  const {
    getFieldDecorator,

    systolicFieldName = 'systolicFieldName',
    diastolicFieldName = 'diastolicFieldName',

    systolicFieldOptions = {},
    diastolicFieldOptions = {},
  } = props;

  const _systolicFieldOptions = {
    rules: [{ required: true, message: '请输入收缩压' }],
    initialValue: '',
    ...systolicFieldOptions,
  };
  const _diastolicFieldOptions = {
    rules: [{ required: true, message: '请输入舒张压' }],
    initialValue: '',
    ...diastolicFieldOptions,
  };

  return (
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <Form.Item style={{ display: 'inline-block', margin: '0', width: '90px' }}>
        {getFieldDecorator(systolicFieldName, _systolicFieldOptions)(<Input />)}
      </Form.Item>
      <span style={{ margin: '0 10px' }}> /</span>
      <Form.Item style={{ display: 'inline-block', margin: '0 10px 0 0', width: '90px' }}>
        {getFieldDecorator(diastolicFieldName, _diastolicFieldOptions)(<Input />)}
      </Form.Item>
      mmHg
    </div>
  );
}
