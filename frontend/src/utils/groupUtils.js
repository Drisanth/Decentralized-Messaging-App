import { sha256 } from 'js-sha256';

export const generateGroupId = (groupName) => {
  return '0x' + sha256(groupName);
};
