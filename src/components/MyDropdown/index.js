import { Dropdown, Button, Menu, Icon } from 'antd';

export default function MyDropdown({
  value,
  onChange = () => {},
  dataset = [],
  labelKey = F_LABEL,
  valueKey = F_VALUE,
}) {
  // debugger
  const target = dataset.find(_ => _[valueKey] === value);
  const label = (target && target[labelKey]) || 'Error Value';
  return (
    <div>
      <Dropdown
        overlay={
          <Menu
            onClick={({ key }) => {
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
