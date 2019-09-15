import { $get } from '@/utils/Ajax.js'

export default {
  namespace: 'caseList',
  state: [],
  reducers: {
    'setCaseList'(state, { payload: caseList }) {
      return caseList
    },
  },
  effects: {
    * 'getCaseList'({ unused }, { put }) {
      const result = yield $get('/api/admin/citycase/v1/list')
      const map = result.data
      let list = []
      Object.keys(map).forEach(key => {
        list = list.concat(map[key])
      })
      yield put({
        type: 'setCaseList',
        payload: list
      })
    },
  },
};
