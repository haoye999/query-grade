import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import GradeTable from 'components/grade-table/grade-table';
import './query.less';

import { getGrade } from 'api/grade';

/**
 * props: setTips
 */
class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xh: '',
      grade: [],
      info: {}
    };
    this.handleXhChange = this.handleXhChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleXhChange(e) {
    this.setState({
      xh: e.target.value
    });
  }

  handleSearch() {
    const { xh } = this.state;
    const token = localStorage.token;

    getGrade(xh, token).then(data => {
      if (data.token === '-1') {
        // 查询失败
        this.setState({
          token: '-1'
        });
        this.props.setTips('请先登录');
        this.props.history.push('/login');
        return;
      }

      if (data[0] === null) {
        this.props.setTips('请输入正确学号');
        return;
      }

      this.setState({
        grade: data
      });

      this.calcInfo();
    });
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  calcInfo() {
    const { grade } = this.state;

    if (grade.length <= 0) {
      return;
    }

    const info = {};

    // 姓名
    info.name = grade[0].xm;
    // 总学分
    info.zxf = grade.reduce((pre, cur) => pre + cur.xf, 0);
    // 必修学分
    info.bxxf = grade.reduce(
      (pre, cur) => pre + (cur.kclbmc === '必修' ? cur.xf : 0),
      0
    );
    // 选修学分
    info.xxxf = grade.reduce(
      (pre, cur) => pre + (cur.kclbmc === '选修' ? cur.xf : 0),
      0
    );
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

    this.setState({
      info
    });
  }

  render() {
    const { info, grade } = this.state;

    return (
      <Route
        path={['/query', '/']}
        exact
        render={() => (
          <div className="query">
            <div className="xh-container">
              <input
                type="text"
                value={this.state.xh}
                onChange={this.handleXhChange}
                onKeyPress={this.handleEnter}
                placeholder="请输入待查询学号"
              />
              <button className="search" onClick={this.handleSearch}>
                <i className="iconfont icon-search" />
              </button>
            </div>
            <div className="info-container">
              {grade.length ? (
                <div className="info">
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
        )}
      />
    );
  }
}

export default withRouter(Query);
