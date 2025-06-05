import React from 'react';
import styles from './css/index.module.scss';
import Create from './components/Create';
import WhatIs from './components/WhatIs';
import Instruction from './components/Instruction';
import Questions from './components/Questions';

function Home() {
  return (
    <div>
      <Create />
      <WhatIs />
      <Instruction />
      <Questions />
    </div>
  );
}
export default Home;
