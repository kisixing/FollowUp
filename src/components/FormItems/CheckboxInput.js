import { Form, Checkbox, Input } from 'antd';

const { Group } = Checkbox;

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
    checkboxFieldName = 'checkboxFieldName',
    inputFieldName = 'inputFieldName',
    checkboxFieldOptions = {},
    inputFieldOptions = {},
  } = props;

  const _checkboxFieldOptions = {
    rules: [{ required: true, message: '请选择' }],
    // initialValue: '',
    ...checkboxFieldOptions,
  };
  const _inputFieldOptions = {
    rules: [{ required: true, message: '请输入' }],
    // initialValue: cityData[initProvinceId][0].value
    ...inputFieldOptions,
  };

  const picked = getFieldValue(checkboxFieldName) || [];
  const lastValue = dataset[dataset.length - 1].value;

  return (
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <Form.Item style={{ display: 'inline-block', margin: '0', marginRight: '10px' }}>
        {getFieldDecorator(checkboxFieldName, _checkboxFieldOptions)(
          <Group>
            {dataset.map(({ value, label }) => (
              <Checkbox value={value}>{label}</Checkbox>
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
