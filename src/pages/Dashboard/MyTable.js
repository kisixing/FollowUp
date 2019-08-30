import { Card } from 'antd';

import { useState } from 'react';
import Search from './Search';
import CustomizableTable from './CustomizableTable';

export default ({ data }) => {
  const { url, columns, scroll, pagination } = data;

  const [state, setstate] = useState([]);

  // 以后改成请求接口
  const heardSearch = (items, address) => {
    console.log(items, address);
    import('./data.js').then(myModule => setstate(myModule.default));
  };

  const heardData = columns
    .filter(ele => ele.search)
    .map(ele => ({
      key: ele.key,
      title: ele.title,
      search: ele.search,
    }));

  const cardStyle = { margin: 10 };

  return (
    <div style={{ background: '#ECECEC', padding: '10px' }}>
      {heardData && (
        <Card style={cardStyle}>
          <Search data={heardData} url={url} onSearch={heardSearch} />
        </Card>
      )}
      <Card style={cardStyle}>
        <CustomizableTable
          columns={columns}
          dataSource={state}
          scroll={scroll}
          pagination={pagination}
        />
      </Card>
    </div>
  );
};
