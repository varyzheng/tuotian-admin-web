import { connect } from 'dva';
import basic from '@/css/basic.css';
import {
  Form, Input, Button, Upload, Icon, Select
} from 'antd';
import Cookie from '@/utils/Cookie';
import { imgFolder } from '@/utils/Constants';
import { Province } from './Province'
const { Option } = Select;

const AddCase = (props) => {

  const { dispatch, location, currentCase } = props;
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.renderingImg.file && values.renderingImg.file.response && values.renderingImg.file.response.code === 200) {
          values.caseImg = imgFolder + values.renderingImg.file.response.data
        }
        if (values.cityId) {
          const province = Province.find(item => item.code === values.cityId);
          if (province) {
            values.cityName = province.name;
          }
        }
        values.status = 10
        let type = 'currentCase/addCase'
        if (location.pathname === '/case/edit-case') {
          values.id = currentCase.id
          type = 'currentCase/updateCase'
        }
        dispatch({
          type,
          payload: values,
        })
      }
    });
  }

  let tempRenderingImg = ''
  if (currentCase) {
    tempRenderingImg = currentCase.caseImg
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const options = []
  Province.forEach(item => {
    options.push(<Option value={item.code} key={item.code}>{item.name}</Option>)
  })
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className={basic.form}>
      <Form.Item
        label="小区名称："
      >
        {getFieldDecorator('caseName', {
          rules: [{
            required: true, message: '请输入小区名称',
          }],
          initialValue: currentCase ? currentCase.caseName : '',
        })(
          <Input />
        )}
      </Form.Item>

      <Form.Item
        label="所属省份"
      >
        {getFieldDecorator('cityId', {
          rules: [{
            required: true, message: '请选择所属省份',
          }],
          initialValue: currentCase ? currentCase.cityId : 11,
        })(
          <Select style={{ width: 200 }}>
            {options}
          </Select>
        )}
      </Form.Item>
      <Form.Item
        label="案例图"
      >
        {tempRenderingImg ? <img className={basic.uploadImg} src={tempRenderingImg} alt="案例图"/> : ''}
        {getFieldDecorator('renderingImg', {
          rules: [{
            required: true, message: '请选择上传案例图',
          }],
          initialValue: tempRenderingImg,
        })(
          <Upload name="file" action="/api/admin/img/v1/upload?imgPath=case" listType="picture" headers={{Token: Cookie.get('token')}}>
            <Button>
              <Icon type="upload" /> 点击上传文件
            </Button>
          </Upload>
        )}
      </Form.Item>
      <Form.Item
        label="排序权重："
      >
        {getFieldDecorator('seq', {
          rules: [{
            required: true, message: '请输入排序权重',
          }],
          initialValue: currentCase ? currentCase.seq : '',
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
const Connected = connect()(AddCase)
const WrappedForm = Form.create({ name: 'add-case' })(Connected);
export default WrappedForm
