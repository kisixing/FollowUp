import React, { Component } from 'react';
import Link from 'umi/link';

import { Card, Form, Table } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import StandardFormRow from '@/components/StandardFormRow';
import TagSelect from '@/components/TagSelect';
import Material from './Material';
import Preview from './Preview';

import styles from '../Questionnaire.less';

const introduction =
  '<p style="text-align: center;"><img src="http://obcdn.oss-cn-shenzhen.aliyuncs.com/images/20181207093708_449.gif?Expires=1859506628&OSSAccessKeyId=LTAI9jOS6g6sCFGf&Signature=vzonyHaSNQRQPT5ROLUbaLJ3Bkk%3D" alt="80px - 副本 (2).jpg"/></p><p style="border: 0px none; box-sizing: border-box; margin-top: 25px;"><br/></p><p style="margin-top: 25px; line-height: 2em;"></p><section style="display: flex;justify-content: center;align-items: center;"><section style="display: inline-block; background: rgb(255, 227, 10); border-radius: 6px; padding: 3px 7px; font-weight: bold; box-sizing: border-box;"><span style="color: #494429; font-size: 16px;">01</span></section><p><br/></p><p style="margin-top: 20px;"><br/></p><section style="display: inline-block;margin-top: 6px;margin-left: 5px;"><section class="135brush" data-brushtype="text" style="font-weight: bold; letter-spacing: 2px; line-height: 1.75em; color: rgb(63, 63, 63);"><p><span style="font-family: 宋体; color: #494429; font-size: 16px;">作息及卧位指导</span></p></section><section style="width: 3em; border-bottom: 2px solid rgb(63, 63, 63); float: right; box-sizing: border-box;"></section><section style="clear: both; width: 90%; border-bottom: 2px solid rgb(63, 63, 63); float: right; margin-top: 3px; box-sizing: border-box;" data-width="90%"></section></section><p><br/></p><p><br/></p></section><p></p><p><br/></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-size: 16px;"><span style="font-family: 宋体; font-size: 16px;">左侧卧位，保证充足睡眠（<strong>8~10小时/日</strong>）。临产后，若宫缩不强且未破膜，鼓励产妇在宫缩间歇期在室内走动，有助于加速产程进展。</span>&nbsp;</span></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-size: 16px;"><img src="http://obcdn.oss-cn-shenzhen.aliyuncs.com/images/20181207095737_822.jpg?Expires=1859507857&OSSAccessKeyId=LTAI9jOS6g6sCFGf&Signature=rUoT4h0z2ObuesBupou%2BHwKFb38%3D" alt="80px - 副本 (2).jpg"/></span></p><p><br/></p><p style="margin-top: 25px;"><br/></p><p style="margin-top: 25px; line-height: 2em;"></p><section style="display: flex;justify-content: center;align-items: center;"><section style="display: inline-block; background: rgb(255, 227, 10); border-radius: 6px; padding: 3px 7px; font-weight: bold; box-sizing: border-box;"><span style="color: #494429; font-size: 16px;">02</span></section><section style="display: inline-block;margin-top: 6px;margin-left: 5px;"><section class="135brush" data-brushtype="text" style="font-weight: bold; letter-spacing: 2px; line-height: 1.75em; text-align: center; color: rgb(63, 63, 63);"><p><span style="font-family: 宋体; color: #494429; font-size: 16px;">正常分娩的过程</span></p></section><section style="width: 3em; border-bottom: 2px solid rgb(63, 63, 63); float: right; box-sizing: border-box;"></section><section style="clear: both; width: 90%; border-bottom: 2px solid rgb(63, 63, 63); float: right; margin-top: 3px; box-sizing: border-box;" data-width="90%"></section></section></section><p></p><p><br/></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-size: 16px;"><span style="font-family: 宋体; font-size: 16px;">宫口开大3CM送产房。准备如下物品纸巾、妈妈待产包、毛巾、水杯、吸氧管、少许食物，脱掉内衣裤。</span> <br/></span></p><p style="margin-top: 25px;"><br/></p><p style="margin-top: 25px; line-height: 2em;"></p><section style="display: flex;justify-content: center;align-items: center;"><section style="display: inline-block; background: rgb(255, 227, 10); border-radius: 6px; padding: 3px 7px; font-weight: bold; box-sizing: border-box;"><span style="color: #494429; font-size: 16px;">03</span></section><section style="display: inline-block;margin-top: 6px;margin-left: 5px;"><section class="135brush" data-brushtype="text" style="font-weight: bold; letter-spacing: 2px; line-height: 1.75em; text-align: center; color: rgb(63, 63, 63);"><p><span style="font-family: 宋体; color: #494429; font-size: 16px;">指导饮食</span></p></section><section style="width: 3em; border-bottom: 2px solid rgb(63, 63, 63); float: right; box-sizing: border-box;"></section><section style="clear: both; width: 90%; border-bottom: 2px solid rgb(63, 63, 63); float: right; margin-top: 3px; box-sizing: border-box;" data-width="90%"></section></section></section><p></p><p><br/></p><p><br/></p><p style="margin-top: 25px; line-height: 2em;"><span style="font-family: 宋体; font-size: 16px;"><img src="http://obcdn.oss-cn-shenzhen.aliyuncs.com/images/20181207094403_237.jpg?Expires=1859507043&OSSAccessKeyId=LTAI9jOS6g6sCFGf&Signature=g%2FrodIaNXIBiJOC%2FGmjmJNDu2q8%3D" alt="80px - 副本 (2).jpg"/></span></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-family: 宋体; font-size: 16px;">间歇期少量多次进食高热量、易消化、清淡食物，注意摄入足够的水分，根据产妇自己的爱好，可选择米饭、面汤、稀饭、肉粥、点心、牛奶、果汁、苹果、西瓜、桔子、香蕉、巧克力等多样饮食。<br/></span></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-size: 16px;"><strong><span style="font-family: 宋体; font-size: 16px;">每日可进食4-5次，</span></strong><span style="font-family: 宋体; font-size: 16px;"><strong>少吃多餐</strong>。</span></span></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-family: 宋体; font-size: 16px;"><img src="http://obcdn.oss-cn-shenzhen.aliyuncs.com/images/20181207100010_548.jpg?Expires=1859508010&OSSAccessKeyId=LTAI9jOS6g6sCFGf&Signature=DyvsUv3r6TaAGCvHDuHGnFLVqXE%3D" alt="80px - 副本 (2).jpg"/></span></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-family: 宋体; font-size: 16px;">肌体需要的水分可由果汁、水果、糖水及白开水补充。</span></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-family: 宋体; font-size: 16px;">注意既不可过于饥渴，也不能暴饮暴食。尤其在炎热的夏天，临产时出汗多，再不好好进食、喝水，更容易引起脱水的情况的发生。</span></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-family: 宋体; font-size: 16px;">为了孩子及产妇自己的健康临产时注意饮食是很必要的。</span></p><p style="margin-top: 25px;"><br/></p><p style="margin-top: 25px; line-height: 2em;"></p><section style="display: flex;justify-content: center;align-items: center;"><section style="display: inline-block; background: rgb(255, 227, 10); border-radius: 6px; padding: 3px 7px; font-weight: bold; box-sizing: border-box;"><span style="color: #494429; font-size: 16px;">04</span></section><section style="display: inline-block;margin-top: 6px;margin-left: 5px;"><section class="135brush" data-brushtype="text" style="font-weight: bold; letter-spacing: 2px; line-height: 1.75em; text-align: center; color: rgb(63, 63, 63);"><p><span style="font-family: 宋体; color: #494429; font-size: 16px;">减轻宫缩痛的方法</span></p></section><section style="width: 3em; border-bottom: 2px solid rgb(63, 63, 63); float: right; box-sizing: border-box;"></section><section style="clear: both; width: 90%; border-bottom: 2px solid rgb(63, 63, 63); float: right; margin-top: 3px; box-sizing: border-box;" data-width="90%"></section></section></section><p></p><p><br/></p><p><br/></p><p style="margin-top: 25px; line-height: 2em;"><img src="http://obcdn.oss-cn-shenzhen.aliyuncs.com/images/20181207094507_318.jpg?Expires=1859507107&OSSAccessKeyId=LTAI9jOS6g6sCFGf&Signature=uopYPQXQSGNSaQaH%2FVQ9jVVfKf0%3D" alt="80px - 副本 (2).jpg"/><br/></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-family: 宋体; font-size: 16px;">指导深呼吸，若腰骶部胀痛时，用热水袋热敷腰骶部。</span></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-size: 16px;"><strong><span style="font-family: 宋体; font-size: 16px;">间歇期放松休息，恢复体力</span></strong><span style="font-family: 宋体; font-size: 16px;">。也可通过音乐、谈话等方式转移注意力，减轻其疼痛的感觉，也可以通过医院分娩镇痛的各种方式来缓解疼痛。</span></span></p><p style="margin-top: 25px;"><br/></p><p style="margin-top: 25px; line-height: 2em;"></p><section style="display: flex;justify-content: center;align-items: center;"><section style="display: inline-block; background: rgb(255, 227, 10); border-radius: 6px; padding: 3px 7px; font-weight: bold; box-sizing: border-box;"><span style="color: #494429; font-size: 16px;">05</span></section><section style="display: inline-block;margin-top: 6px;margin-left: 5px;"><section class="135brush" data-brushtype="text" style="font-weight: bold; letter-spacing: 2px; line-height: 1.75em; text-align: center; color: rgb(63, 63, 63);"><span style="font-family: 宋体; color: #494429; font-size: 16px;">排空膀胱</span></section><section style="width: 3em; border-bottom: 2px solid rgb(63, 63, 63); float: right; box-sizing: border-box;"></section><section style="clear: both; width: 90%; border-bottom: 2px solid rgb(63, 63, 63); float: right; margin-top: 3px; box-sizing: border-box;" data-width="90%"></section></section></section><p></p><p><br/></p><p><br/></p><p style="text-align: justify; margin-top: 25px; line-height: 2em;"><span style="font-family: 宋体; font-size: 16px;">每4小时排尿一次，以免膀胱充盈，影响宫缩及胎头下降。</span><br/></p><p><br/></p><p><br/></p><p><br/></p><p style="white-space: normal; line-height: normal; margin-top: 5px;"><img src="http://obcdn.oss-cn-shenzhen.aliyuncs.com/images/20181207094058_580.png?Expires=1859506858&OSSAccessKeyId=LTAI9jOS6g6sCFGf&Signature=SSnVO9Sel7AxqCbtx8qthZMCoY0%3D" alt="80px - 副本 (2).jpg"/><strong><span style="font-size: 14px; color: #262626;">暨南大学附属第一医院：</span></strong></p><p style="white-space: normal; line-height: normal; margin-top: 5px;"><strong><span style="font-size: 14px; color: #262626;">急诊</span></strong><span style="font-size: 14px; color: #262626;">：020-38688102</span></p><p style="white-space: normal; line-height: normal; margin-top: 5px;"><strong><span style="font-size: 14px; color: #262626;">咨询</span></strong><span style="font-size: 14px; color: #262626;">：020-38688066</span></p><p style="white-space: normal; line-height: normal; margin-top: 5px;"><strong><span style="font-size: 14px; color: #262626;">产科</span></strong><span style="font-size: 14px; color: #262626;">：020-38688700</span></p><p style="white-space: normal; line-height: normal; margin-top: 5px;"><strong><span style="font-size: 14px; color: #262626;">地址</span></strong><span style="font-size: 14px; color: #262626;">：广州市天河区黄埔大道西613号</span></p><section data-id="91030" class="_135editor" style="white-space: normal; border: 0px none; box-sizing: border-box;"><section style="text-align: center;"><section style="display: inline-block; width: 50px;"><span data-role="width" style="display: inline-block; width: 30px;"><img src="https://mpt.135editor.com/mmbiz_gif/cZV2hRpuAPjia3wvFh7v6xOPITOhPUzibhu0Qgb1BagCWkuKgcDOiaXic0LKAM35ic1JXO0QYKrgAiagpPB6bjaJEZMQ/640?wx_fmt=gif" data-type="gif" data-w="200" title="向下箭头gif动图分割线" data-color="#b6e4fd" data-custom="#b6e4fd" style="border: 0px none; width: 30px;" width="30" height="" border="0"/></span></section></section></section><section class="_135editor" data-tools="135编辑器" data-id="93677" style="border: 0px none; box-sizing: border-box;"><section style="padding: 1em; box-sizing: border-box;"><section style="width: 100%;border: 1px dashed #76553c;box-sizing: border-box;" data-width="100%"><section style="text-align: center;margin-top: -1em;"><section style="display: inline-block; background: rgb(118, 85, 60); color: rgb(255, 255, 255); border-radius: 10px; padding: 5px 1em; box-sizing: border-box;"><section class="135brush" data-brushtype="text" style="font-size: 14px;">长按二维码关注莲孕公众号</section></section><section style="padding: 0.8em 0.6em; box-sizing: border-box;"><section style="background: #f0c44e;color: #fff;"><section style="display: flex;justify-content: space-between;align-items: center;background: url(https://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xbG9nby5jbi9tbWJpel9wbmcvN1FSVHZrSzJxQzZSeUdjQ2NsSGliTXcwOHJZWk9PdGtmbzN4ZFhLMkVXM2VQWXQyNk1ZOUtGTVVYM0ZTTDRDNWhzUEFvaWJac3hucUx6R1pEdlBrYVA3dy8w) center;background-size: cover;"><section style="width: 100%; display: inline-block; font-size: 15px;" data-width="100%"><section class="135brush" data-brushtype="text"><p>精心打造</p><p>呵护您的健康</p></section></section><section style="width: 150px; padding: 10px; box-sizing: border-box;"><img src="https://bdn.135editor.com/files/users/571/5713282/201812/Bz227OAa_fzWd.jpg" alt="00000.jpg"/></section></section></section></section></section></section></section></section>';

