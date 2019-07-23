import { QUESTION_SYMBOL } from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';
import { Radio, Checkbox, Menu, Dropdown, Icon, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from './index.less';

const { single, multiple, dropdown, blank, score, remark } = QUESTION_SYMBOL;

const Single = React.memo(
  connect(null)(({ dataset, value, onChange }) => {
    return (
      <Radio.Group
        onChange={e => {
          onChange(e.target.value);
        }}
        value={value}
        style={{ display: 'block' }}
      >
        {dataset.map(({ label, id }) => {
          return (
            <Radio className={styles.datasetItem} value={id} key={id}>
              {label}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  })
);
const Multiple = React.memo(
  connect(null)(({ dataset, value, onChange }) => {
    return (
      <Checkbox.Group
        onChange={_value => {
          onChange(_value);
        }}
        value={value}
        style={{ display: 'block' }}
      >
        {dataset.map(({ label, id }) => {
          return (
            <Checkbox className={styles.datasetItem} value={id} key={id}>
              {label}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    );
  })
);
const DropdownType = React.memo(
  connect(null)(({ dataset, value, onChange }) => {
    const target = dataset.find(_ => _.id === value);
    const label = target && target.label;
    const menu = (
      <Menu
        onClick={({ key }) => {
          onChange(key);
        }}
      >
        {dataset.map(({ label: _label, id }) => {
          return <Menu.Item key={id}>{_label}</Menu.Item>;
        })}
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <div className={styles.datasetItem}>
          <div style={{ overflow: 'hidden' }}>
            {label}

            <Icon type="down" style={{ float: 'right', paddingTop: '6px' }} />
          </div>
        </div>
      </Dropdown>
    );
  })
);
const Score = React.memo(
  connect(null)(({ value, onChange }) => {
    return <Rate value={value} onChange={onChange} className={styles.datasetItem} />;
  })
);
const Blank = React.memo(
  connect(null)(({ value, onChange }) => {
    return (
      <TextArea
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.datasetItem}
      />
    );
  })
);

const Remark = React.memo(
  ({ title }) => {
    return <div>{title}</div>;
  },
  (prev, next) => {
    return prev.title === next.title && prev.questionType === next.questionType;
  }
);
const RenderType = {
  [single]: Single,
  [multiple]: Multiple,
  [dropdown]: DropdownType,
  [score]: Score,
  [blank]: Blank,
  [remark]: Remark,
};
export default React.memo(props => {
  const { type } = props;
  const Type = RenderType[type];
  return <Type {...props} />;
});
