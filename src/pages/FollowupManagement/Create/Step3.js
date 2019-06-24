import {
  Tabs,
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
import { lh40, colorC, mRb8 } from './Step3.less';
import router from 'umi/router';
import Preview from './TaskPreview';
const { TabPane } = Tabs;
const reservationDateType = ['预约日期', '末次就诊日期'];
const reservationDuringType = ['之前', '当天', '之后'];
const reservationMediaType = ['微信', '短信', '电话'];
const { useState } = React;
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: '步骤1', content: <Content1 />, key: '1' },
      { title: '步骤2', content: 'Content of Tab Pane 2', key: '2' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    return (
      <div>
        <Tabs
          // hideAdd={false}
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

function Content1(props) {
  const [state, setState] = useState({
    formData: {
      dateType: reservationDateType[0],
      duringType: reservationDuringType[0],
      mediaType: reservationMediaType[0],
      IsfollowOrder: false,
      text: '',
    },
    previewVisible: true,
  });
  const { previewVisible, formData } = state;

  function _setFormData(key, value) {
    setState({
      ...state,
      formData: {
        ...formData,
        [key]: value,
      },
    });
  }
  const { dateType, duringType, mediaType, IsfollowOrder, text } = formData;

  function getDropDown(type, typeList) {
    return (
      <Dropdown overlay={getMenu(typeList, ({ key }) => _setFormData(type, key))}>
        <Button>
          {formData[type]} <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
  function setVisible(previewVisible) {
    setState({ ...state, previewVisible });
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
          {getDropDown('dateType', reservationDateType)}
          {getDropDown('duringType', reservationDuringType)}
          <Input style={{ width: '60px' }} /> 天 <TimePicker />
        </Input.Group>
      </Form.Item>

      <Form.Item label="选择媒介">
        <Radio.Group
          value={mediaType}
          onChange={({ target }) => {
            _setFormData('mediaType', target.value);
          }}
        >
          {reservationMediaType.map(r => (
            <Radio.Button value={r} key={r}>
              {r}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <label style={{ marginRight: 10 }}>
          选择媒介没发送成功，将按微信>短信>电话的先后顺序依次执行随访任务
        </label>
        <Switch
          checked={IsfollowOrder}
          onChange={IsfollowOrder => {
            _setFormData('IsfollowOrder', IsfollowOrder);
          }}
        ></Switch>
      </Form.Item>

      <Title label="判断条件" />

      <Form.Item label="条件">
        <Input.Group compact style={{ lineHeight: '32px' }}>
          {getDropDown('dateType', reservationDateType)}
          {getDropDown('duringType', reservationDuringType)}
          <Input style={{ width: '60px' }} /> 天 至 随访当天仍未复诊患者
        </Input.Group>
      </Form.Item>

      <Title label="随访内容" />

      <Form.Item label="提示文字">
        <Input.TextArea
          style={{ width: '80%' }}
          value={text}
          autosize={{ minRows: 2, maxRows: 6 }}
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
                onClick={() => _setFormData('text', formData.text.concat(' ', _, ' '))}
              >
                {_}
              </Button>
            );
          })}
        </div>
      </Form.Item>
      <Row>
        <Col offset={1}>
          <div className={lh40}>
            <Checkbox> 附加链接 </Checkbox>
          </div>
          <div className={lh40}>
            <Radio> 预约挂号 </Radio>
            <label className={colorC}>提示：仅微信推送的消息可附加</label>
          </div>
          <div className={lh40}>
            <Radio> 绑定问卷 </Radio>
            <Button type="primary" ghost>
              未及时就诊原因
            </Button>
            <Button type="link">其他问卷</Button>
          </div>
        </Col>
      </Row>
      <div style={{ textAlign: 'center' }}>
        <Button className={mRb8} onClick={() => setVisible(true)}>
          预览
        </Button>
        <Button type="primary" className={mRb8}>
          上一步
        </Button>
        <Button type="primary" className={mRb8}>
          下一步
        </Button>
        <Button type="primary" className={mRb8} onClick={() => router.push('step4')}>
          确定
        </Button>
      </div>
      <Preview
        visible={previewVisible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          setVisible(false);
        }}
      ></Preview>
    </Form>
  );
}
export function Title({ label, isTop }) {
  return (
    <div style={{ fontWeight: 'bold', marginTop: isTop || '30px', marginBottom: '10px' }}>
      {label}
    </div>
  );
}

function getMenu(arr, handleMenuClick) {
  return (
    <Menu onClick={handleMenuClick}>
      {arr.map(a => (
        <Menu.Item key={a}>{a}</Menu.Item>
      ))}
    </Menu>
  );
}
