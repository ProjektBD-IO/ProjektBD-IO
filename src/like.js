import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const styles = {
  root: {
    fontSize: 30,
    color: 'red',
    '&:hover': {
      color: 'blue',
    },
  },
};

function MyFunction(props) {
  const { classes } = props;
  return (
    <div>
      <ThumbUpIcon className={classes.root} />
    </div>
  );
}

export default withStyles(styles)(MyFunction);