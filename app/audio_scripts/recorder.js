    // if (navigator.getUserMedia) {
    // console.log('getUserMedia supported.');
    // navigator.getUserMedia (
    //     {
    //       audio: true,
    //       video: false
    //     },
    //     // Success callback
    //     function(stream) {
    //       // the stream is the input source, I believe
    //       let masterOutput = Tone.Master.context.destination.context.createMediaStreamDestination();
    //       // let options = {mimeType: 'audio/mp3'}
    //       mediaRecorder = new MediaRecorder(masterOutput.stream);
    //       var myStream = mediaRecorder.stream;
    //       console.log(myStream);

    //       // console.log(mediaRecorder)

    //       // record.onclick = function() {
    //       // mediaRecorder.start();
    //       // console.log(mediaRecorder.state);
    //       // console.log("recorder started");
    //       // }
    //       // this event is fired in multiple circumstances, including when .stop is called on mediaRecorder
    //       var chunks = [];
    //       mediaRecorder.ondataavailable = function(e) {
    //         chunks.push(e.data);
    //       }

    //       // stop.onclick = function() {
    //       // mediaRecorder.stop();
    //       // console.log(mediaRecorder.state);
    //       // console.log("recorder stopped");
    //       // }
    //       mediaRecorder.onstop = function(e) {
    //         console.log("recorder stopped");

    //         var clipContainer = document.createElement('article');
    //         var audio = document.createElement('audio');;

    //         audio.setAttribute('controls', '');
    //         clipContainer.appendChild(audio)
    //         document.body.appendChild(clipContainer);

    //         // blob contains raw data of recorded sound
    //         var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
    //         chunks = [];
    //         // creates a url on the page that points to the sound file
    //         var audioURL = window.URL.createObjectURL(blob);
    //         // sets the audio element to playback from url
    //         audio.src = audioURL;
    //       }
    //     },
    //     // Error callback
    //     function(err) {
    //       console.log('The following gUM error occured: ' + err);
    //     }
    // );
    // } else {
    //   console.log('getUserMedia not supported on your browser!');
    // }
    // console.log(mediaRecorder)
