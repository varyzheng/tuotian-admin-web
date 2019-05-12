import { connect } from 'dva';
import basic from '@/css/basic.css';
import {
  Form, Input, Radio, Button, Upload, Icon, Switch, Transfer, Table
} from 'antd';

const AddProduct = (props) => {

  const { dispatch, productTypeParent, productTypeChild, currentProduct, allColor, innerTargetKeys } = props

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (props.currentProduct) {
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

  const handleInnerChange = (nextTargetKeys) => {
    dispatch({
      type: 'innerTargetKeys/transfer',
      payload: nextTargetKeys,
    })
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
  const radiosChild = []
  productTypeChild.forEach(item => {
    radiosChild.push(<Radio value={item.id} key={`productTypeChild_${item.id}`}>{item.name}</Radio>)
  })
  let imgURL, renderingURL
  if (currentProduct) {
    imgURL = {
      name: '图片1',
      url: currentProduct.img,
      uid: 1
    }
    renderingURL = {
      name: '图片2',
      url: currentProduct.rendering,
      uid: 2
    }
  }
  const innerColors = allColor.filter(item => innerTargetKeys.includes(item.key))
  const columns = [
    {
      title: '色卡名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '色卡缩略图',
      dataIndex: 'img',
      key: 'img',
      render: (value, row, index) => {
        return <a target="_blank" rel="noopener noreferrer" href={value}><img src={value} alt={row.name}/></a>
      },
    },
  ];
  console.log(innerColors)
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className={basic.form}>
      <Form.Item
        label="产品名称："
      >
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: '请输入产品名称',
          }],
          initialValue: currentProduct ? currentProduct.name : '',
        })(
          <Input />
        )}
      </Form.Item>

      <Form.Item
        label="产品类型"
      >
        {getFieldDecorator('typeId', {
          rules: [{
            required: true, message: '请选择产品类型',
          }],
          initialValue: currentProduct ? currentProduct.typeId : '',
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
      <Form.Item
        label="产品特点"
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
      <Form.Item
        label="窗用型材"
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
          initialValue: currentProduct ? currentProduct.hot : false,
        })(<Switch />)}
      </Form.Item>
      <Form.Item
        label="选择内侧色卡"
      >
        <Transfer
          dataSource={allColor}
          titles={['色卡列表', '已选择色卡']}
          targetKeys={innerTargetKeys}
          onChange={handleInnerChange}
          locale={{itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空',}}
          render={item => item.name}
        />
        <Table columns={columns} dataSource={innerColors} rowKey="id" className={basic['table-with-img']}/>
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 12, offset: 6 }}
      >
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
}
const Connected = connect(({ productTypeParent, productTypeChild, allColor, innerTargetKeys, outterTargetKeys }) => ({ productTypeParent, productTypeChild, allColor, innerTargetKeys, outterTargetKeys }))(AddProduct)
const WrappedForm = Form.create({ name: 'add-product' })(Connected);
export default WrappedForm
