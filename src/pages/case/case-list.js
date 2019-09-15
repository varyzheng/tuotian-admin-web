
import basic from '@/css/basic.css';
import { connect } from 'dva';
import { Table } from 'antd';
import Link from 'umi/link';

const CaseList = (props) => {
  const columns = [
    {
      title: '案例名称',
      dataIndex: 'caseName',
      key: 'caseName',
    },
    {
      title: '所属省份',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: '案例图',
      dataIndex: 'caseImg',
      key: 'caseImg',
      render: (value, row, index) => {
        return <a target="_blank" rel="noopener noreferrer" href={value}><img src={value} alt={row.name}/></a>
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/case/edit-case?id=${record.id}`}>修改</Link>
        </span>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={props.caseList} rowKey="id" className={basic['table-with-img']}/>
  );
}

const Connected = connect(({ caseList }) => ({ caseList }))(CaseList)
export default Connected
