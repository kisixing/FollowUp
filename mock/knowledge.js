// import mockjs from 'mockjs';
// eslint-disable-next-line import/no-unresolved
import { delay } from 'roadhog-api-doc';

const NURSING = {
  desc: '护理知识库',
  data: [
    {
      id: '2019-05-05-001',
      draft_uuid: '',
      encrypt_status: 1,
      is_can_edit: true,
      owner_uuid: '6hD5PrTi',
      space_uuid: 'AMD8C7Rz',
      title: '糖尿病护理',
      updated_time: 1562125909,
      uuid: 'A6Ts7XmD',
      version: 1,
      content:
        '<h1>	1 如何创建页面组？</h1><p>	Wiki 管理员可以点击左边快速导航栏或全部项目列表里的新建页面组按钮，来创建页面组。</p><p>	团队管理员可以进入右上角「团队管理」-「团队权限配置」，配置 Wiki 管理员的名单。</p><h1>	2 如何设置页面组权限？</h1><p>	Wiki 页面组支持配置「查看与反馈」、「编辑内容」和「管理项目」三种权限。</p><p>	Wiki 管理员可以在「页面组设置」配置页面组管理员的名单，并在「Wiki 配置中心」获取单个页面组的管理权限。</p><h1>	3 如何调整页面的位置和顺序？</h1><p>	发布页面时，能够选择页面在页面树里的位置。你可以通过中栏 &hellip; 里的「移动页面」功能，再次移动此页面。</p><p>	你也可以通过左栏页面树旁边的「调整页面树」功能，通过拖拽来调整多个页面的顺序和位置。</p><h1>	4 我能找回页面以前的内容吗？</h1><p>	ONES Wiki 会为你记录每个页面的所有历史版本。你可以在中栏 &hellip; 里的「页面历史」里找到它们，并回滚到某个具体的历史版本。</p><h1>	5 其他问题</h1><p>	请点击顶栏的&ldquo;？&rdquo;按钮，查看帮助手册或联系客服。</p>',
    },
    {
      id: '2019-05-05-002',
      draft_uuid: '',
      encrypt_status: 1,
      is_can_edit: true,
      owner_uuid: '6hD5PrTii',
      space_uuid: 'AMD8C7Rzp',
      title: '透析护理',
      updated_time: '@time("yyyy-MM-dd HH:mm:ss")',
      uuid: 'A6Ts7XmD',
      version: 1,
      content:
        '<h1>项目背景</h1><p>如何更有效率的利用已有流量完成售卖，一直是我们遇到的问题。随着精细化运营时代的到来，更细致的利用流量显得极为重要，在经过几轮人工推开尝试后，我们发现这种推送能找到『最合适的人』，减少打扰用户，提高推送效果。</p><h1>	项目目标</h1><p>	通过定向的推荐，帮助用户发现商品，提高推送到打开的转化率。</p><p>	一期实现通过公众号渠道进行「猜你喜欢」功能；</p><p>	二期增加用户公众号浏览行为的挖掘，增加官网上「猜你喜欢」功能。</p><h1>	需求概述</h1><p>	整个推荐功能分为用户和课程画像、触发和匹配策略、推开逻辑三大部分，各模块的功能概述和完整流程如下：</p><ol>		<li>		用户和商品画像：实现对用户和商品特征的挖掘，为匹配策略提供数据基础	</li>		<li>		触发和匹配策略：生成待推荐的用户/商品，并匹配对象	</li>		<li>		推荐逻辑：控制推荐渠道、推荐时间和内容拼装。其中，2、3 两个模块支持 ABtest，可根据收集到的行为数据进行实时调整	</li>	</ol><h1>	需求详述</h1><h2>	1 用户和商品画像</h2><p>	&hellip;&hellip;</p>',
    },
  ],
};

export default delay(
  {
    'GET /api/knowledge/nursing': (req, res) => {
      const params = req.query;
      const { id } = params;
      const result = NURSING.data.filter(e => e.id === id);
      return res.json(result[0]);
    },
  },
  1000
);
