import React from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';

export interface MyDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  dataset: Array<{ label: string; value: string }>;
}

interface MyDropdown extends WrappedFormUtils {}
declare class MyDropdown extends React.Component<MyDropdownProps, any> {}
export default MyDropdown;
