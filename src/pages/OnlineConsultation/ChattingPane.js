function mapStateToProps(rootState) {
    return { rootState };
}

export default connect(mapStateToProps)((props) => {
    const [state, setState] = useState({});
    const { } = props;
    const { } = state;
    return (
        <div>
            <div className={styles.chatTitle}>
                <span>黄庆仁</span>
            </div>
        </div>
    );
});
