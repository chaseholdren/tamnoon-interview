import React from 'react';
import { assets as initialAssets } from './tableData';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Table } from '@/components/Table';
import { columnDefinitions } from './columnDefinitions';
import { css } from '@emotion/react';

const filterContainerCss = css({
  textAlign: 'left',
  marginBottom: 28,
  '& label': {
    marginRight: 14,
  },
});

// const initialState = {};

// type ACTIONTYPE = { type: 'increment'; payload: number } | { type: 'decrement'; payload: string };

// function reducer(state: typeof initialState, action: ACTIONTYPE) {
//   switch (action.type) {
//     case 'setStartDate':
//       return { count: state.count + action.payload };
//     case 'decrement':
//       return { count: state.count - Number(action.payload) };
//     default:
//       throw new Error();
//   }
// }

const AssetsPage: React.FC = () => {
  const [assets, setAssets] = React.useState(initialAssets);

  const allCreatedDates = React.useMemo(() => assets.map((asset) => asset.createdDate), [assets]);

  const minDate = React.useMemo(() => {
    const minValue = Math.min(...allCreatedDates.map((date) => new Date(date).getTime()));
    return new Date(minValue);
  }, [allCreatedDates]);

  const maxDate = React.useMemo(() => {
    const maxValue = Math.max(...allCreatedDates.map((date) => new Date(date).getTime()));
    return new Date(maxValue);
  }, [allCreatedDates]);

  const [startDateFilter, setStartDateFilter] = React.useState(minDate);
  const [endDateFilter, setEndDateFilter] = React.useState(maxDate);
  const [assetTypeFilter, setAssetTypeFilter] = React.useState('');
  const [nameSearch, setNameSearch] = React.useState('');

  const filteredAssets = React.useMemo(() => {
    return assets.filter((asset) => {
      if (assetTypeFilter && asset.assetType !== assetTypeFilter) {
        return false;
      }
      if (nameSearch) {
        return asset.name.toLowerCase().includes(nameSearch.toLowerCase());
      }
      const createdDate = asset.createdDate.getTime();
      return createdDate >= startDateFilter.getTime() && createdDate <= endDateFilter.getTime();
    });
  }, [assets, startDateFilter, endDateFilter, assetTypeFilter, nameSearch]);

  const sortedAssets = React.useMemo(
    () => [...filteredAssets].sort((a, b) => (b.criticality || 0) - (a.criticality || 0)),
    [filteredAssets],
  );

  const id = React.useId();
  const typeFilterId = id + '-type-filter';
  const nameSearchId = id + '-name-search';

  return (
    <React.Fragment>
      <div css={filterContainerCss}>
        <DateRangePicker
          label="Creation Date"
          startDate={startDateFilter}
          endDate={endDateFilter}
          onChangeStartDate={setStartDateFilter}
          onChangeEndDate={setEndDateFilter}
          minDate={minDate}
          maxDate={maxDate}
        />
        <div>
          <label htmlFor={typeFilterId}>Asset Type</label>
          <select
            id={typeFilterId}
            value={assetTypeFilter}
            onChange={(e) => {
              setAssetTypeFilter(e.target.value);
            }}
          >
            <option value=""></option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.assetType}>
                {asset.assetType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={nameSearchId}>Name</label>
          <input
            id={nameSearchId}
            value={nameSearch}
            onChange={(e) => {
              setNameSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <Table
        columns={columnDefinitions}
        rowKeyAccessor="id"
        getRowKey={(row) => row.id}
        data={sortedAssets}
      />
    </React.Fragment>
  );
};

export default AssetsPage;
