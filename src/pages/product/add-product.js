import { connect } from 'dva';
import basic from '@/css/basic.css';
import {
  Form, Input, Radio, Button, Upload, Icon, Switch, Transfer, Table
} from 'antd';
import Cookie from '@/utils/Cookie';
import { imgFolder } from '@/utils/Constants';

const AddProduct = (props) => {

  const { dispatch, location, productTypeParent, productTypeChild, currentProduct, allColor, innerTargetKeys, outterTargetKeys, mapping } = props

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
        if (values.featureImg.file && values.featureImg.file.response && values.featureImg.file.response.code === 200) {
          values.featureImg = imgFolder + values.featureImg.file.response.data
        }
        if (values.showImg.file && values.showImg.file.response && values.showImg.file.response.code === 200) {
          values.showImg = imgFolder + values.showImg.file.response.data
        }
        values.hot = Number(values.hot)
        values.mapping = selectedColors
        let type = 'currentProduct/addProduct'
        if (location.pathname === '/product/edit-product') {
          values.id = currentProduct.id
          type = 'currentProduct/updateProduct'
        }
        dispatch({
          type,
          payload: values,
        })
      }
    });
  }

  const handleInnerChange = (nextTargetKeys) => {
    dispatch({
      type: 'innerTargetKeys/transfer',
      payload: nextTargetKeys,
    })
  }

  const handleOutterChange = (nextTargetKeys) => {
    dispatch({
      type: 'outterTargetKeys/transfer',
      payload: nextTargetKeys,
    })
  }

  const handleInnerMappingUpload = (event, row) => {
    if (event.file && event.file.response && event.file.response.code === 200) {
      row.productMappingImg = imgFolder + event.file.response.data
    }
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

  let tempImg = '', tempRenderingImg = '', tempFeatureImg = '', tempShowImg = '';
  if (currentProduct) {
    tempImg = currentProduct.img
    tempRenderingImg = currentProduct.renderingImg
    tempFeatureImg = currentProduct.featureImg
    tempShowImg = currentProduct.showImg
  }

  const innerColors = []
  allColor.forEach(color => {
    if (innerTargetKeys.includes(color.key)) {
      const selected = {}
      selected.id = color.id
      selected.rowKey = `inner-${color.key}`
      selected.img = color.img
      selected.name = color.name
      selected.type = 1
      selected.typeDisplay = '内侧'
      selected.renderingImg = ''
      if (mapping && mapping[`1-${selected.id}`]) {
        selected.renderingImg = mapping[`1-${selected.id}`]
      }
      innerColors.push(selected)
    }
  })
  const outterColors = []
  allColor.forEach(color => {
    if (outterTargetKeys.includes(color.key)) {
      const selected = {}
      selected.id = color.id
      selected.rowKey = `outter-${color.key}`
      selected.img = color.img
      selected.name = color.name
      selected.type = 2
      selected.typeDisplay = '外侧'
      selected.renderingImg = ''
      if (mapping && mapping[`2-${selected.id}`]) {
        selected.renderingImg = mapping[`2-${selected.id}`]
      }
      outterColors.push(selected)
    }
  })
  const selectedColors = [...innerColors, ...outterColors]
  const columns = [
    {
      title: '内侧 / 外侧',
      dataIndex: 'typeDisplay',
      key: 'typeDisplay',
    },
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
    {
      title: '色卡对应效果图',
      dataIndex: 'renderingImg',
      key: 'renderingImg',
      render: (value, row, index) => {
        return (
          <div>
            { row.renderingImg ? <a target="_blank" rel="noopener noreferrer" href={row.renderingImg}><img src={row.renderingImg} alt="效果图"/></a> : ''}
            <Upload name="file" action="/api/admin/img/v1/upload?imgPath=product" listType="picture" headers={{Token: Cookie.get('token')}} onChange={(event) => handleInnerMappingUpload(event, row)}>
              <Button>
                <Icon type="upload" /> 点击上传文件
              </Button>
            </Upload>
          </div>
        )
      }
    }

  ];
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
        {tempImg ? <img className={basic.uploadImg} src={tempImg} alt="缩略图"/> : ''}
        {getFieldDecorator('img', {
          rules: [{
            required: true, message: '请选择上传缩略图',
          }],
          initialValue: tempImg
        })(
          <Upload name="file" action="/api/admin/img/v1/upload?imgPath=product" listType="picture" headers={{Token: Cookie.get('token')}}>
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
          initialValue: tempRenderingImg
        })(
          <Upload name="file" action="/api/admin/img/v1/upload?imgPath=product" listType="picture" headers={{Token: Cookie.get('token')}}>
            <Button>
              <Icon type="upload" /> 点击上传文件
            </Button>
          </Upload>
        )}
      </Form.Item>
      <Form.Item
        label="产品特点"
      >
        {tempFeatureImg ? <img className={basic.uploadImg} src={tempFeatureImg} alt="效果图"/> : ''}
        {getFieldDecorator('featureImg', {
          rules: [{
            required: true, message: '请选择上传产品特点图',
          }],
          initialValue: tempFeatureImg
        })(
          <Upload name="file" action="/api/admin/img/v1/upload?imgPath=product" listType="picture" headers={{Token: Cookie.get('token')}}>
            <Button>
              <Icon type="upload" /> 点击上传文件
            </Button>
          </Upload>
        )}
      </Form.Item>
      <Form.Item
        label="窗用型材"
      >
        {tempShowImg ? <img className={basic.uploadImg} src={tempShowImg} alt="效果图"/> : ''}
        {getFieldDecorator('showImg', {
          rules: [{
            required: true, message: '请选择上传效果图',
          }],
          initialValue: tempShowImg
        })(
          <Upload name="file" action="/api/admin/img/v1/upload?imgPath=product" listType="picture" headers={{Token: Cookie.get('token')}}>
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
          listStyle={{
            width: 250,
            height: 300,
          }}
          titles={['色卡列表', '已选择色卡']}
          targetKeys={innerTargetKeys}
          onChange={handleInnerChange}
          locale={{itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空',}}
          render={item => item.name}
        />
      </Form.Item>
      <Form.Item
        label="选择外侧色卡"
      >
        <Transfer
          dataSource={allColor}
          listStyle={{
            width: 250,
            height: 300,
          }}
          titles={['色卡列表', '已选择色卡']}
          targetKeys={outterTargetKeys}
          onChange={handleOutterChange}
          locale={{itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空',}}
          render={item => item.name}
        />
      </Form.Item>
      <Form.Item
        label="对应色卡效果图"
      >
        <Table columns={columns} dataSource={selectedColors} rowKey="rowKey" className={basic['table-with-img']}/>
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
