import { $get } from '@/utils/Ajax.js'

export default {
  namespace: 'productTypeList',
  state: [],
  reducers: {
    'setProductTypeList'(state, { payload: productTypeList }) {
      return productTypeList
    },
  },
  effects: {
    * 'getProductTypeList'({ unused }, { put }) {
      const result = yield $get('/api/admin/product/type/v1/tree')
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
        type: 'setProductTypeList',
        payload: totalArray
      })
      yield put({
        type: 'productTypeParent/setProductTypeParent',
        payload: parentArray
      })
      yield put({
        type: 'productTypeChild/setProductTypeChild',
        payload: childArray
      })
    },
  },
};
