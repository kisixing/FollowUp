import { Radio, Icon, Button } from 'antd';
import { router } from 'umi';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { MODEL } from '../models/questionnaireModel';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(() => {
  const [state, setState] = useState({
    value: 'mobile',
  });
  const { value } = state;
  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" icon="check">
          发布
        </Button>
        <Button icon="arrow-left" style={{ marginLeft: '10px' }} onClick={() => router.goBack()}>
          返回
        </Button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Radio.Group
          defaultValue="a"
          size="default"
          style={{ marginBottom: '20px' }}
          value={value}
          onChange={e => {
            setState({ ...state, value: e.target.value });
          }}
        >
          <Radio.Button value="mobile">
            <Icon type="mobile" style={{ marginRight: '5px' }} />
            手机
          </Radio.Button>
          <Radio.Button value="desktop">
            <Icon type="desktop" style={{ marginRight: '5px' }} />
            电脑
          </Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ textAlign: 'center' }}>{value === 'mobile' ? <Mobile /> : <Desktop />}</div>
    </div>
  );
});
