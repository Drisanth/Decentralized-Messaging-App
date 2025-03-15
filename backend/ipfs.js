import { create } from 'ipfs-core';

async function uploadToIPFS(data) {
    const ipfs = await create();
    const { cid } = await ipfs.add(data);
    return cid.toString();
}

async function getFromIPFS(cid) {
    const ipfs = await create();
    let content = '';
    for await (const chunk of ipfs.cat(cid)) {
        content += chunk.toString();
    }
    return content;
}

export { uploadToIPFS, getFromIPFS };
