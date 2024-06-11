import { Asset } from './assets';
import { ColumnDefinition } from '../components/Table';
import GrayJewel from '@/icons/gray-jewel.svg?react';
import RedJewel from '@/icons/red-jewel.svg?react';
import GreenJewel from '@/icons/green-jewel.svg?react';
import BlueJewel from '@/icons/blue-jewel.svg?react';

export const columnDefinitions: ColumnDefinition<Asset>[] = [
  {
    header: 'id',
    getCellContents: (row) => row.id,
  },
  {
    header: 'Creation Date',
    getCellContents: (row) => row.createdString,
  },
  {
    header: 'Criticality',
    getCellContents: (row) => (row.criticality ? row.criticality.toString() : ''),
  },
  {
    header: 'Type',
    getCellContents: (row) => row.assetType,
  },
  {
    header: 'Env',
    getCellContents: (row) => row.env,
  },
  {
    header: 'Is Crown Jewel',
    getCellContents: (row) => {
      let JewelComponent;
      if (row.crownJewelIndicator === 'OVERRIDE') {
        JewelComponent = row.isCrownJewel ? RedJewel : BlueJewel;
      } else {
        JewelComponent = row.isCrownJewel ? GreenJewel : GrayJewel;
      }
      return <JewelComponent />;
    },
  },
  {
    header: 'Asset Name',
    getCellContents: (row) => row.name,
  },
  {
    header: 'Owner Name',
    getCellContents: (row) => row.ownerName,
  },
  {
    header: 'Tags',
    getCellContents: (row) => row.tagString,
  },
];
