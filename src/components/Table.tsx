import React from 'react';
import { css } from '@emotion/react';

export interface ColumnDefinition<Row> {
  header: string;
  getCellContents: (row: Row) => React.ReactNode;
}

export interface Props<Row> {
  columns: ColumnDefinition<Row>[];
  data: Row[];
  getRowKey: (row: Row) => string;
  rowKeyAccessor: keyof Row;
}

export function Table<Row>(props: Props<Row>) {
  const { columns, data, rowKeyAccessor } = props;
  if (!columns || !data || !rowKeyAccessor) {
    return null;
  }

  return (
    <table
      css={css({
        tableLayout: 'fixed',
        width: '100%',
        // borderCollapse: 'collapse',
        // borderSpacing: 0,
      })}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row[rowKeyAccessor]}>
              {columns.map((column) => {
                const cellContents = column.getCellContents(row);
                return (
                  <td
                    css={css({
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    })}
                    title={typeof cellContents === 'string' ? cellContents : ''}
                    key={column.header}
                  >
                    {cellContents}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
