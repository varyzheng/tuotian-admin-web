export default {
  namespace: 'outterTargetKeys',
  state: [],
  reducers: {
    'transfer'(state, { payload: taretKeys }) {
      return taretKeys;
    },
  },
};
