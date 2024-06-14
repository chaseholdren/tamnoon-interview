import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';

const datePickerCss = css({
  width: '160px',
});

export type DateRangeValue = [dayjs.ConfigType, dayjs.ConfigType];

interface DateRangePickerProps {
  labels?: {
    start?: string;
    end?: string;
  };
  size?: 'small' | 'medium';
  minDate?: dayjs.ConfigType;
  maxDate?: dayjs.ConfigType;
  value: DateRangeValue;
  onAccept?: (value: DateRangeValue) => void;
}

export const DateRangePicker = (props: DateRangePickerProps) => {
  const { minDate, maxDate, value, onAccept, labels = {}, size = 'small' } = props;
  const startValue = value[0];
  const endValue = value[1];

  const { start: startLabel = '', end: endLabel = '' } = labels;

  const id = React.useId();

  // const onAcceptStart = (acceptedValue: dayjs.ConfigType) => {
  //   onAccept([acceptedValue, endValue]);
  // };

  // const handleAcceptStart = onAccept ? onAcceptStart : undefined;

  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      })}
    >
      <DatePicker
        css={datePickerCss}
        label={startLabel}
        value={dayjs(startValue)}
        minDate={dayjs(minDate)}
        maxDate={dayjs(maxDate)}
        onAccept={(newStartValue) => {
          if (onAccept) onAccept([newStartValue, endValue]);
        }}
        slotProps={{
          textField: {
            size,
          },
        }}
      />
      <Typography variant="body1">{' — '}</Typography>
      <DatePicker
        css={datePickerCss}
        label={endLabel}
        value={dayjs(endValue)}
        minDate={dayjs(minDate)}
        maxDate={dayjs(maxDate)}
        onAccept={(newEndValue) => {
          if (onAccept) onAccept([startValue, newEndValue]);
        }}
        slotProps={{
          textField: {
            size,
          },
        }}
      />
    </div>
  );
};
