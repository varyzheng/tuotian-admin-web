import { connect } from 'dva';
import basic from '@/css/basic.css';
import {
  Form, Input, Radio, Button, Upload, Icon, Switch
} from 'antd';
import Cookie from '@/utils/Cookie';
import { imgFolder } from '@/utils/Constants';

const AddColor = (props) => {

  const { dispatch, location, colorTypeParent, colorTypeChild, currentColor } = props;
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.img.file && values.img.file.response && values.img.file.response.code === 200) {
          values.img = imgFolder + values.img.file.response.data
        }
        if (values.renderingImg.file && values.renderingImg.file.response && values.renderingImg.file.response.code === 200) {
          values.renderingImg = imgFolder + values.renderingImg.file.response.data
        }
        values.hot = Number(values.hot)
        let type = 'currentColor/addColor'
        if (location.pathname === '/card/edit-color') {
          values.id = currentColor.id
          type = 'currentColor/updateColor'
        }
        dispatch({
          type,
          payload: values,
        })
      }
    });
  }

  let tempImg = '', tempRenderingImg = ''
  if (currentColor) {
    tempImg = currentColor.img
    tempRenderingImg = currentColor.renderingImg
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const radios = [];
  colorTypeParent.forEach(item => {
    radios.push(<Radio value={item.id} key={`colorTypeParent_${item.id}`}>{item.name}</Radio>)
  });
  const radiosChild = [];
  colorTypeChild.forEach(item => {
    radiosChild.push(<Radio value={item.id} key={`colorTypeChild_${item.id}`}>{item.name}</Radio>)
  });
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
        {tempImg ? <img className={basic.uploadImg} src={tempImg} alt="缩略图"/> : ''}
        {getFieldDecorator('img', {
          rules: [{
            required: true, message: '请选择上传缩略图',
          }],
          initialValue: tempImg,
        })(
          <Upload name="file" action="/api/admin/img/v1/upload?imgPath=color" listType="picture" headers={{Token: Cookie.get('token')}}>
            <Button>
              <Icon type="upload" /> 点击上传文件
            </Button>
          </Upload>
        )}
      </Form.Item>
      <Form.Item
        label="效果图"
      >
        {tempRenderingImg ? <img className={basic.uploadImg} src={tempRenderingImg} alt="效果图"/> : ''}
        {getFieldDecorator('renderingImg', {
          rules: [{
            required: true, message: '请选择上传效果图',
          }],
          initialValue: tempRenderingImg,
        })(
          <Upload name="file" action="/api/admin/img/v1/upload?imgPath=color" listType="picture" headers={{Token: Cookie.get('token')}}>
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
        label="排序权重："
      >
        {getFieldDecorator('seq', {
          rules: [{
            required: true, message: '请输入排序权重',
          }],
          initialValue: currentColor ? currentColor.seq : '',
        })(
          <Input />
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
const Connected = connect(({ colorTypeParent, colorTypeChild }) => ({ colorTypeParent, colorTypeChild }))(AddColor)
const WrappedForm = Form.create({ name: 'add-color' })(Connected);
export default WrappedForm
