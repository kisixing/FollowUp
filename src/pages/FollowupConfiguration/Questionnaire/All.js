import request from '@/utils/request';
import router from 'umi/router';
import { Card, Button, List, Icon, Select, Row, Col, Input } from 'antd';
import styles from '../Questionnaire.less';
import Item from './Item';

const SelectOption = Select.Option;

// const typeMaps = ['产科','妇科','急诊']

const All = () => {
  const [state, setState] = useState({
    list: [],
    type: null,
    status: null,
    title: '',
    loading: false,
  });
  const { list, status, type, loading, title } = state;

  const fetchData = () => {
    setState({ ...state, loading: true });
    request.post('/api/questionnaire/list', { data: { status, type, title } }).then(data => {
      setState({ ...state, list: data, loading: false });
    });
  };
  useEffect(() => {
    fetchData();
  }, [type, status]);

  return (
    <div className={styles.filterCardList}>
      <Card>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            问卷标题 ：{' '}
            <Input
              placeholder="请输入"
              style={{ width: '60%' }}
              value={title}
              onChange={e => setState({ ...state, title: e.target.value })}
              onPressEnter={fetchData}
            />
          </Col>
          <Col md={8} sm={24}>
            分类选择 ：
            <Select
              placeholder="请选择"
              style={{ width: '60%' }}
              value={type}
              onChange={e => {
                setState({ ...state, type: e });
              }}
            >
              <SelectOption value={null}>全部</SelectOption>
              <SelectOption value={0}>产科</SelectOption>
              <SelectOption value={1}>妇科</SelectOption>
              <SelectOption value={2}>急诊</SelectOption>
            </Select>
          </Col>
          <Col md={8} sm={24}>
            运行状态 ：
            <Select
              placeholder="请选择"
              style={{ width: '60%' }}
              value={status}
              onChange={e => {
                setState({ ...state, status: e });
              }}
            >
              <SelectOption value={null}>全部</SelectOption>
              <SelectOption value={0}>运行中</SelectOption>
              <SelectOption value={1}>草稿</SelectOption>
              <SelectOption value={2}>已暂停</SelectOption>
            </Select>
          </Col>
        </Row>
      </Card>

      <List
        loading={loading}
        style={{ marginTop: 24 }}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={['', ...list]}
        renderItem={item =>
          item ? (
            <Item {...item} />
          ) : (
            <List.Item>
              <Button
                type="dashed"
                style={{
                  width: '100%',
                  height: 200,
                  fontSize: 20,
                }}
                onClick={() => router.push('create/step1')}
              >
                <Icon type="plus" /> 新建
              </Button>
            </List.Item>
          )
        }
      />
    </div>
  );
};

export default connect()(All);
