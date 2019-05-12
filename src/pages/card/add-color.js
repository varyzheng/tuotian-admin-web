import { connect } from 'dva';
import basic from '@/css/basic.css';
import {
  Form, Input, Radio, Button, Upload, Icon, Switch
} from 'antd';

const AddColor = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (props.currentColor) {
          console.log('修改')
        }
      }
    });
  }

  const handleUploadImg = (e) => {
    console.log('上传IMG成功：', e)
  }

  const handleUploadRendering = (e) => {
    console.log('上传Rendering成功：', e)
  }

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const { colorTypeParent, colorTypeChild, currentColor } = props
  const radios = []
  colorTypeParent.forEach(item => {
    radios.push(<Radio value={item.id} key={`colorTypeParent_${item.id}`}>{item.name}</Radio>)
  })
  const radiosChild = []
  colorTypeChild.forEach(item => {
    radiosChild.push(<Radio value={item.id} key={`colorTypeChild_${item.id}`}>{item.name}</Radio>)
  })
  let imgURL, renderingURL
  if (currentColor) {
    imgURL = {
      name: '图片1',
      url: currentColor.img,
      uid: 1
    }
    renderingURL = {
      name: '图片2',
      url: currentColor.rendering,
      uid: 2
    }
  }

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className={basic.form}>
      <Form.Item
        label="色卡名称："
      >
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: '请输入色卡名称',
          }],
          initialValue: currentColor ? currentColor.name : '',
        })(
          <Input />
        )}
      </Form.Item>

      <Form.Item
        label="色卡类型"
      >
        {getFieldDecorator('typeId', {
          rules: [{
            required: true, message: '请选择色卡类型',
          }],
          initialValue: currentColor ? currentColor.typeId : '',
        })(
          <Radio.Group>
            <div>{radios}</div>
            <div>{radiosChild}</div>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item
        label="缩略图"
        extra=""
      >
        {getFieldDecorator('img', {
          rules: [{
            required: true, message: '请选择上传缩略图',
          }],
          initialValue: imgURL ? imgURL.url : ''
        })(
          <Upload name="file" action="/api/article/v1/image/upload" listType="picture" onChange={handleUploadImg}
            defaultFileList={imgURL ? [imgURL] : []}>
            <Button>
              <Icon type="upload" /> 点击上传文件
            </Button>
          </Upload>
        )}
      </Form.Item>
      <Form.Item
        label="效果图"
      >
        {getFieldDecorator('rendering', {
          rules: [{
            required: true, message: '请选择上传效果图',
          }],
          initialValue: renderingURL ? renderingURL.url : ''
        })(
          <Upload name="file" action="/api/article/v1/image/upload" listType="picture" onChange={handleUploadRendering}
            defaultFileList={renderingURL ? [renderingURL] : []}>
            <Button>
              <Icon type="upload" /> 点击上传文件
            </Button>
          </Upload>
        )}
      </Form.Item>
      <Form.Item label="是否为热销品">
        {getFieldDecorator('hot', {
          rules: [{
            required: true, message: '请选择是否热销',
          }],
          valuePropName: 'checked',
          initialValue: currentColor ? currentColor.hot : false,
        })(<Switch />)}
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 12, offset: 6 }}
      >
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
}
const Connected = connect(({ colorTypeParent, colorTypeChild }) => ({ colorTypeParent, colorTypeChild }))(AddColor)
const WrappedForm = Form.create({ name: 'add-color' })(Connected);
export default WrappedForm
