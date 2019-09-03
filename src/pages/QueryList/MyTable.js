import { Card } from 'antd';

import { useState } from 'react';
import Search from './Search';
import CustomizableTable from './CustomizableTable';

export default ({ data }) => {
  const { url, columns, scroll, pagination } = data;

  const [state, setstate] = useState({});
  const [searchItems, setsearchItems] = useState({});

  // 以后改成请求接口
  const heardSearch = (current = 1, items = searchItems) => {
    console.log(items, url, pagination, current);
    setsearchItems(items);
    import('./data.js').then(myModule => {
      const { data: res, total } = myModule.default;
      const dataSource = pagination
        ? res.slice(pagination * (current - 1), pagination * current)
        : res;
      setstate({ dataSource, total });
    });
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
          <Search data={heardData} onSearch={heardSearch} />
        </Card>
      )}
      <Card style={cardStyle}>
        <CustomizableTable
          columns={columns}
          dataSource={state}
          scroll={scroll}
          pagination={pagination}
          onSearch={heardSearch}
        />
      </Card>
    </div>
  );
};