const data = [
  {
    key: 1,
    type: '健康宣教',
    name: '妊娠糖尿病饮食建议',
    time: '2019-06-22',
    nums: 2,
    task: '妊娠糖尿病随访管理',
  },
  {
    key: 2,
    type: '活动通知',
    name: '无痛分娩讲座通知',
    time: '2019-06-22',
    nums: 0,
    task: '-',
  },
  {
    key: 3,
    type: '孕妇学校',
    name: '胎动计数',
    time: '2019-06-13',
    nums: 1,
    task: '孕妇学校通知',
  },
  {
    key: 4,
    type: '孕妇学校',
    name: ' 妊娠期体重控制',
    time: '2019-05-13',
    nums: 1,
    task: '孕妇学校通知',
  },
  {
    key: 5,
    type: '孕妇学校',
    name: ' 呼吸法课程',
    time: '2019-04-09',
    nums: 2,
    task: '孕妇学校通知、晚期孕期...',
  },
  {
    key: 6,
    type: '健康宣教',
    name: '妊娠糖尿病饮食建议',
    time: '2019-06-22',
    nums: 2,
    task: '妊娠糖尿病随访管理',
  },
  {
    key: 7,
    type: '活动通知',
    name: '无痛分娩讲座通知',
    time: '2019-06-22',
    nums: 0,
    task: '-',
  },
  {
    key: 8,
    type: '孕妇学校',
    name: '胎动计数',
    time: '2019-06-13',
    nums: 1,
    task: '孕妇学校通知',
  },
  {
    key: 9,
    type: '孕妇学校',
    name: ' 妊娠期体重控制',
    time: '2019-05-13',
    nums: 1,
    task: '孕妇学校通知',
  },
  {
    key: 10,
    type: '孕妇学校',
    name: ' 呼吸法课程',
    time: '2019-04-09',
    nums: 2,
    task: '孕妇学校通知、晚期孕期...',
  },
];

