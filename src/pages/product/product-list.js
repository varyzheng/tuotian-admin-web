
import basic from '@/css/basic.css';
import { connect } from 'dva';
import { Table } from 'antd';
import Link from 'umi/link';

const ProductList = (props) => {
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      render: (value, row, index) => {
        return value ? '是' : '否'
      },
    },
    {
      title: '缩略图',
      dataIndex: 'img',
      key: 'img',
      render: (value, row, index) => {
        return <a target="_blank" rel="noopener noreferrer" href={value}><img src={value} alt={row.name}/></a>
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/product/edit-product?id=${record.id}`}>修改</Link>
        </span>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={props.productList} rowKey="id" className={basic['table-with-img']}/>
  );
}

const Connected = connect(({ productList }) => ({ productList }))(ProductList)
export default Connected
