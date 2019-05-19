import { connect } from 'dva';
import basic from '@/css/basic.css';
import {
  Form, Input, Radio, Button
} from 'antd';

const AddProductType = (props) => {

  const { dispatch, location, productTypeParent, currentProductType } = props

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let type = 'currentProductType/addProductType'
        if (location.pathname === '/product/edit-product-type') {
          values.id = currentProductType.id
          type = 'currentProductType/updateProductType'
        }
        dispatch({
          type,
          payload: values,
        })
      }

    });
  }

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const radios = []
  productTypeParent.forEach(item => {
    radios.push(<Radio value={item.id} key={`productTypeParent_${item.id}`}>{item.name}</Radio>)
  })
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className={basic.form}>
      <Form.Item
        label="分类名称："
      >
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: '请输入分类名称',
          }],
          initialValue: currentProductType ? currentProductType.name : '',
        })(
          <Input />
        )}
      </Form.Item>

      <Form.Item
        label="父级分类"
      >
        {getFieldDecorator('parentId', {
          rules: [{
            required: true, message: '请选择父级分类',
          }],
          initialValue: currentProductType ? currentProductType.parentId : '',
        })(
          <Radio.Group>
            <Radio value={0}>无</Radio>
            {radios}
          </Radio.Group>
        )}
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 12, offset: 6 }}
      >
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
}
const Connected = connect(({ productTypeParent }) => ({ productTypeParent }))(AddProductType)
const WrappedForm = Form.create({ name: 'add-product-type' })(Connected);
export default WrappedForm
