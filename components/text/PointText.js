/* eslint-disable linebreak-style */
import React from 'react';
import clsx from 'clsx';
import Text from './Text';
import classes from './PointText.module.scss';

function PointText({ className, children }) {
  return (
    <div className={clsx(classes.pointText, className)}>
      <div className={classes.circle} />
      <Text>{children}</Text>
    </div>
  );
}

export default PointText;
