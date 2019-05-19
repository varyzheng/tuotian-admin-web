export default {
  namespace: 'mapping',
  state: {},
  reducers: {
    'setMapping'(state, { payload: mapping }) {
      return mapping;
    },
  },
};
