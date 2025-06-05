import React from 'react';
import styles from './css/index.module.scss';
import Questions from './components/Questions';
import ConfigInstructions from './components/ConfigInstructions';

function Instruction() {
  return (
    <div>
      <ConfigInstructions />
      <Questions />
    </div>
  );
}

export default Instruction;