const FormItem = Form.Item;

@Form.create()
class MissionCareComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
    };
  }

  handleOk = e => {
    e.preventDefault();
    this.setState({ visible: false });
  };

  handleCancel = type => {
    switch (type) {
      case 'material':
        this.setState({ visible: false });
        break;
      case 'preview':
        this.setState({ previewVisible: false });
        break;
      default:
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, previewVisible, type, name, text, cover } = this.state;

    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All" />,
    };

    const category = [
      {
        id: 2,
        title: '健康宣教',
      },
      {
        id: 3,
        title: '高危宣教',
      },
      {
        id: 4,
        title: '活动通知',
      },
      {
        id: 5,
        title: '孕妇学校',
      },
      {
        id: 6,
        title: '临时宣教',
      },
    ];
    const secondary = [
      {
        id: 2,
        title: '已绑定任务',
      },
      {
        id: 3,
        title: '未绑定任务',
      },
    ];

    const columns = [
      {
        title: 'No.',
        dataIndex: 'key',
      },
      {
        title: '素材类型',
        dataIndex: 'type',
      },
      {
        title: '素材名称',
        dataIndex: 'name',
      },
      {
        title: '更新时间',
        dataIndex: 'time',
      },
      {
        title: '绑定任务数',
        dataIndex: 'nums',
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: '绑定的任务',
        dataIndex: 'task',
      },
      {
        title: '操作',
        render: (value, record) => (
          <div className={styles.actions}>
            <span
              onClick={() =>
                this.setState({
                  visible: true,
                  type: record.type,
                  name: record.name,
                  text: introduction,
                  cover: [
                    {
                      uid: '-1',
                      name: 'xxx.png',
                      status: 'done',
                      url:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    },
                  ],
                })
              }
            >
              编辑
            </span>
            <span onClick={() => this.setState({ previewVisible: true })}>预览 </span>
            <Link to="#">推送测试 </Link>
            <Link to="#" className={styles.cancel}>
              删除
            </Link>
          </div>
        ),
      },
    ];

    return (
      <div className={styles.filterCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable actionsText={actionsTextMap}>
                    {category.map(item => (
                      <TagSelect.Option key={item.id} value={item.id}>
                        {item.title}
                      </TagSelect.Option>
                    ))}
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="二级分类" block last>
              <FormItem>
                {getFieldDecorator('secondary')(
                  <TagSelect expandable actionsText={actionsTextMap}>
                    {secondary.map(item => (
                      <TagSelect.Option key={item.id} value={item.id}>
                        {item.title}
                      </TagSelect.Option>
                    ))}
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={data}
          pagination={{
            size: 'small',
            total: 54,
            pageSize: 10,
            showSizeChanger: true,
            // onShowSizeChange={ this.onShowSizeChange }
            showQuickJumper: true,
            // onChange: this.onChange,
            showTotal: total => `总记录数${total}/总页数:${Math.ceil(total / 10)}`,
          }}
        />
        <Material
          visible={visible}
          handleCancel={() => this.handleCancel('material')}
          handleOk={this.handleOk}
          type={type}
          name={name}
          text={text}
          cover={cover}
        />
        <Preview visible={previewVisible} handleCancel={() => this.handleCancel('preview')} />
      </div>
    );
  }
}

export default MissionCareComponent;
