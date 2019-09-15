import { $get } from '@/utils/Ajax.js'
// import router from 'umi/router';
// import { message } from 'antd';

export default {
  namespace: 'initData',
  state: [],
  reducers: {},
  effects: {
    * 'initPageData'({ payload: location }, { put }) {
      let result, id
      switch (location.pathname) {
        case '/card/color-type-list':
        case '/card/add-color-type':
        case '/card/edit-color-type':
          yield put({
            type: 'colorTypeList/getColorTypeList',
            payload: {},
          })
          if (location.pathname === '/card/edit-color-type') {
            id = Number(location.query.id)
            result = yield $get('/api/admin/colorcard/type/v1/info', { id })
            yield put({
              type: 'currentColorType/setColorType',
              payload: result.data,
            })
          }
          break;
        case '/case/case-list':
          yield put({
            type: 'caseList/getCaseList',
            payload: {}
          })
          break;
        case '/case/edit-case':
          id = Number(location.query.id)
          result = yield $get('/api/admin/citycase/v1/info', { id })
          yield put({
            type: 'currentCase/setCase',
            payload: result.data,
          })
          break;
        case '/card/color-list':
          yield put({
            type: 'colorList/getColorList',
            payload: {}
          })
          break;
        case '/card/add-color':
          yield put({
            type: 'colorTypeList/getColorTypeList',
            payload: {},
          })
          break;
        case '/card/edit-color':
          yield put({
            type: 'colorTypeList/getColorTypeList',
            payload: {},
          })
          id = Number(location.query.id)
          result = yield $get('/api/admin/colorcard/v1/info', { id })
          result.data.hot = Boolean(result.data.hot)
          yield put({
            type: 'currentColor/setColor',
            payload: result.data,
          })
          break;
        case '/product/product-type-list':
        case '/product/add-product-type':
        case '/product/edit-product-type':
          yield put({
            type: 'productTypeList/getProductTypeList',
            payload: {},
          })
          if (location.pathname === '/product/edit-product-type') {
            id = Number(location.query.id)
            result = yield $get('/api/admin/product/type/v1/info', { id })
            yield put({
              type: 'currentProductType/setProductType',
              payload: result.data,
            })
          }
          break;
        case '/product/product-list':
          yield put({
            type: 'productList/getProductList',
            payload: {}
          })
          break;
        case '/product/add-product':
          yield put({
            type: 'productTypeList/getProductTypeList',
            payload: {},
          })
          yield put({
            type: 'allColor/getAllColor',
            payload: {},
          })
          break;
        case '/product/edit-product':
          yield put({
            type: 'productTypeList/getProductTypeList',
            payload: {},
          })
          yield put({
            type: 'allColor/getAllColor',
            payload: {},
          })
          id = Number(location.query.id)
          result = yield $get('/api/admin/product/v1/info', { id })
          result.data.hot = Boolean(result.data.hot)
          yield put({
            type: 'currentProduct/setProduct',
            payload: result.data,
          })
          result = yield $get('/api/admin/product/mapping/v1/list', { productId: id })
          const list = result.data
          const inner = [], outter = [], mapping = {}
          list.forEach(element => {
            if (element.type === 1) {
              inner.push(element.colorCardId)
            }
            if (element.type === 2) {
              outter.push(element.colorCardId)
            }
            mapping[`${element.type}-${element.colorCardId}`] = element.renderingImg
          });
          yield put({
            type: 'mapping/setMapping',
            payload: mapping,
          })
          yield put({
            type: 'innerTargetKeys/transfer',
            payload: inner,
          })
          yield put({
            type: 'outterTargetKeys/transfer',
            payload: outter,
          })
          break;
        default:
          break;
      }
    }
  }
};
