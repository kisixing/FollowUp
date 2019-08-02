import { Form, Select, Input } from 'antd';

const { Option } = Select;
const TYPES = [
  {
    label: '身份证',
    value: '0',
  },
  {
    label: '护照',
    value: '1',
  },
  {
    label: '回乡证',
    value: '2',
  },
];

const initProvinceId = TYPES[0].value;

export default function Item(props) {
  const {
    getFieldDecorator,
    IdTypeFieldName = 'IdTypeFieldName',
    IdFieldName = 'IdFieldName',
    IdTypeFieldOptions = {},
    IdFieldOptions = {},
  } = props;

  const _IdTypeFieldOptions = {
    rules: [{ required: true, message: '请选择证件类型' }],
    initialValue: initProvinceId,
    ...IdTypeFieldOptions,
  };
  const _IdFieldOptions = {
    rules: [{ required: true, message: '请输入号码' }],
    // initialValue: cityData[initProvinceId][0].id
    ...IdFieldOptions,
  };

  return (
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <Form.Item style={{ display: 'inline-block', margin: '0', marginRight: '10px' }}>
        {getFieldDecorator(IdTypeFieldName, _IdTypeFieldOptions)(
          <Select style={{ width: 100 }}>
            {TYPES.map(({ value, label }) => (
              <Option key={value}>{label}</Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item style={{ display: 'inline-block', margin: '0' }}>
        {getFieldDecorator(IdFieldName, _IdFieldOptions)(<Input />)}
      </Form.Item>
    </div>
  );
}
