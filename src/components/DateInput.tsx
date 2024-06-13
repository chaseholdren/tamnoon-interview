import { getHTMLFormattedDate } from '@/helpers/getHTMLFormattedDate';

interface OwnProps {
  min?: Date;
  max?: Date;
  value: Date;
  onChange: (date: Date) => void;
}

type Props = OwnProps & Omit<React.HTMLProps<HTMLInputElement>, keyof OwnProps>;

export const DateInput = (props: Props) => {
  const { min, max, value, onChange } = props;

  return (
    <input
      {...props}
      value={getHTMLFormattedDate(value)}
      min={min && getHTMLFormattedDate(min)}
      max={max && getHTMLFormattedDate(max)}
      type="date"
      onChange={(e) => onChange(new Date(e.target.value))}
    />
  );
};
