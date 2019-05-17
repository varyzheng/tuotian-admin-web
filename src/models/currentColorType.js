import { $post } from '@/utils/Ajax.js';
import router from 'umi/router';
import { message } from 'antd';

export default {
  namespace: 'currentColorType',
  state: {},
  reducers: {
    'setColorType'(state, { payload: colorType }) {
      return colorType
    },
  },
  effects: {
    * 'addColorType'({ payload: value }) {
      const result = yield $post('/api/admin/colorcard/type/v1/add', value)
      if (result && result.code === 200) {
        message.success('添加色卡类型成功');
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    },
    * 'updateColorType'({ payload: value }) {
      const result = yield $post('/api/admin/colorcard/type/v1/update', value)
      if (result && result.code === 200) {
        message.success('修改色卡类型成功');
        setTimeout(() => {
          router.push(`/card/color-type-list`);
        }, 1000)
      }
    },
  }
};
