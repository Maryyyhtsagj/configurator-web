import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './css/index.module.scss';
import QuestionsForm from '../../../../components/QuestionsForm';

function Questions() {
  return (
    <section className={styles.questions}>
      <div className={classNames('container')}>
        <div className={styles.questionsInner}>
          <QuestionsForm />
        </div>
      </div>
    </section>
  );
}

export default Questions;
