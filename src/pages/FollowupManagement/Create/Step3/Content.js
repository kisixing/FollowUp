import {
  Button,
  Dropdown,
  Menu,
  Icon,
  Form,
  Input,
  TimePicker,
  Radio,
  Switch,
  Checkbox,
  Col,
  Row,
} from 'antd';
import { lh40, colorC } from './index.less';
import router from 'umi/router';
import { getValueOfFirstItem } from '@/utils/utils';
import ImportableTextarea from '@/components/ImportableTextarea';

const mapStateToProps = ({ followupCreation_model }) => {
  return { followupCreation_model };
};
const Content = connect(mapStateToProps)(function A({ followupCreation_model }) {
  const reservationDateType = followupCreation_model.reservationDateType || [];
  const initDateType = getValueOfFirstItem(reservationDateType, F_VALUE, '');

  const reservationDuringType = followupCreation_model.reservationDuringType || [];
  const initDuringType = getValueOfFirstItem(reservationDuringType, F_VALUE, '');

  const reservationMediaType = followupCreation_model.reservationMediaType || [];
  const initMediaType = getValueOfFirstItem(reservationMediaType, F_VALUE, '');

  const [state, setState] = useState({
    formData: {
      followupDateType: initDateType,
      followupDuringType: initDuringType,
      followupDay: 5,
      mediaType: initMediaType,
      IsfollowOrder: false,
      text: '',
      judgeDateType: initDateType,
      judgeDuringType: initDuringType,
      judgeDay: 7,
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
  const { followupDay, judgeDay, mediaType, IsfollowOrder, text } = formData;

  function getDropDown(type, typeList) {
    const a = typeList.filter(_ => _.value === formData[type]);
    function getMenu(arr, handleMenuClick) {
      return (
        <Menu onClick={handleMenuClick}>
          {arr.map(({ value, label }) => (
            <Menu.Item key={value}>{label}</Menu.Item>
          ))}
        </Menu>
      );
    }
    return (
      <Dropdown
        overlay={getMenu(typeList, ({ key }) => {
          _setFormData({ [type]: key });
        })}
      >
        <Button>
          {getValueOfFirstItem(a, F_LABEL, '请选择')} <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 2, offset: 1 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
    >
      <Title label="随访时间&媒介" isTop />
      <Form.Item label="时间">
        <Input.Group compact style={{ lineHeight: '32px' }}>
          {getDropDown('followupDateType', reservationDateType)}
          {getDropDown('followupDuringType', reservationDuringType)}
          <Input
            style={{ width: '60px' }}
            value={followupDay}
            onChange={({ target }) => {
              _setFormData({ followupDay: target.value });
            }}
          />{' '}
          天 <TimePicker />
        </Input.Group>
      </Form.Item>

      <Form.Item label="选择媒介">
        <Radio.Group
          value={mediaType}
          onChange={({ target }) => {
            _setFormData({ mediaType: target.value });
          }}
        >
          {reservationMediaType.map(r => (
            <Radio.Button value={r[F_VALUE]} key={r[F_VALUE]}>
              {r[F_LABEL]}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <span style={{ marginRight: 10 }}>
          {`选择媒介没发送成功，将按微信>短信>电话的先后顺序依次执行随访任务`}
        </span>
        <Switch
          checkedChildren="开"
          unCheckedChildren="关"
          checked={IsfollowOrder}
          onChange={_IsfollowOrder => {
            _setFormData({ IsfollowOrder: _IsfollowOrder });
          }}
        />
      </Form.Item>

      <Title label="判断条件" />

      <Form.Item label="条件">
        <Input.Group compact style={{ lineHeight: '32px' }}>
          {getDropDown('judgeDateType', reservationDateType)}
          {getDropDown('judgeDuringType', reservationDuringType)}
          <Input
            style={{ width: '60px' }}
            value={judgeDay}
            onChange={({ target }) => _setFormData({ judgeDay: target.value })}
          />{' '}
          天 至 随访当天仍未复诊患者
        </Input.Group>
      </Form.Item>

      <Title label="随访内容" />

      <Form.Item label="提示文字">
        <ImportableTextarea
          dataset={['孕妇姓名', '复诊预约时间', '超时天数'].map(_ => ({ text: _ }))}
          onChange={_text => _setFormData({ text: _text })}
          onInsert={_text => _setFormData({ text: formData.text.concat('[', _text, ']') })}
          value={text}
        />
      </Form.Item>
      <Row>
        <Col offset={1}>
          <div className={lh40}>
            <Checkbox> 附加链接 </Checkbox>
          </div>
          <div className={lh40}>
            <Radio> 预约挂号 </Radio>
            <span className={colorC}>提示：仅微信推送的消息可附加</span>
          </div>
          <div className={lh40}>
            <Radio> 绑定问卷 </Radio>
            <Button type="primary" ghost>
              未及时就诊原因
            </Button>
            <Button
              type="link"
              onClick={() => router.push('/followup-configuration/Questionnaire')}
            >
              其他问卷
            </Button>
          </div>
        </Col>
      </Row>
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
