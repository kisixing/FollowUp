import { Card } from 'antd';

import CustomizableTable from './CustomizableTable';
import data from './data';

export default ({ config }) => {
  const { columns, scroll, pagination } = config;

  const cardStyle = { margin: 10 };

  return (
    <div style={{ background: '#ECECEC', padding: '10px' }}>
      <Card style={cardStyle}>
        <CustomizableTable
          columns={columns}
          dataSource={data}
          scroll={scroll}
          pagination={pagination}
        />
      </Card>
    </div>
  );
};
