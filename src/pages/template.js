function mapStateToProps(rootState) {
  return { rootState };
}

export default connect(mapStateToProps)((props) => {
  const [state, setState] = useState({});
  const { } = props;
  const { } = state;
  return (
    <div>
      template
    </div>
  );
});