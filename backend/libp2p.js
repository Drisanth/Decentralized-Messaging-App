import { createLibp2p } from 'libp2p';
import { WebSockets } from '@libp2p/websockets';
import { Mplex } from '@libp2p/mplex';
import { Noise } from '@libp2p/noise';
import { Bootstrap } from '@libp2p/bootstrap';

const node = await createLibp2p({
    addresses: { listen: ['/ip4/127.0.0.1/tcp/0'] },
    transports: [new WebSockets()],
    streamMuxers: [new Mplex()],
    connectionEncryption: [new Noise()],
    peerDiscovery: [new Bootstrap({ list: ['/ip4/192.168.1.2/tcp/4001/p2p/QmPeerID'] })]
});

await node.start();
console.log('P2P Node started:', node.peerId.toB58String());
export default node;
