console.log('index');

var audioWorkletNode = null;

function probeInit() {
    console.log('probe init');
    var audioContext = new AudioContext();
    audioContext.audioWorklet.addModule('VSTMDA.wasm.js')
        .then((v) => {
            audioContext.audioWorklet.addModule('VSTMDA.js')
                .then((v) => {
                    audioContext.audioWorklet.addModule('processormodule.js')
                        .then((v) => {
                            audioWorkletNode = new AudioWorkletNode(audioContext, 'VSTMDAProcessor', {});
                            audioWorkletNode.connect(audioContext.destination);
                            audioWorkletNode.port.onmessage = (event) => {
                                console.log('audioWorkletNode onmessage', event.data);
                            };
                        });
                });
        });
}

function probeStart() {
    console.log('probeStart');
    audioWorkletNode.port.postMessage([144, 62, 80]);
    setTimeout(function() { audioWorkletNode.port.postMessage([128, 62, 80]); }, 1000);
}