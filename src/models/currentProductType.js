import { $post } from '@/utils/Ajax.js';
import router from 'umi/router';
import { message } from 'antd';

export default {
  namespace: 'currentProductType',
  state: {},
  reducers: {
    'setProductType'(state, { payload: productType }) {
      return productType
    },
  },
  effects: {
    * 'addProductType'({ payload: value }) {
      const result = yield $post('/api/admin/product/type/v1/add', value)
      if (result && result.code === 200) {
        message.success('添加产品类型成功');
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    },
    * 'updateProductType'({ payload: value }) {
      const result = yield $post('/api/admin/product/type/v1/update', value)
      if (result && result.code === 200) {
        message.success('修改产品类型成功');
        setTimeout(() => {
          router.push(`/product/product-type-list`);
        }, 1000)
      }
    },
  }
};
