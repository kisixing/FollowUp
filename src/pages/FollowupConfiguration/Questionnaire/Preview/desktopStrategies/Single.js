import { Radio } from 'antd';
import { dispatchCreator } from '../../models/questionnaireModel';

export default React.memo(
  connect(null)(({ dataset, value, onChange, dispatch, jumps = [] }) => {
    const _dispatch = dispatchCreator(dispatch);
    return (
      <Radio.Group
        onChange={e => {
          const { value: selectedValue } = e.target;
          const jumpData = jumps.find(_ => _.condition === selectedValue);
          if (jumpData) {
            _dispatch('updateState', { questionToScroll: jumpData.target });
          }
          onChange(selectedValue);
        }}
        value={value}
        style={{ display: 'block' }}
      >
        {dataset.map(({ label, id }) => {
          return (
            <Radio value={id} key={id}>
              {label}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  })
);
