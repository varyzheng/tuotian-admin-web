import { $get } from '@/utils/Ajax.js'

export default {
  namespace: 'productList',
  state: [],
  reducers: {
    'setProductList'(state, { payload: productList }) {
      return productList
    },
  },
  effects: {
    * 'getProductList'({ unused }, { put }) {
      const result = yield $get('/api/admin/product/v1/list')
      const list = result.data.productPage
      yield put({
        type: 'setProductList',
        payload: list
      })
    },
  },
};
