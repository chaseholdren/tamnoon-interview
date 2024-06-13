import React from 'react';
import { DateInput } from '@/components/DateInput';

interface DateRangePickerProps {
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
}

export const DateRangePicker = (props: DateRangePickerProps) => {
  const { startDate, onChangeStartDate, endDate, onChangeEndDate, minDate, maxDate, label } = props;

  const id = React.useId();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <DateInput
        id={id + '-date-start'}
        value={startDate}
        min={minDate}
        max={maxDate}
        onChange={onChangeStartDate}
      />
      {' - '}
      <DateInput
        id={id + '-date-end'}
        value={endDate}
        min={minDate}
        max={maxDate}
        onChange={onChangeEndDate}
      />
    </div>
  );
};
