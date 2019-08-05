import { Form, Radio, Input } from 'antd';

const { Group } = Radio;

const data = [
  {
    label: '无',
    value: '0',
  },
  {
    label: '心脏病',
    value: '1',
  },
  {
    label: '肝炎',
    value: '2',
  },
  {
    label: '其他',
    value: '3',
  },
];

export default function Item(props) {
  const {
    getFieldDecorator,
    getFieldValue,

    dataset = data,
    radioFieldName = 'radioFieldName',
    inputFieldName = 'radioInputFieldName',
    radioFieldOptions = {},
    inputFieldOptions = {},
  } = props;

  const _provinceFieldOptions = {
    rules: [{ required: true, message: '请选择' }],
    // initialValue: '',
    ...radioFieldOptions,
  };
  const _inputFieldOptions = {
    rules: [{ required: true, message: '请输入' }],
    // initialValue: cityData[initProvinceId][0].value
    ...inputFieldOptions,
  };

  const picked = getFieldValue(radioFieldName) || [];
  const lastValue = dataset[dataset.length - 1].value;

  return (
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <Form.Item style={{ display: 'inline-block', margin: '0', marginRight: '10px' }}>
        {getFieldDecorator(radioFieldName, _provinceFieldOptions)(
          <Group>
            {dataset.map(({ value, label }) => (
              <Radio value={value}>{label}</Radio>
            ))}
          </Group>
        )}
      </Form.Item>
      {picked.includes(lastValue) && (
        <Form.Item style={{ display: 'inline-block', margin: '0' }}>
          {getFieldDecorator(inputFieldName, _inputFieldOptions)(<Input />)}
        </Form.Item>
      )}
    </div>
  );
}
