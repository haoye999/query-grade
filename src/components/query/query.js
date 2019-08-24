import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import GradeTable from 'components/grade-table/grade-table';
import message from 'components/message';
import './query.less';

import { getGrade } from 'api/grade';

function Query(props) {
  const [xh, setXh] = useState('');
  const [grade, setGrade] = useState([]);
  const [info, setInfo] = useState({});

  function handleXhChange(e) {
    setXh(e.target.value);
  }

  function handleSearch() {
    const token = localStorage.token;
    getGrade(xh, token)
      .then(data => {
        if (data.token === '-1') {
          // 查询失败
          message.error('请先登录');
          props.history.push('/login');
          return;
        }

        if (data[0] === null) {
          message.error('请输入正确学号');
          return;
        }

        setGrade(data);
        calcInfo(data);
      })
      .catch((ex) => {
        message.error(ex.message)
      });
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  function calcInfo(grade) {
    const info = {};
    // 姓名
    info.name = grade[0].xm;
    // 总学分
    info.zxf = grade.reduce((pre, cur) => pre + cur.xf, 0);
    // 必修学分
    info.bxxf = grade.reduce(
      (pre, cur) => pre + (cur.kclbmc === '必修' ? cur.xf : 0), 0);
    // 选修学分
    info.xxxf = grade.reduce(
      (pre, cur) => pre + (cur.kclbmc === '选修' ? cur.xf : 0), 0);
    // 加权平均
    info.jqpj = (
      grade.reduce((pre, cur) => {
        let grade = cur.zcj;
        switch (grade) {
          case '通过':
            grade = 0;
            info.zxf -= 1;
            info.xxxf -= 1;
            break;
          case '免考':
          case '及格':
            grade = 60;
            break;
          case '优':
            grade = 95;
            break;
          case '良':
            grade = 85;
            break;
          case '中':
            grade = 75;
            break;
          default:
            break;
        }

        return pre + +grade * +cur.xf;
      }, 0) / info.zxf
    ).toFixed(2);

    setInfo(info);
  }

  return (
    <div className='query'>
      <div className='xh-container'>
        <input
          type='text'
          value={xh}
          onChange={handleXhChange}
          onKeyPress={handleEnter}
          placeholder='请输入待查询学号'
        />
        <button className='search' onClick={handleSearch}>
          <i className='iconfont icon-search' />
        </button>
      </div>
      <div className='info-container'>
        {grade.length ? (
          <div className='info'>
            <span>姓名：{info.name}</span>
            <span>总学分：{info.zxf}</span>
            <span>必修学分：{info.bxxf}</span>
            <span>选修学分：{info.xxxf}</span>
            <span>加权平均分：{info.jqpj}</span>
          </div>
        ) : (
            ''
          )}
      </div>
      <GradeTable data={grade} />
    </div>
  )
}

export default withRouter(Query);
