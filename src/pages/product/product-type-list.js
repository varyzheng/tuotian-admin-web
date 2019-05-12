
import basic from '@/css/basic.css';
import { connect } from 'dva';
import { Table, Divider } from 'antd';
import Link from 'umi/link';

const ProductTypeList = (props) => {
  const deleteType = (id) => {
    console.log('delete ' + id)
  }
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '父级分类',
      dataIndex: 'parentName',
      key: 'parentName',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/product/edit-product-type?id=${record.id}`}>修改</Link>
          <Divider type="vertical" />
          <span className={basic.a} onClick={() => { deleteType(record.id)} }>删除</span>
        </span>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={props.productTypeList} rowKey="id"/>
  );
}

const Connected = connect(({ productTypeList }) => ({ productTypeList }))(ProductTypeList)
export default Connected
