import { $get } from '@/utils/Ajax.js'

export default {
  namespace: 'colorTypeList',
  state: [],
  reducers: {
    'setColorTypeList'(state, { payload: colorTypeList }) {
      return colorTypeList
    },
  },
  effects: {
    * 'getColorTypeList'({ unused }, { put }) {
      const result = yield $get('/api/admin/colorcard/type/v1/tree')
      const list = result.data
      const parentArray = [], childArray = [], totalArray = []
      list.forEach(parent => {
        parent.value.parentName = '无'
        parentArray.push(parent.value)
        totalArray.push(parent.value)
        if (parent.child && parent.child.length) {
          parent.child.forEach(child => {
            child.value.parentName = parent.value.name
            childArray.push(child.value)
            totalArray.push(child.value)
          })
        }
      });
      yield put({
        type: 'setColorTypeList',
        payload: totalArray
      })
      yield put({
        type: 'colorTypeParent/setColorTypeParent',
        payload: parentArray
      })
      yield put({
        type: 'colorTypeChild/setColorTypeChild',
        payload: childArray
      })
    },
  },
};
