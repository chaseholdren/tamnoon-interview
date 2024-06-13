import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Asset, assets } from './tableData';

const rows: GridRowsProp<Asset> = assets;

const columns: GridColDef<Asset>[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];
export default function Table() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
