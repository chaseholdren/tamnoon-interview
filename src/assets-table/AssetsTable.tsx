import React from 'react';
import { assets as defaultAssets, Asset } from './assets';
import { Table } from '@/components/Table';
import { columnDefinitions } from '@/assets-table/column-definitions';
import { useDateRangePicker, DateRangePicker } from '@/components/DateRangePicker';

const AssetsTable: React.FC = () => {
  const [assets, setAssets] = React.useState(defaultAssets);

  const allCreatedDates = React.useMemo(() => assets.map((asset) => asset.createdDate), [assets]);

  const minDate = React.useMemo(() => {
    const minValue = Math.min(...allCreatedDates.map((date) => new Date(date).getTime()));
    return new Date(minValue);
  }, [allCreatedDates]);

  const maxDate = React.useMemo(() => {
    const maxValue = Math.max(...allCreatedDates.map((date) => new Date(date).getTime()));
    return new Date(maxValue);
  }, [allCreatedDates]);

  const { startDate, endDate, setStartDate, setEndDate } = useDateRangePicker({
    minDate,
    maxDate,
  });

  const filteredAssets = React.useMemo(() => {
    return assets.filter((asset) => {
      const createdDate = new Date(asset.createdDate).getTime();
      return createdDate >= startDate.getTime() && createdDate <= endDate.getTime();
    });
  }, [assets, startDate, endDate]);

  const sortedAssets = React.useMemo(
    () => [...filteredAssets].sort((a, b) => (b.criticality || 0) - (a.criticality || 0)),
    [filteredAssets],
  );

  console.log({
    assets,
    filteredAssets,
    sortedAssets,
    startDate,
    endDate,
    minDate,
    maxDate,
  });

  return (
    <React.Fragment>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        minDate={minDate}
        maxDate={maxDate}
      />
      <Table columns={columnDefinitions} rowKeyAccessor="id" data={sortedAssets} />
      Count: {sortedAssets.length}
    </React.Fragment>
  );
};

export default AssetsTable;
