import { $post } from '@/utils/Ajax.js';
import router from 'umi/router';
import { message } from 'antd';

export default {
  namespace: 'currentCase',
  state: {},
  reducers: {
    'setCase'(state, { payload: cCase }) {
      return cCase
    },
  },
  effects: {
    * 'addCase'({ payload: value }) {
      const result = yield $post('/api/admin/citycase/v1/add', value)
      if (result && result.code === 200) {
        message.success('添加案例成功');
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    },
    * 'updateCase'({ payload: value }) {
      const result = yield $post('/api/admin/citycase/v1/update', value)
      if (result && result.code === 200) {
        message.success('修改案例成功');
        setTimeout(() => {
          router.push(`/case/case-list`);
        }, 1000)
      }
    },
  }
};
