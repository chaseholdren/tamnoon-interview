import React from 'react';
import { assets as initialAssets } from './tableData';
import { DateRangePicker, DateRangeValue } from '@components/DateRangePicker';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { css } from '@emotion/react';
import { BlueJewelIcon } from '@icons/BlueJewelIcon';
import { RedJewelIcon } from '@icons/RedJewelIcon';
import { GreenJewelIcon } from '@icons/GreenJewelIcon';
import { GrayJewelIcon } from '@icons/GrayJewelIcon';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Paper, Typography, Grid, TextField, MenuItem, Button } from '@mui/material';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);
dayjs.extend(isBetween);

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

// const FiltersPaper = styled(Paper)(({ theme }) => ({
//   width: 120,
//   height: 120,
//   padding: theme.spacing(2),
// }));

const createdValues = initialAssets.map((asset) => dayjs(asset.created));
const minDate = dayjs.min(createdValues);
const maxDate = dayjs.max(createdValues);
const assetTypes = Array.from(new Set(initialAssets.map((asset) => asset.assetType)));

const columns: GridColDef[] = [
  { field: 'id', headerName: 'id' },
  { field: 'name', headerName: 'Asset Name', flex: 1 },
  { field: 'ownerName', headerName: 'Owner Name', flex: 1 },
  {
    field: 'created',
    headerName: 'Creation Date',
    flex: 1,
    type: 'dateTime',
    valueGetter: (value) => {
      return new Date(value);
    },
    valueFormatter: (value) => dayjs(value).format('YYYY-MM-DD h:mm:ss'),
  },
  { field: 'criticalityFactor', headerName: 'Criticality', flex: 1 },
  { field: 'assetType', headerName: 'Type', flex: 1 },
  { field: 'env', headerName: 'Env' },
  {
    field: 'isCrownJewel',
    headerName: 'Is Crown Jewel',
    flex: 1,
    editable: true,
    valueGetter: (_, row) => {
      if (row.crownJewelIndicator === 'OVERRIDE') {
        return row.isCrownJewel ? 'red' : 'blue';
      }
      return row.isCrownJewel ? 'green' : 'gray';
    },
    type: 'string',
    renderCell: (params: GridRenderCellParams<any, string>) => {
      if (typeof params.value === 'undefined') return '';
      return {
        blue: <BlueJewelIcon />,
        red: <RedJewelIcon />,
        green: <GreenJewelIcon />,
        gray: <GrayJewelIcon />,
      }[params.value];
    },
  },
  { field: 'tagString', headerName: 'Tags' },
];

export const AssetsTable: React.FC = () => {
  const [assets, setAssets] = React.useState(initialAssets);

  const [createdDateFilter, setCreatedDateFilter] = React.useState<DateRangeValue>([
    minDate,
    maxDate,
  ]);
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
      const createdDate = dayjs(asset.created);
      return createdDate.isBetween(createdDateFilter[0], createdDateFilter[1]);
    });
  }, [assets, createdDateFilter, assetTypeFilter, nameSearch]);

  const handleClearFilters = React.useCallback(() => {
    setCreatedDateFilter([minDate, maxDate]);
    setAssetTypeFilter('');
    setNameSearch('');
  }, []);

  return (
    <div>
      <Paper
        variant="outlined"
        sx={{
          padding: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h5">Filters</Typography>
          </Grid>
          <Grid item xs="auto">
            <DateRangePicker
              labels={{
                start: 'Created Date',
              }}
              value={createdDateFilter}
              onAccept={(value) => {
                setCreatedDateFilter(value);
              }}
              minDate={minDate}
              maxDate={maxDate}
            />
          </Grid>
          <Grid item xs="auto">
            <TextField
              select
              label="Asset Type"
              size="small"
              value={assetTypeFilter}
              onChange={(e) => {
                setAssetTypeFilter(e.target.value);
              }}
              sx={{
                minWidth: 130,
              }}
            >
              <MenuItem value={''}>
                <em>None</em>
              </MenuItem>
              {assetTypes.map((assetType) => (
                <MenuItem key={assetType} value={assetType}>
                  {assetType}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              label="Name"
              size="small"
              value={nameSearch}
              onChange={(e) => {
                setNameSearch(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <DataGrid
        disableColumnMenu
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: 'criticalityFactor', sort: 'desc' }],
          },
        }}
        rows={filteredAssets}
        columns={columns}
      />
    </div>
  );
};

export default AssetsTable;
