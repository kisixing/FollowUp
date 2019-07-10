import { Button, Input } from 'antd';

export default function ImportableTextarea({
  value = '',
  onChange = () => {},
  dataset = [],
  onInsert = () => {},
  onImport = () => {},
}) {
  return (
    <div>
      <Input.TextArea
        style={{ width: '80%' }}
        value={value}
        autosize={{ minRows: 2, maxRows: 6 }}
        onChange={e => onChange(e.target.value)}
      />
      <Button type="link" style={{ float: 'none' }} onClick={() => onImport()}>
        导入模板
      </Button>
      <div>
        您可以在提示文字中插入：
        {dataset.map(({ text }) => {
          return (
            <Button type="link" key={text} onClick={() => onInsert(text)}>
              {text}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
