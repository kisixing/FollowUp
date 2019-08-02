import { Form, Input } from 'antd';
import AdressSelect from './AddressLinkage2';

export default function Item(props) {
  const {
    getFieldDecorator,
    addressFieldName = 'addressFieldName',
    addressFieldOptions = {},
  } = props;

  const _fieldOptions3 = {
    initialValue: '',
    rules: [{ required: true, message: '请输入地址' }],
    ...addressFieldOptions,
  };
  return (
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <AdressSelect {...props} />
      <Form.Item style={{ display: 'inline-block', margin: '0' }}>
        {getFieldDecorator(addressFieldName, _fieldOptions3)(<Input />)}
      </Form.Item>
    </div>
  );
}
