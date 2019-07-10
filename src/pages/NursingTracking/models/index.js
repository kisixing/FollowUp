export const MODEL = 'sfs';

export const dispatchCreator = dispatch => {
  return (actionType, payload) => {
    dispatch({
      type: `${MODEL}/${actionType}`,
      payload,
    });
  };
};

export default {
  namespace: MODEL,
  state: {},
  effects: {},
  reducers: {},
};
