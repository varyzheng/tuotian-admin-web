import { $get } from '@/utils/Ajax.js'

export default {
  namespace: 'colorList',
  state: [],
  reducers: {
    'setColorList'(state, { payload: colorList }) {
      return colorList
    },
  },
  effects: {
    * 'getColorList'({ unused }, { put }) {
      const result = yield $get('/api/admin/colorcard/v1/list')
      const list = result.data.colorCardPage
      yield put({
        type: 'setColorList',
        payload: list
      })
    },
  },
};
