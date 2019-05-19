import { $post } from '@/utils/Ajax.js';
import router from 'umi/router';
import { message } from 'antd';

export default {
  namespace: 'currentProduct',
  state: {},
  reducers: {
    'setProduct'(state, { payload: product }) {
      return product
    },
  },
  effects: {
    * 'addProduct'({ payload: value }) {
      if (!value.mapping || !value.mapping.length) {
        message.error('请添加内外侧色卡');
      }
      let result = yield $post('/api/admin/product/v1/add', value)
      if (result && result.code === 200) {
        const id = result.data
        value.mapping.forEach(item => {
          item.productId = id
          item.colorCardId = item.id
          item.renderingImg = item.productMappingImg
          delete item.id
          delete item.productMappingImg
        });
        result = yield $post('/api/admin/product/mapping/v1/add', value.mapping)
        if (result && result.code === 200) {
          message.success('添加产品成功');
          setTimeout(() => {
            router.push(`/product/product-list`);
          }, 1000)
        }
      }
    },
    * 'updateProduct'({ payload: value }) {
      if (!value.mapping || !value.mapping.length) {
        message.error('请添加内外侧色卡');
      }
      let result = yield $post('/api/admin/product/v1/update', value)
      if (result && result.code === 200) {
        value.mapping.forEach(item => {
          item.productId = value.id
          item.colorCardId = item.id
          item.renderingImg = item.productMappingImg
          delete item.id
          delete item.productMappingImg
        });
        result = yield $post('/api/admin/product/mapping/v1/update', value.mapping)
        if (result && result.code === 200) {
          message.success('修改产品成功');
          setTimeout(() => {
            router.push(`/product/product-list`);
          }, 1000)
        }
      }
    },
  }
};
