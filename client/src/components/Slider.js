import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  };

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        step={1}
        min={1}
        max={5}
        marks={[
            {
              value: 1,
              label: '1',
            },
            {
              value: 2,
              label: '2',
            },
            {
              value: 3,
              label: '3',
            },
            {
              value: 4,
              label: '4',
            },
            {
              value: 5,
              label: '5',
            },
        ]}
      />
    </div>
  );
}