let transcript_text ={}
let baseurl="https://digital-converter.onrender.com"
var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';

    $('#start').click(function() {
        console.log("start");
        recognition.start();
    });

    $('#stop').click(function() {
        console.log("stop");
        recognition.stop();
    });

    recognition.onresult = function(event) {
        console.log("onresult");
        var transcript = event.results[0][0].transcript;
        $('#output').text(transcript);
        transcript_text.text = transcript
        let data = { text: transcript }
        uploadSpeech(data)
        // Convert transcript to WAV
    };




async function uploadSpeech(transcript) {
    // Upload the audio blob to the server
    let headers = {
        "Content-Type" : 'application/json'
    }
    try {
        const response = await fetch(baseurl +'/translate_text/', {
            method: 'POST',
            body: JSON.stringify(transcript),
            headers:headers
        });

        if (response.ok) {
            console.log("response",response);
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
             
            // Get the existing audio element
            const existingAudioElement = document.getElementById('audioPlayer');
             
            // If the audio element already exists, update its source
            if (existingAudioElement) {
                existingAudioElement.src = audioUrl;
            } else {
                // If the audio element doesn't exist, create a new one
                const audioElement = document.createElement('audio');
                audioElement.src = audioUrl;
                audioElement.controls = true;
                audioElement.id = 'audioPlayer'; // Set an id for the audio element
                $("#output_voice").append(audioElement);
            }
        } else {
            console.error('Failed to upload audio:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading audio:', error);
    }
}




  

async function uploadAudio() {
    $("#translateButton span").removeClass("d-none");
    $("#translateButton").attr('disabled', true)
    $("#audioFile").attr('disabled', true)
    const fileInput = document.getElementById('audioFile');
    const file = fileInput.files[0];

    if (!file) {
        $("#translateButton span").addClass("d-none");
        alert('Please select an audio file.');
        $("#translateButton").attr('disabled', false)
        $("#audioFile").attr('disabled', false)
        return;
    }

    const formData = new FormData();
    formData.append('file', file);


    try {
        const response = await fetch(baseurl+'/translate/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            $("#translateButton span").addClass("d-none");
            $("#translateButton").attr('disabled', false)
            $("#audioFile").attr('disabled', false)
            // console.log("response",response);
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            // const audioElement = $("#outputaudio")
            // audioElement.src = audioUrl;
            // audioElement.controls = true;
            // document.body.append(audioElement);


             // Get the existing audio element
             const existingAudioElement = document.getElementById('audioPlayers');
             
             // If the audio element already exists, update its source
             if (existingAudioElement) {
                 existingAudioElement.src = audioUrl;
             } else {
                 // If the audio element doesn't exist, create a new one
                 const audioElement = document.createElement('audio');
                 audioElement.src = audioUrl;
                 audioElement.controls = true;
                 audioElement.id = 'audioPlayers'; // Set an id for the audio element
                 $("#output_audio").append(audioElement);
             }
        } else {
            console.error('Failed to upload audio:', response.statusText);
            $("#translateButton span").addClass("d-none");
            $("#translateButton").attr('disabled', false)
            $("#audioFile").attr('disabled', false)
        }
    } catch (error) {
        console.error('Error uploading audio:', error);
        $("#translateButton span").addClass("d-none");
        $("#translateButton").attr('disabled', false)
        $("#audioFile").attr('disabled', false)
    }
}