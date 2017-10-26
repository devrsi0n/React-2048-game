import React, { Component } from 'react';
import gitalk from '../../utils/gitalk';
import styles from './comments.scss';
import i18n from '../../utils/i18n';

export default class Comments extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') {
      gitalk.render('gitalk-container');
    }
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.comments}>
          {/* eslint-disable react/no-danger */}
          <p
            className={styles.commentsTitle}
            dangerouslySetInnerHTML={{ __html: i18n.commentTitle }}
          />
          <div id="gitalk-container" className={styles.container} />
        </div>
      </div>
    );
  }
}
