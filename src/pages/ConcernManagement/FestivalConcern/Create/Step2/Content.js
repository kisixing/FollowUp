import { Form, Input, Radio, TimePicker } from 'antd';
// import router from 'umi/router';
import { getValueOfFirstItem } from '@/utils/utils';
import MyDropdown from '@/components/MyDropdown';
import ImportableTextarea from '@/components/ImportableTextarea';

const mapStateToProps = ({ satisfactionCreation_model }) => {
  return { satisfactionCreation_model };
};
const dataset1 = ['春节', '中秋'].map(_ => ({ label: _, value: Math.random().toString() }));
const dataset2 = ['当天', '之前'].map(_ => ({ label: _, value: Math.random().toString() }));
const dataset3 = [
  '仅1次，不重复发送',
  '重复发送，系统自动沿用问候语发送',
  '重复发送，提醒修改问候语发送',
].map(_ => ({ label: _, value: Math.random().toString() }));
const dataset4 = ['微信', '短信', '电话'].map(_ => ({ label: _, value: Math.random().toString() }));

const Content = connect(mapStateToProps)(() => {
  const [state, setState] = useState({
    formData: {
      value1: getValueOfFirstItem(dataset1, F_VALUE, ''),
      value2: getValueOfFirstItem(dataset2, F_VALUE, ''),
      value3: getValueOfFirstItem(dataset3, F_VALUE, ''),
      value4: getValueOfFirstItem(dataset4, F_VALUE, ''),
      followupDay: 5,
      text: '',
      judgeDuringType: '',
      judgeDay: 7,
      date: '',
    },
  });

  const { formData } = state;
  function _setFormData(data) {
    setState({
      ...state,
      formData: {
        ...formData,
        ...data,
      },
    });
  }
  const { followupDay, value4, value3, text, value1, value2 } = formData;

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 2, offset: 1 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
    >
      <Title label="随访时间&媒介" isTop />

      <Form.Item label="选择传统节日">
        <MyDropdown
          dataset={dataset1}
          value={value1}
          onChange={value => _setFormData({ value1: value })}
        />
      </Form.Item>

      <Form.Item label="关怀推送时间">
        <Input.Group compact style={{ lineHeight: '32px' }}>
          节日{' '}
          <MyDropdown
            dataset={dataset2}
            value={value2}
            onChange={value => _setFormData({ value2: value })}
          />
          <Input
            style={{ width: '60px' }}
            value={followupDay}
            onChange={({ target }) => {
              _setFormData({ followupDay: target.value });
            }}
          />
          {` `}天{` `}
          <TimePicker />
        </Input.Group>
      </Form.Item>

      <Form.Item label="选择媒介">
        <Radio.Group
          value={value4}
          onChange={({ target }) => {
            _setFormData({ value4: target.value });
          }}
        >
          {dataset4.map(r => (
            <Radio.Button value={r[F_VALUE]} key={r[F_VALUE]}>
              {r[F_LABEL]}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="是否每年重复">
        <Radio.Group
          value={value3}
          onChange={({ target }) => {
            _setFormData({ value3: target.value });
          }}
        >
          {dataset3.map(({ value, label }) => (
            <div>
              <Radio value={value} key={value}>
                {label}
              </Radio>
            </div>
          ))}
        </Radio.Group>
        <div>
          <span>提醒期：</span>
          节日前 <Input style={{ width: 50 }} /> 天
        </div>
      </Form.Item>

      <Title label="编辑消息" />

      <Form.Item label="提示文字">
        <ImportableTextarea
          dataset={['患者姓名', '医院名称', '节日名称'].map(_ => ({ text: _ }))}
          onChange={_text => _setFormData({ text: _text })}
          onInsert={_text => _setFormData({ text: formData.text.concat('[', _text, ']') })}
          value={text}
        />
      </Form.Item>
    </Form>
  );
});
export function Title({ label, isTop }) {
  return (
    <div style={{ fontWeight: 'bold', marginTop: isTop || '30px', marginBottom: '10px' }}>
      {label}
    </div>
  );
}

export default Content;
