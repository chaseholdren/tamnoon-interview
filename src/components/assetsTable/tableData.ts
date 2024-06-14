import dayjs from 'dayjs';
import rawAssets from './assetsData.json';

type RawAsset = (typeof rawAssets)[number];

type Owner = RawAsset['owner'] | { name: null };

export interface Asset {
  id: string;
  name: string;
  ownerName: string;
  assetType: string;
  env: string;
  isCrownJewel: boolean;
  crownJewelIndicator: string;
  tagString: string;
}

export const getOwnerName = (owner: Owner): string => {
  if ('name' in owner && owner.name) {
    return owner.name;
  }
  if ('owner' in owner && owner.owner) {
    return getOwnerName(owner.owner);
  }
  return '';
};

export const convertDateTimeFormat = (dateTime: string): string => {
  const date = new Date(dateTime);
  return date.toLocaleString().replace(',', '').replace('AM', '').replace('PM', '');
};

export const getTagString = (tags: RawAsset['tags']): string => {
  const tagObject: Record<string, string> = {};

  for (const tag of tags) {
    if (!tagObject[tag.key]) {
      tagObject[tag.key] = tag.value || '';
    }
  }
  return Object.values(tagObject).join(', ');
};

export const mapRawAsset = (asset: RawAsset): Asset & RawAsset => ({
  ...asset.enrich,
  ...asset,
  id: asset._id,
  ownerName: getOwnerName(asset.owner),
  tagString: getTagString(asset.tags),
});

export const assets = rawAssets.map(mapRawAsset);
