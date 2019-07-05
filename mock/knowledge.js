// import mockjs from 'mockjs';
// eslint-disable-next-line import/no-unresolved
import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const NURSING = mockjs.mock({
  desc: '护理知识库',
  data: [
    {
      id: '2019-05-05-001',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      title: '延续护理中心',
      content:
        '<p><br/><span style="font-size:18px"><strong>医院整体实施流程</strong></span></p><p><br/>一、选择实施科室</p><p><br/> 家庭护理项目是一项新服务，医院可根据自身情况选择合适的开展科室，该科室患者有远程沟通，上门服务的需求；有条件对院外患者实现在线指导、上门服务等。</p><p><br/>二、护士资质认定</p><p><br/> 医院联合平台针对各科室提供家庭护理的护士，制定资质考核制度。对服务护士的相关技能、年资、护理经验等进行考核。满足条件者颁发相关证书，持证上岗。有证书者方能提供家庭护理服务。以保证家庭护理服务的质量和规范性。<br/> （1）取得《中华人民共和国执业护士证书》，并能在全国护士电子注册系统中查询；<br/> （2）至少具备5年以上临床护理工作经验；<br/> （3）具备护师及以上职称；<br/> （4）无违反相关法律法规记录及不良执业行为记录。</p><p><br/>三、制定服务价格</p><p><br/> 家庭护理项目牵涉到护士资源、医疗器械及药品等，是一项有偿服务。医院需根据当地政府相关文件、医院本身情况、当地患者消费水平等因素综合制定好各项服务价格。有些地区颁布了大体的指导文件，可以参考。</p><p><br/>四、科室及护士培训</p><p><br/> 针对家庭护理执业护士进行相关专业培训及信息平台使用培训，培训完毕符合要求者可以准备提供家庭护理相关服务。</p><p><br/>五、家庭护理宣传推广</p><p><br/> 针对科室、护士、患者等多方面进行家庭护理的宣传，以方便后续各种流程的顺利推行，可结合信息平台做信息推送。</p><p><br/>六、准备安全相关协议及物件</p><p><br/> 家庭护理因为需要护士上门提供服务，牵涉到患者安全、护士安全及医院信誉度等。为保障各方利益。需提前准备好 事故预案、相关责任协议，保险等；以后现场留证所需要的一切物件，包括但不限于视频、照片等的拍摄规则、器具等。</p><p><br/>七、正式提供服务</p><p><br/> 待一切准备工作都齐备之后，可以考虑正式为科室患者提供家庭护理服务。<br/> 进行一段时间，一个季度或者半年。可利用平台进行数据统计、分析。总结相关经验和问题，平台方和医院方同时进行优化和整改。<br/> </p>',
    },
    {
      id: '2019-05-05-002',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      title: '家庭护理',
      content:
        '<p><span style="font-size:20px"><strong>家庭护理</strong></span></p><p></p><p>1012945629于 2019年07月03日 中午11点51分 修改</p><p></p><p><br/><span style="font-size:16px"><strong>会议记录要求记录以下五个要素：</strong></span><br/></p><ul><li>议题，召开会议的原因；</li><li>问题的现状和资源情况；</li><li>提出的解决方案和意见讨论；</li><li>问题的决议；</li><li>确认分工和执行负责人。</li></ul>',
    },
    {
      id: '2019-05-05-003',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      title: '产后护理',
      content:
        '<h2>产后护理</h2><p>1012945629于 2019年07月03日 中午11点51分 修改</p><h3><br/>参会人员</h3><ul><li>Winston -  <em>Product Manager</em></li><li>Orisa -  <em>UI Designer</em></li><li>John Jack Morrison -  <em>Web Developer</em></li><li>Lena Oxton -  <em>Web Developer</em></li></ul><h3>背景与目标</h3><p><br/>需要确认 XXXXX 的处理流程。</p><h3><br/>过程与结论</h3><p><br/>议题结论本次议题之一记录达成共识的结论之一本次议题之二记录达成共识的结论之二；记录达成共识的结论之二记录达成共识的结论之二；记录达成共识的结论之二本次议题之三记录达成共识的结论之三</p><p></p><h3>转化得到的任务</h3><ul><li>#2321 转化得到的任务一，负责人A</li><li>#2397 转化得到的任务二，负责人B</li></ul>',
    },
    {
      id: '2019-05-05-004',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      title: '护理注意事项',
      content:
        '<ul><li>1.8 优化推送策略</li><li>1.9 相似基金关联管理</li><li>1.10 申购列表筛选器</li><li>1.11 评论与通知中心</li></ul>',
    },
    {
      id: '2019-05-05-005',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      title: '造口护理',
      content: '',
    },
    {
      id: '2019-05-05-006',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      title: '透析护理',
      content:
        '<h3 style="text-align:start;" size="0" _root="undefined" __ownerID="undefined" __hash="undefined" __altered="false">项目背景</h3><p></p><p style="text-align:start;text-indent:2em;">如何更有效率的利用已有流量完成售卖，一直是我们遇到的问题。随着精细化运营时代的到来，更细致的利用流量显得极为重要，在经过几轮人工推开尝试后，我们发现这种推送能找到『最合适的人』，减少打扰用户，提高推送效果。</p><p></p><h3>项目目标</h3><p></p><p style="text-align:start;text-indent:2em;">通过定向的推荐，帮助用户发现商品，提高推送到打开的转化率。</p><p style="text-align:start;text-indent:2em;">一期实现通过公众号渠道进行「猜你喜欢」功能；</p><p style="text-align:start;text-indent:2em;">二期增加用户公众号浏览行为的挖掘，增加官网上「猜你喜欢」功能。</p><p></p><h3>需求概述</h3><p></p><p style="text-align:start;text-indent:2em;">整个推荐功能分为用户和课程画像、触发和匹配策略、推开逻辑三大部分，各模块的功能概述和完整流程如下：</p><ol><li>用户和商品画像：实现对用户和商品特征的挖掘，为匹配策略提供数据基础</li><li>触发和匹配策略：生成待推荐的用户/商品，并匹配对象</li><li>推荐逻辑：控制推荐渠道、推荐时间和内容拼装。其中，2、3 两个模块支持 ABtest，可根据收集到的行为数据进行实时调整</li></ol><h3>需求详述</h3><p></p><p style="text-indent:2em;">1 用户和商品画像</p><p style="text-align:start;text-indent:2em;">……</p>',
    },
    {
      id: '2019-05-05-007',
      draft_uuid: '',
      encrypt_status: 1,
      is_can_edit: true,
      owner_uuid: '6hD5PrTi',
      space_uuid: 'AMD8C7Rz',
      title: '糖尿病护理',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      uuid: 'A6Ts7XmD',
      version: 1,
      content:
        '<h1>	1 如何创建页面组？</h1><p>	Wiki 管理员可以点击左边快速导航栏或全部项目列表里的新建页面组按钮，来创建页面组。</p><p>	团队管理员可以进入右上角「团队管理」-「团队权限配置」，配置 Wiki 管理员的名单。</p><h1>	2 如何设置页面组权限？</h1><p>	Wiki 页面组支持配置「查看与反馈」、「编辑内容」和「管理项目」三种权限。</p><p>	Wiki 管理员可以在「页面组设置」配置页面组管理员的名单，并在「Wiki 配置中心」获取单个页面组的管理权限。</p><h1>	3 如何调整页面的位置和顺序？</h1><p>	发布页面时，能够选择页面在页面树里的位置。你可以通过中栏 &hellip; 里的「移动页面」功能，再次移动此页面。</p><p>	你也可以通过左栏页面树旁边的「调整页面树」功能，通过拖拽来调整多个页面的顺序和位置。</p><h1>	4 我能找回页面以前的内容吗？</h1><p>	ONES Wiki 会为你记录每个页面的所有历史版本。你可以在中栏 &hellip; 里的「页面历史」里找到它们，并回滚到某个具体的历史版本。</p><h1>	5 其他问题</h1><p>	请点击顶栏的&ldquo;？&rdquo;按钮，查看帮助手册或联系客服。</p>',
    },
  ],
});

const FAQ = mockjs.mock({
  desc: '常见问题',
  data: [
    {
      id: '2019-05-05-001',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      title: '极低出生体重儿的常见问题及护理',
      content: '',
    },
  ],
});

export default delay(
  {
    'GET /api/knowledge/nursing': (req, res) => {
      const params = req.query;
      const { id } = params;
      const result = NURSING.data.filter(e => e.id === id);
      return res.json(result[0]);
    },
    'GET /api/knowledge/faq': (req, res) => {
      const params = req.query;
      const { id } = params;
      const result = FAQ.data.filter(e => e.id === id);
      return res.json(result[0]);
    },
  },
  1000
);
