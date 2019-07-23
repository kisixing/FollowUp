export default React.memo(
  ({ title }) => {
    return <div>{title}</div>;
  },
  (prev, next) => {
    return prev.title === next.title && prev.questionType === next.questionType;
  }
);
