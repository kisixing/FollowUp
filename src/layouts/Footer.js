import React, { Fragment } from 'react';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const FooterView = () => (
  <GlobalFooter
    style={{ margin: '12px 0' }}
    copyright={
      <Fragment>
        Copyright <Icon type="copyright" /> 2019 广州莲印科技
      </Fragment>
    }
  />
);
export default FooterView;
