import { $post } from '@/utils/Ajax.js';
import router from 'umi/router';
import { message } from 'antd';

export default {
  namespace: 'currentColor',
  state: {},
  reducers: {
    'setColor'(state, { payload: color }) {
      return color
    },
  },
  effects: {
    * 'addColor'({ payload: value }) {
      const result = yield $post('/api/admin/colorcard/v1/add', value)
      if (result && result.code === 200) {
        message.success('添加色卡成功');
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    },
    * 'updateColor'({ payload: value }) {
      const result = yield $post('/api/admin/colorcard/v1/update', value)
      if (result && result.code === 200) {
        message.success('修改色卡成功');
        setTimeout(() => {
          router.push(`/card/color-list`);
        }, 1000)
      }
    },
  }
};
