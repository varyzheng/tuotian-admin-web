import { $get } from '@/utils/Ajax.js'

export default {
  namespace: 'allColor',
  state: [],
  reducers: {
    'setAllColor'(state, { payload: colorList }) {
      return colorList
    },
  },
  effects: {
    * 'getAllColor'({ unused }, { put }) {
      const result = yield $get('/api/admin/colorcard/v1/list')
      const list = result.data.colorCardPage
      list.forEach(element => {
        element.key = element.id
      });
      yield put({
        type: 'setAllColor',
        payload: list
      })
      // yield put({
      //   type: 'colorParent/setColorParent',
      //   payload: parentArray
      // })
      // yield put({
      //   type: 'colorChild/setColorChild',
      //   payload: childArray
      // })
    },
  },
};
