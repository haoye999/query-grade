import React from 'react';
import './tips.less';

/**
 * props: tips
 */
class Tips extends React.Component {
  constructor() {
    super();
    this.tipsRef = React.createRef();
  }

  render() {
    const { tips } = this.props;

    return <div className={tips ? 'tips' : 'tips tips-disabled'} ref={this.tipsRef}>{tips}</div>;
  }
}

export default Tips;