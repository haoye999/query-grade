import React from 'react';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';

import './index.less';

let messageInstance = null;
let open = false;
const ColorBox = {
  success: '#2ecc71',
  error: '#e74c3c',
}

function notice(type, content) {
  if (!open) {
    Notification.newInstance({}, notification => {
      messageInstance = notification;
    });
    open = true;
  }

  const color = ColorBox[type];
  messageInstance.notice({
    style: {
      right: '50%',
      top: '-24px',
      color,
    },
    content: (
      <div>
        {content}
      </div>
    ),
    duration: 3,
    closable: true,
  })
}

export default {
  error: (content) => notice('error', content),
  success: (content) => notice('success', content),
}