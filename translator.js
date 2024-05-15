
async function uploadAudio() {
    console.log("hhhhh");
    const fileInput = document.getElementById('audioFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an audio file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/translate/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = document.createElement('audio');
            audioElement.src = audioUrl;
            audioElement.controls = true;
            document.body.appendChild(audioElement);
        } else {
            console.error('Failed to upload audio:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading audio:', error);
    }
}

