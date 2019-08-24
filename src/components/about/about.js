import React from 'react';
import './about.less';

function About() {
  const disclaimer =
    '本系统基于学校教务管理系统的部分漏洞，仅供学习使用，如若侵权/违规，联系立马删除。';
  const developer = '本人为中南大学16级学生，因对选修学分的困惑开发此系统。';
  return (
    <div className='about'>
      <h1 className='title'>About</h1>
      <div className='disclaimer'>
        <h3 className='small-title'>免责声明</h3>
        <p className='disclaimer-body'>{disclaimer}</p>
      </div>
      <div className='developer'>
        <h3 className='small-title'>开发者信息</h3>
        <p className='developer-body'>{developer}</p>
      </div>
      <div className='contact'>
        <h3 className='small-title'>联系方式</h3>
        <p className='contact-body'><a href='mailto:haoye999han@gmail.com'>haoye999han@gmail.com</a></p>
      </div>
    </div>
  );
}

export default About;
