import rawAssets from '@/static/data/assets-data.json';

type RawAsset = (typeof rawAssets)[number];

type Owner = RawAsset['owner'] | { name: null };

export interface Asset {
  id: string;
  name: string;
  ownerName: string;
  createdString: string;
  createdDate: Date;
  criticality: number | null;
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

export const mapRawAsset = (asset: RawAsset): Asset => ({
  id: asset._id,
  name: asset.name,
  ownerName: getOwnerName(asset.owner),
  createdString: convertDateTimeFormat(asset.created),
  createdDate: new Date(asset.created),
  criticality: asset.criticalityFactor,
  assetType: asset.type,
  env: asset.enrich.env,
  isCrownJewel: asset.enrich.isCrownJewel,
  crownJewelIndicator: asset.enrich.crownJewelIndicator,
  tagString: getTagString(asset.tags),
});

export const assets = rawAssets.map(mapRawAsset);
