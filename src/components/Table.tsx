import React from 'react';

export interface ColumnDefinition<Row> {
  header: string;
  getCellContents: (row: Row) => React.ReactNode;
}

export interface Props<Row> {
  columns: ColumnDefinition<Row>[];
  data: Row[];
  rowKeyAccessor: keyof Row;
}

export function Table<Row>(props: Props<Row>) {
  const { columns, data, rowKeyAccessor } = props;
  if (!columns || !data || !rowKeyAccessor) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row[rowKeyAccessor]}>
            {columns.map((column) => {
              const cellContents = column.getCellContents(row);
              return <td key={column.header}>{cellContents}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
