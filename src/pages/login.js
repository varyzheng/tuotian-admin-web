import { connect } from 'dva';
import router from 'umi/router';
import style from './login.css';
import {
  Form, Input, Icon, Button
} from 'antd';
import { $post } from '@/utils/Ajax.js';

const Login = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await $post('/api/v1/login', values)
        if (result && result.data === true) {
          router.push('/');
        }
      }
    });
  }

  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }


  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
  const usernameError = isFieldTouched('name') && getFieldError('name');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  return (
    <Form layout="inline" onSubmit={handleSubmit} className={style.normal}>
      <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />,
        )}
      </Form.Item>
      <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
const Connected = connect()(Login)
const WrappedForm = Form.create({ name: 'login' })(Connected);
export default WrappedForm
