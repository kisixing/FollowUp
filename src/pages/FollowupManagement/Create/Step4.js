import {
  Transfer,
  Modal,
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
const CheckboxGroup = Checkbox.Group;

import { lh40, colorC, mRb8 } from './Step3.less';
import router from 'umi/router';
const { TabPane } = Tabs;
const reservationDateType = ['预约日期', '末次就诊日期'];
const reservationDuringType = ['之前', '当天', '之后'];
const filterType = ['复诊预约时间段', '超时天数', '高危等级', '跟踪结果'];
const taskTableContent = setMock([
  '姓名',
  '就诊卡号',
  '手机号',
  '现孕周',
  '高危等级',
  '上次就诊时间',
  '复诊预约时间',
  '超时天数',
  '短信回执',
  '电话状态',
  '电话随访记录超时原因',
  '电话随访备注',
]);
const statisticTableContent = setMock([
  '姓名',
  '就诊卡号',
  '手机号',
  '孕周',
  '高危等级',
  '上次就诊时间',
  '复诊预约时间',
  '按时复诊',
  '跟踪结果',
  '实际复诊时间',
  '追踪方式',
  '电话状态',
]);

function setMock(arr) {
  return arr.map(a => {
    return {
      key:
        a +
        Math.random()
          .toString(16)
          .slice(2),
      title: a,
      // description: `description of content${a}`,
      // chosen:true
    };
  });
}

const { useState } = React;
import { Title } from './Step3';

export default function(props) {
  const [state, setState] = useState({
    dateType: reservationDateType[0],
    duringType: reservationDuringType[0],
    IsfollowOrder: false,
    taskVisible: false,
    taskTargetKeys: [],
    _taskTargetKeys: [],
    statisticTargetKeys: [],
    _statisticTargetKeys: [],
  });

  function _setFormData(key, value) {
    setState({ ...state, [key]: value });
  }
  const {
    dateType,
    duringType,
    IsfollowOrder,
    taskVisible,
    taskTargetKeys,
    _taskTargetKeys,
  } = state;

  function getDropDown(type, typeList) {
    return (
      <Dropdown overlay={getMenu(typeList, ({ key }) => _setFormData(type, key))}>
        <Button>
          {state[type]} <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }

  function DirtyTransferModal(type) {
    return (
      <TransferModal
        visible={`${type}Visible`}
        dataSource={taskTableContent}
        targetKeys={_taskTargetKeys}
        onOk={() => {
          setState({ ...state, taskTargetKeys: _taskTargetKeys, taskVisible: false });
        }}
        onCancel={() => setState({ ...state, _taskTargetKeys: [], taskVisible: false })}
        onChange={targetkeys => {
          setState({ ...state, _taskTargetKeys: targetkeys });
        }}
      />
    );
  }

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 2, offset: 1 }}
      wrapperCol={{ span: 21 }}
      labelAlign="left"
    >
      <Title label="任务管理" isTop />
      <Row>
        <Col offset={1}>
          <div className={lh40}>
            <Checkbox>人工管理</Checkbox>
          </div>
        </Col>
      </Row>
      <Form.Item label="对象范围">
        <Input.Group compact style={{ lineHeight: '32px' }}>
          {getDropDown('dateType', reservationDateType)}
          {getDropDown('duringType', reservationDuringType)}
          <Input style={{ width: '60px' }} /> 天起 仍未复诊孕妇
        </Input.Group>
      </Form.Item>

      <Form.Item label="筛选条件">{CheckboxList({ list: filterType })}</Form.Item>

      <Form.Item label="表格内容">
        <Button
          type="link"
          style={{ whiteSpace: 'normal', textAlign: 'left' }}
          onClick={() => setState({ ...state, taskVisible: true })}
        >
          {taskTargetKeys.length > 0 ? (
            taskTableContent
              .filter(t => taskTargetKeys.includes(t.key))
              .map(t => t.title)
              .join('、')
          ) : (
            <a>添加</a>
          )}
        </Button>
        <TransferModal
          visible={taskVisible}
          dataSource={taskTableContent}
          targetKeys={_taskTargetKeys}
          onOk={() => {
            setState({ ...state, taskTargetKeys: _taskTargetKeys, taskVisible: false });
          }}
          onCancel={() => setState({ ...state, _taskTargetKeys: [], taskVisible: false })}
          onChange={targetkeys => {
            setState({ ...state, _taskTargetKeys: targetkeys });
          }}
        />
      </Form.Item>
      <div style={{ textAlign: 'center' }}>
        <Button className={mRb8}>预览</Button>
        <Button type="primary" className={mRb8} onClick={() => router.push('Step4')}>
          发布
        </Button>
      </div>
    </Form>
  );
}

function TransferModal({ visible, onOk, onCancel, targetKeys, dataSource, onChange }) {
  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onOk}>
      <Transfer
        targetKeys={targetKeys}
        dataSource={dataSource}
        render={item => item.title}
        onChange={onChange}
      ></Transfer>
    </Modal>
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

function CheckboxList({ list }) {
  const [state, setState] = useState({
    checkedList: [],
    indeterminate: false,
    checkAll: false,
  });

  const onChange = checkedList => {
    setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < list.length,
      checkAll: checkedList.length === list.length,
    });
  };

  const onCheckAllChange = e => {
    setState({
      checkedList: e.target.checked ? list : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  return (
    <div>
      <CheckboxGroup options={list} value={state.checkedList} onChange={onChange} />
      <Checkbox
        indeterminate={state.indeterminate}
        onChange={onCheckAllChange}
        checked={state.checkAll}
      >
        全选
      </Checkbox>
    </div>
  );
}
