import React from 'react';
import styles from './css/index.module.scss';
import WhatIsConfig from './components/WhatIsConfig';
import Questions from './components/Questions';

function About() {
  return (
    <div>
      <WhatIsConfig />
      <Questions />
    </div>
  );
}

export default About;
