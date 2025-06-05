import React, { useState } from 'react';
import classNames from 'classnames';
import Form from '../../../../ui-kit/Form';
import UseInputState from '../../../../hooks/useInputState';
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
