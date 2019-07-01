import React from 'react';
import { Icon, Card, Tag, Avatar } from 'antd';
import styles from './index.less';
import svgAnswer from '@/assets/Phone/u4876.svg';
import svgTransfer from '@/assets/Phone/u4878.svg';
import CallIn from '@/components/Phone/CallIn';

class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'outlined',
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

  handleTheme = () => {
    let { theme } = this.state;
    theme = theme === 'outlined' ? 'twoTone' : 'outlined';
    this.setState({ theme });

    setTimeout(() => this.setState({ onCall: true }), 5000);
  };

  render() {
    // const { online } = this.props
    const { theme, onCall, visible } = this.state;

    const iconPhone = (
      <Icon type="phone" className={styles.iconPhone} onClick={this.handleTheme} theme={theme} />
    );

    const iconCard = (
      <Card
        className={styles.iconCard}
        title="有一通咨询电话待接入. . ."
        headStyle={{
          color: '#FFFFFF',
          // borderBottom: 0
        }}
        actions={[
          <Avatar
            src={svgAnswer}
            onClick={() => {
              this.setState({ visible: true, onCall: false });
            }}
          />,
          <Avatar src={svgTransfer} />,
        ]}
      >
        <div>
          <p>咨询者： 张自强</p>
          <div>
            随访标签： <Tag color="blue">粤语</Tag>
          </div>
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
        />
      </div>
    );
  }
}

export default Phone;
