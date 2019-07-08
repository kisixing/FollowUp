import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    import(`./Questionnaire/All`).then(module => {
      this.setState({ children: <module.default /> });
    });
  }

  render() {
    const { children } = this.state;

    return <PageHeaderWrapper title="搜索列表">{children}</PageHeaderWrapper>;
  }
}

export default Questionnaire;
