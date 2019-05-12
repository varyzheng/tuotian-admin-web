export default {
  namespace: 'innerTargetKeys',
  state: [],
  reducers: {
    'transfer'(state, { payload: taretKeys }) {
      return taretKeys;
    },
  },
};
