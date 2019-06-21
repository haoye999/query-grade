import React from 'react';
import './grade-table.less';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class GradeTable extends React.Component {
  render() {
    const columns = [
      {
        Header: '课程名称',
        accessor: 'kcmc' // String-based value accessors!
      },
      {
        Header: '课程性质',
        accessor: 'kcxzmc'
      },
      {
        Header: '类别名称',
        accessor: 'kclbmc'
      },
      {
        Header: '学分',
        accessor: 'xf'
      },
      {
        Header: '学期名称',
        accessor: 'xqmc'
      },
      {
        Header: '成绩',
        accessor: 'zcj'
      }
    ];
    const { data } = this.props;
    const previousText = '上一页';
    const nextText = '下一页';
    const noDataText = '请在上方输入待查询学号';
    const rowsText = '行';

    return (
      <ReactTable
        data={data}
        columns={columns}
        previousText={previousText}
        nextText={nextText}
        noDataText={noDataText}
        rowsText={rowsText}
      />
    );
  }
}

export default GradeTable;
