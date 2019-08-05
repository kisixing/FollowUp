export const QUESTION_SYMBOL = {
  single: '1',
  multiple: '2',
  dropdown: '3',
  blank: '4',
  score: '5',
  remark: '6',
};
const { single, multiple, dropdown, blank, score, remark } = QUESTION_SYMBOL;
const selectableTypes = [single, multiple, dropdown];

export const TYPES = [
  {
    value: '0',
    label: '预留',
  },
  {
    value: single,
    label: '单选题',
  },
  {
    value: multiple,
    label: '多选题',
  },
  {
    value: dropdown,
    label: '下拉题',
  },
  {
    value: blank,
    label: '填空题',
  },
  {
    value: score,
    label: '打分题',
  },
  {
    value: remark,
    label: '段落说明',
  },
];

export const QUESTION_DATASET_SYMBOL = {
  normal: '0',
  other: '1',
};

export function getLabel(value) {
  const target = TYPES.find(_ => _.value === value);
  if (target) {
    return target.label;
  }
  return null;
}

export function isSingleType(type) {
  return type === single;
}

export function isSelectableType(type) {
  return selectableTypes.includes(type);
}

export default {};
