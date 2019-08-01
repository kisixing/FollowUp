import { Form, Select } from 'antd';
import provinceData from '@/../mock/geographic/province.json';
import cityData from '@/../mock/geographic/city.json';

const { Option } = Select;
// const provinceData = ['Zhejiang', 'Jiangsu'];
// const cityData = {
//   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
//   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
// };

const initProvinceId = provinceData[0].id;

export default function Item(props) {
  const {
    getFieldDecorator,
    setFieldsValue,
    getFieldValue,
    label = '地址',
    option1 = [
      'note1',
      {
        rules: [{ required: true, message: '请输入省份' }],
        initialValue: initProvinceId,
      },
    ],
    option2 = [
      'note222222222',
      {
        rules: [{ required: true, message: '请输入城市' }],
        // initialValue: cityData[initProvinceId][0].id
      },
    ],
  } = props;

  const handleProvinceChange = value => {
    setFieldsValue({
      [option2[0]]: cityData[value][0].id,
    });
  };

  return (
    <Form.Item label={label} {...props}>
      <Form.Item style={{ display: 'inline-block', margin: '0', marginRight: '10px' }}>
        {getFieldDecorator(...option1)(
          <Select style={{ width: 120 }} onChange={handleProvinceChange}>
            {provinceData.map(({ id, name }) => (
              <Option key={id}>{name}</Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item style={{ display: 'inline-block', margin: '0' }}>
        {getFieldDecorator(...option2)(
          <Select style={{ width: 120 }}>
            {(cityData[getFieldValue(option1[0])] || []).map(({ id, name }) => (
              <Option key={id}>{name}</Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </Form.Item>
  );
}
