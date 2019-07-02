import React from 'react';
import { Card, Tag, Avatar, Divider } from 'antd';
import styles from './index.less';
import svgAnswer from '@/assets/Phone/u4876.svg';
import svgTransfer from '@/assets/Phone/u4878.svg';
import pngOnline from '@/assets/Phone/u4546.png';
import pngOffline from '@/assets/Phone/u4547.png';
import CallIn from '@/components/Phone/CallIn';

class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifOnline: false,
      onCall: false,
      visible: false,
    };
  }

  handleOk = () => {
    this.setState({ visible: false });
  };

  handleNext = () => {
    this.setState({ visible: false });
  };

  handleOnline = () => {
    const { ifOnline } = this.state;
    this.setState({ ifOnline: !ifOnline });

    // eslint-disable-next-line no-unused-expressions
    !ifOnline &&
      setTimeout(() => {
        // eslint-disable-next-line no-shadow
        const { ifOnline } = this.state;
        // eslint-disable-next-line no-unused-expressions
        ifOnline && this.setState({ onCall: true });
      }, 3000);
  };

  render() {
    // const { online } = this.props
    const { ifOnline, onCall, visible } = this.state;

    const iconPhone = ifOnline ? (
      <Avatar
        src={pngOnline}
        className={styles.iconPhone}
        onClick={this.handleOnline}
        style={{ height: '100px', width: '100px' }}
      />
    ) : (
      <Avatar
        src={pngOffline}
        className={styles.iconPhone}
        onClick={this.handleOnline}
        style={{ height: '75px', width: '100px' }}
      />
    );

    const iconCard = (
      <Card
        className={styles.iconCard}
        title="有一通咨询电话待接入. . ."
        headStyle={{
          color: '#FFFFFF',
          borderBottom: 0,
        }}
        actions={[
          <Avatar
            src={svgAnswer}
            onClick={() => {
              this.setState({ visible: true, onCall: false });
            }}
            size={64}
          />,
          <Avatar src={svgTransfer} size={64} onClick={() => this.setState({ onCall: false })} />,
        ]}
      >
        <div>
          <span>咨询者： 张自强</span>
          <Divider type="vertical" style={{ margin: '0 20px' }} />
          <span>
            随访标签： <Tag color="blue">粤语</Tag>
          </span>
        </div>
      </Card>
    );

    return (
      <div>
        {onCall ? iconCard : iconPhone}
        <CallIn
          visible={visible}
          onOk={this.handleOk}
          onNext={this.handleNext}
          onCancel={() => this.setState({ visible: false })}
          detail="callin"
        />
      </div>
    );
  }
}

export default Phone;
