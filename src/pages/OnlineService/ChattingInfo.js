import { Tabs, Collapse } from 'antd';
import styles from './ChattingInfo.less';
import { PatientInfo } from '@/components/Phone/Call';

const { Panel } = Collapse;
function mapStateToProps(rootState) {
  return { rootState };
}

export default connect(mapStateToProps)(() => {
  const [state, setState] = useState({
    activeLeft: true,
    activeKey: '1',
  });
  const { activeLeft, activeKey } = state;
  const activeSyle = { background: 'white', color: 'blue' };
  return (
    <div>
      <div className={styles.togglePane}>
        <div
          style={activeLeft ? activeSyle : {}}
          onClick={() => setState({ ...state, activeLeft: true })}
        >
          患者信息
        </div>
        <div
          style={!activeLeft ? activeSyle : {}}
          onClick={() => setState({ ...state, activeLeft: false })}
        >
          知识库
        </div>
      </div>
      <div style={{ margin: '10px' }}>
        {activeLeft ? (
          <PatientInfo name="黄庆仁" />
        ) : (
          <div className={styles.rightContent}>
            <Tabs
              style={{ margin: '0 10px', background: '#fff', borderRadius: '4px' }}
              activeKey={activeKey}
              size="small"
              onChange={_activeKey => {
                setState({ ...state, activeKey: _activeKey });
              }}
            >
              <Tabs.TabPane tab="疾病库" key="1">
                <Collapse accordion>
                  {['贫血', '胎盘早剥', '胎盘前置'].map((_, index) => {
                    return (
                      <Panel header={_} key={index.toString()}>
                        <div>
                          临床表现:
                          <br />
                          <div>
                            1.神经系统： 头昏、耳鸣、头痛、失眠、多梦。
                            <br />
                            2.皮肤黏膜： 皮肤、粘膜苍白。
                            <br />
                            3.呼吸循环系统： 气急或呼吸困难。
                            <br />
                            4.消化系统： 消化功能减低、消化不良，腹部胀满。
                            <br />
                          </div>
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </Tabs.TabPane>
              <Tabs.TabPane tab="用药助手" key="2">
                <Collapse accordion>
                  {['葡萄糖酸亚铁片', '促红细胞生长素', '维生素B12'].map((_, index) => {
                    return (
                      <Panel header={_} key={index.toString()}>
                        <div>
                          <div>适应症:用于缺铁性贫血。</div>
                          <div>用法：口服。一次4～6片，一日3次。</div>

                          <div>
                            不良反应：
                            <br />
                            1.可见胃肠道不良反应，如恶心、呕吐、上腹疼痛、便秘。
                            <br />
                            2.本品可减少肠蠕动，引起便秘，并排黑便。
                          </div>
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </Tabs.TabPane>
              <Tabs.TabPane tab="健康宣教" key="3">
                <Collapse accordion>
                  {['异位妊娠', 'CT检查护理常识', '眼科点药须知'].map((_, index) => {
                    return (
                      <Panel header={_} key={index.toString()}>
                        <div>
                          1、什么是异位妊娠
                          受精卵在子宫体腔以外着床称为异位妊娠，习称宫外孕。异位妊娠是妇产科常见急腹症，死亡率约2%。依据种植部位不同可分为：输卵管妊娠、卵巢妊娠、腹腔妊娠、阔韧带妊娠、宫颈妊娠，其中输卵管妊娠占异位妊娠95%左右。
                          2、输卵管妊娠发病原因
                          输卵管炎症是输卵管妊娠主要病因；输卵管妊娠史或手术史；输卵管发育不良或功能异常；辅助生殖技术；避孕失败；子宫肌瘤或卵巢囊肿压迫输卵管；输卵管子宫内膜异位。
                          3、输卵管妊娠临床表现
                          停经：多有6-8周停经史，有20-30%患者无停经史；腹痛：是输卵管妊娠患者的主要症状；阴道流血：有60-80%患者有不规则阴道流血，少数患者阴道流血量多，但不会超过月经量；晕厥与休克：腹腔内出血及腹痛剧烈，患者会出现晕厥、休克。腹部包块：血肿形成时间长可与周围组织或器官粘连形成包块。
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </Tabs.TabPane>
              <Tabs.TabPane tab="急救知识" key="4">
                <Collapse accordion>
                  {['心肺复苏术', '眼部外伤', '窒息'].map((_, index) => {
                    return (
                      <Panel header={_} key={index.toString()}>
                        <div>
                          心肺复苏术（CPR）是针对呼吸心跳停止的急症危重病人所采取的抢救关键措施，即胸外按压形成暂时的人工循环并恢复的自主搏动，采用人工呼吸代替自主呼吸，快速电除颤转复心室颤动，以及尽早使用血管活性药物来重新恢复自主循环的急救技术。心肺复苏的目的是开放气道、重建呼吸和循环。人们只有充分了解心肺复苏的知识并接受过此方面的训练后才可以为他人实施心肺复苏。
                          心肺复苏的意义人体是靠心脏的跳动、血管的节律运动和肺的呼吸，将氧气和营养物质运送到人的各个部分，以供机体正常活动；并通过血液流动和呼吸将二氧化碳和废物排出体外。在一般情况下，心跳停止即脑组织缺氧4分钟之内，可恢复其原有功能，心跳停止超出4分钟，易造成脑组织永久性损害，甚至导致死亡。所以抢救此类伤员要及时、迅速，以竭力挽救伤员生命。
                          心肺复苏 = (清理呼吸道) + 人工呼吸 + 胸外按压 + 后续的专业用药
                          据美国近年统计，每年心血管病人死亡数达百万人，约占总死亡病因1/2。而因心脏停搏突然死亡者60-70%发生在院前。因此，美国成年人中约有85%的人有兴趣参加CPR初步训练，结果使40%心脏骤停者复苏成功，每年抢救了约20万人的生命。心脏跳动停止者，如在4分钟内实施初步的CPR，在8分钟内由专业人员进一步心脏救生，死而复生的可能性最大，因此时间就是生命，速度是关键，初步的CPR按ABC进行
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </Tabs.TabPane>
            </Tabs>

            {/* <Input.Search style={{ marginBottom: '10px' }}></Input.Search> */}
          </div>
        )}
      </div>
    </div>
  );
});
