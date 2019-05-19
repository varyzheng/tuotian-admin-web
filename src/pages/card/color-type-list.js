
import { connect } from 'dva';
import { Table } from 'antd';
import Link from 'umi/link';

const ColorTypeList = (props) => {
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
          <Link to={`/card/edit-color-type?id=${record.id}`}>修改</Link>
        </span>
      ),
    },
  ];
  const pagination = {
    showTotal: (total) => `共 ${total} 条`
  }
  return (
    <Table columns={columns} dataSource={props.colorTypeList} rowKey="id" pagination={pagination}/>
  );
}

const Connected = connect(({ colorTypeList }) => ({ colorTypeList }))(ColorTypeList)
export default Connected
