const peerConnection = new RTCPeerConnection();
peerConnection.ondatachannel = event => {
    const receiveChannel = event.channel;
    receiveChannel.onmessage = e => console.log('Received message:', e.data);
};

const dataChannel = peerConnection.createDataChannel("chat");
dataChannel.send("Hello, Peer!");
