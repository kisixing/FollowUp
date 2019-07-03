/*
 * @Description: 用药指导
 * @Author: Zhong Jun
 * @Date: 2019-07-03 22:19:24
 */
import React, { PureComponent } from 'react';
import Iframe from '@/components/Iframe';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class MedicationGuide extends PureComponent {
  componentDidMount() {
    // const dom =
    //   document.getElementById('iframe').contentWindow.document.getElementById('sitenav');
    // console.log('styles', dom)
    // dom.style.display = "none";
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div style={{ overflow: 'hidden' }}>
          <Iframe
            url="http://drugs.dxy.cn/index.htm"
            id="iframe"
            display="initial"
            styles={{
              width: '100%',
              height: 'calc(100vh - 82px)',
              marginTop: '-76px',
              border: 'none',
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default MedicationGuide;
