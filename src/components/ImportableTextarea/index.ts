import React from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';

export interface MyDropdownProps {
  value?: string;
  onImport?: (value: string) => void;
  onInsert?: (value: string) => void;
  onChange?: (value: string) => void;
  dataset: Array<{ label: string; text: string }>;
}

interface ImportableTextarea extends WrappedFormUtils {}
declare class ImportableTextarea extends React.Component<MyDropdownProps, any> {}
export default ImportableTextarea;
