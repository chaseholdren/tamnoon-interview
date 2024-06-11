import React from 'react';

interface UseDateRangePickerOptions {
  minDate?: Date;
  maxDate?: Date;
}

export const useDateRangePicker = (options: UseDateRangePickerOptions = {}) => {
  const { minDate = new Date(), maxDate = new Date() } = options;

  const [startDate, setStartDate] = React.useState(minDate);
  const [endDate, setEndDate] = React.useState(maxDate);

  // React.useEffect(() => {
  //   if (minDate > startDate) return setStartDate(minDate);
  //   if (maxDate < startDate) setStartDate(maxDate);

  // }, [minDate, startDate]);

  // React.useEffect(() => {
  //   if (minDate > endDate) return setEndDate(minDate);
  //   if (maxDate < endDate) setEndDate(maxDate);

  // }, [minDate, endDate]);

  return {
    minDate,
    maxDate,
    startDate,
    endDate,
    setStartDate: (value: string) => setStartDate(new Date(value)),
    setEndDate: (value: string) => setEndDate(new Date(value)),
  };
};

interface DateRangePickerProps {
  minDate?: Date;
  maxDate?: Date;
  startDate: Date;
  endDate: Date;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  // setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

const getHTMLFormattedDate = (date: Date) => date.toISOString().substring(0, 10);

export const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const { startDate, endDate, setStartDate, setEndDate, minDate, maxDate } = props;

  return (
    <React.Fragment>
      <input
        type="date"
        id="start"
        name="start-date"
        value={getHTMLFormattedDate(startDate)}
        min={minDate && getHTMLFormattedDate(minDate)}
        max={maxDate && getHTMLFormattedDate(maxDate)}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        id="end"
        name="end-date"
        value={getHTMLFormattedDate(endDate)}
        min={minDate && getHTMLFormattedDate(minDate)}
        max={maxDate && getHTMLFormattedDate(maxDate)}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </React.Fragment>
  );
};
