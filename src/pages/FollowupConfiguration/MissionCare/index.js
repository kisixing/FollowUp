

import router from 'umi/router';

import { Form, List, Card, Tooltip, Menu, Input, Dropdown, Icon, Avatar, Button, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import { objFormatArr } from '@/utils/utils';
import TableForm from './TableForm'
import styles from './index.less';

const category = ['健康宣教', '高危宣教', '活动通知', '孕妇学校', '临时宣教'];
const secondaryCategory = [
    '已绑定孕妇',
    '未绑定孕妇',
];

@connect(({ global }) => ({
    global,
}))
class FollowupManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: {
                category: [],
                secondaryCategory: [],
            },
            lists: [
                {
                    id: '4545454',
                    title: '高危复诊提醒',
                    avatar: '',
                    status: {
                        code: 1,
                        dec: '运行中',
                    },
                    allFollowup: 50,
                    todayFollowup: 25,
                }
            ],
        }
    }



    handleFormSubmit = value => {
        // eslint-disable-next-line
        console.log(value);
    };

    onDetailClick = e => {
        // const { match } = this.props;
        // router.push(`/followup-management/task-lists/table/${e.id}`);
    };

    onChartClick = e => {
        router.push(`/followup-management/task-lists/chart/${e.id}`);
    };

    // 选择标签
    handleTags = (target, checkedTags) => {
        this.setState({
            ...this.state,
            selectedTags: {
                ...this.state.selectedTags,
                [target]: checkedTags

            }
        })
    };

    handleTagClose = removedTag => {
        const { dispatch } = this.props;
        dispatch({
            type: 'followupLists/removeTag',
            payload: removedTag,
        });
    };

    render() {


        const actionsTextMap = {
            expandText: '展开',
            collapseText: '收起',
            selectAllText: '全部',
        };

        const itemMenu = (
            <Menu>
                {
                    ['alipay', 'taobao', 'tmall'].map((_, index) => (
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
                                {`${index + 1}、推荐 ${_}`}
                            </a>
                        </Menu.Item>
                    ))
                }
            </Menu>
        );




        const CardInfo = ({ all }) => (
            <div className={styles.cardInfo}>
                <div>
                    <p>答卷</p>
                    <p>{all}</p>
                </div>
            </div>
        );

        const tagsMap = tags => {
            const tagChild = tags.map(tag => (
                <span key={tag} style={{ display: 'inline-block' }}>
                    <Tag
                        closable
                        onClose={e => {
                            e.preventDefault();
                            this.handleTagClose(tag);
                        }}
                    >
                        {tag}
                    </Tag>
                </span>
            ));
            return tagChild;
        };

        const tagOptionsMap = options => {
            const tagChild = options.map(tag => (
                <TagSelect.Option key={tag} value={tag}>
                    {tag}
                </TagSelect.Option>
            ));
            return tagChild;
        };

        const { loading, form, } = this.props;
        const { selectedTags, lists } = this.state
        const { getFieldDecorator } = form;

        return (

            <div className={styles.content}>
                <Card>
                    <Form layout="inline">
                        <StandardFormRow title="已选类目" block style={{ paddingBottom: 11 }}>
                            <div style={{ lineHeight: '32px' }}>
                                <TweenOneGroup
                                    enter={{
                                        scale: 0.8,
                                        opacity: 0,
                                        type: 'from',
                                        duration: 100,
                                        onComplete: e => {
                                            e.target.style = '';
                                        },
                                    }}
                                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                    appear={false}
                                >
                                    {tagsMap(objFormatArr(selectedTags))}
                                </TweenOneGroup>
                            </div>
                        </StandardFormRow>
                        <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                            <TagSelect
                                expandable
                                onChange={tags => this.handleTags('category', tags)}
                                actionsText={actionsTextMap}
                            >
                                {tagOptionsMap(category)}
                            </TagSelect>
                        </StandardFormRow>
                        <StandardFormRow title="二级类目" block style={{ paddingBottom: 11 }}>
                            <TagSelect
                                expandable
                                onChange={tags => this.handleTags('secondaryCategory', tags)}
                                actionsText={actionsTextMap}
                            >
                                {tagOptionsMap(secondaryCategory)}
                            </TagSelect>
                        </StandardFormRow>
                    </Form>
                </Card>

                <TableForm />
            </div>
        );
    }
}

export default Form.create()(FollowupManagement);
