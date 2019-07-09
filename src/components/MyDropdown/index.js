import { Dropdown, Button, Menu, Icon } from 'antd';

export default function MyDropdown({
  value,
  placeholder = '',
  onChange = () => {},
  dataset = [],
  labelKey = F_LABEL,
  valueKey = F_VALUE,
}) {
  const [state, setState] = useState({
    _value: '',
  });

  let target = dataset.find(_ => _[valueKey] === value);
  if (!target) {
    target = dataset.find(_ => _[valueKey] === state._value);
  }
  const label = (target && target[labelKey]) || placeholder;
  return (
    <div>
      <Dropdown
        overlay={
          <Menu
            onClick={({ key }) => {
              setState({ _value: key });
              onChange(key);
            }}
          >
            {dataset.map(_ => {
              const _label = _[labelKey];
              const _value = _[valueKey];
              return <Menu.Item key={_value}>{_label}</Menu.Item>;
            })}
          </Menu>
        }
      >
        <Button>
          {label}
          <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
  );
}
