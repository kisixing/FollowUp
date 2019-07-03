import { Button, Form, Input, Radio, Switch, Checkbox, Col, Row, DatePicker } from 'antd';
import { lh40 } from './index.less';
// import router from 'umi/router';
import { getValueOfFirstItem } from '@/utils/utils';

const mapStateToProps = () => {
  return { satisfactionCreation_model: {} };
};
const Content = connect(mapStateToProps)(function A({ satisfactionCreation_model }) {
  const reservationDuringType = satisfactionCreation_model.reservationDuringType || [];
  const initDuringType = getValueOfFirstItem(reservationDuringType, F_VALUE, '');

  const reservationMediaType = ['微信', '短信', '电话'].map(_ => ({ value: _, label: _ }));
  const initMediaType = getValueOfFirstItem(reservationMediaType, F_VALUE, '');

  const [state, setState] = useState({
    formData: {
      followupDuringType: initDuringType,
      followupDay: 5,
      mediaType: initMediaType,
      IsfollowOrder: false,
      text: '',
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
          预约日期
          {` `}前{` `}
          <Input
            style={{ width: '60px' }}
            value={followupDay}
            onChange={({ target }) => {
              _setFormData({ followupDay: target.value });
            }}
          />
          {` `}天{` `}
          <DatePicker />
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

      <Title label="消息提示" />

      <Form.Item label="提示文字">
        <Input.TextArea
          style={{ width: '80%' }}
          value={text}
          autosize={{ minRows: 2, maxRows: 6 }}
          onChange={e => _setFormData({ text: e.target.value })}
        />
        <Button type="link" style={{ float: 'none' }}>
          导入模板
        </Button>
        <div>
          您可以在提示文字中插入：
          {['孕妇姓名', '复诊预约时间', '超时天数'].map(_ => {
            return (
              <Button
                type="link"
                key={_}
                onClick={() => _setFormData({ text: formData.text.concat(' ', _, ' ') })}
              >
                {_}
              </Button>
            );
          })}
        </div>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" ghost>
          未及时就诊原因
        </Button>
        <span>
          提示：可分别针对不同科室、不同检查项目等发送不同的文字，不在定制范围内的通知对象按上方提示文字发送
        </span>
      </Form.Item>

      <Title label="人工管理" />

      <Row>
        <Col offset={1}>
          <div className={lh40}>
            <Checkbox>
              {' '}
              <span>问卷分数</span>
            </Checkbox>
            <Input.Group compact style={{ lineHeight: '32px', display: 'inline-block' }}>
              <Input
                style={{ width: '60px' }}
                value={judgeDay}
                onChange={({ target }) => _setFormData({ judgeDay: target.value })}
              />{' '}
              分
            </Input.Group>
          </div>
          <div className={lh40}>
            <Checkbox> 未填问卷 </Checkbox>
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