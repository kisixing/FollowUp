import { Form, Select } from 'antd';
import provinceData from '@/../mock/geographic/province.json';
import cityData from '@/../mock/geographic/city.json';

const { Option } = Select;
const initProvinceId = provinceData[0].id;

export default function Item(props) {
  const {
    getFieldDecorator,
    setFieldsValue,
    getFieldValue,

    provinceFieldName = 'provinceFieldName',
    cityFieldName = 'cityFieldName',
    provinceFieldOptions = {},
    cityFieldOptions = {},
  } = props;

  const _provinceFieldOptions = {
    rules: [{ required: true, message: '请输入省份' }],
    initialValue: initProvinceId,
    ...provinceFieldOptions,
  };
  const _cityFieldOptions = {
    rules: [{ required: true, message: '请输入城市' }],
    // initialValue: cityData[initProvinceId][0].id
    ...cityFieldOptions,
  };

  const handleProvinceChange = value => {
    setFieldsValue({
      [cityFieldName]: cityData[value][0].id,
    });
  };

  return (
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <Form.Item style={{ display: 'inline-block', margin: '0', marginRight: '10px' }}>
        {getFieldDecorator(provinceFieldName, _provinceFieldOptions)(
          <Select style={{ width: 120 }} onChange={handleProvinceChange}>
            {provinceData.map(({ id, name }) => (
              <Option key={id}>{name}</Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item style={{ display: 'inline-block', margin: '0' }}>
        {getFieldDecorator(cityFieldName, _cityFieldOptions)(
          <Select style={{ width: 120 }}>
            {(cityData[getFieldValue(provinceFieldName)] || []).map(({ id, name }) => (
              <Option key={id}>{name}</Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </div>
  );
}
