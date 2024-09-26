
const APP_ID = "d24cad8c62a545e8a4442b7efec4c9df";
const TOKEN = "007eJxTYHApnJe3fkXw1AbdlFexwpseHt25b0Xgqz3PcqcZWiVrPrquwGBkZGFobm5uZmFmZGFiYJ6amGIEFDI3SDFPNDQwNTafG/QlrSGQkcGYTYWFkQECQXwWhtzEzDwGBgCIuR8k";
const CHANNEL = "main";
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
let localTracks = [];
let remoteUsers = {};
let generatedCode = null;

// Function to create a new meeting (API call to Flask backend)
let createNewMeeting = async () => {
    
    generatedCode = Math.random().toString(36).substring(2, 8);

    // API call to Flask backend to store the meeting code
    const response = await fetch('http://localhost:5001/create_meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: generatedCode })
    });

    if (response.ok) {
        alert(`New meeting created. Your meeting code is: ${generatedCode}`);
        joinAndDisplayLocalStream(generatedCode); // Join the new meeting
    } else {
        alert("Error creating the meeting. Please try again.");
    }
};

// Function to join an existing meeting (API call to Flask backend to verify code)
let joinExistingMeeting = async () => {
    let enteredCode = document.getElementById('meeting-code-input').value;

    // API call to Flask backend to verify the meeting code
    const response = await fetch('http://localhost:5001/verify_meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: enteredCode })
    });

    const result = await response.json();

    if (result.valid) {
        joinAndDisplayLocalStream(enteredCode); // Join the meeting if the code is valid
    } else {
        alert("Invalid meeting code! Please try again.");
    }
};

// Function to join a meeting and display the local stream
let joinAndDisplayLocalStream = async (code) => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="video-player" id="user-${UID}"></div>
                  </div>`;
    document.getElementById('video').insertAdjacentHTML('beforeend', player);

    localTracks[1].play(`user-${UID}`);

    await client.publish([localTracks[0], localTracks[1]]);

    // Hide the meeting controls and show the stream controls
    document.getElementById('stream-controls').style.display = 'flex';
    document.getElementById('meeting-controls').style.display = 'none';

    if (code) {
        document.getElementById('meeting-code').innerText = code;
        document.getElementById('meeting-code-display').style.display = 'block';
    }
};

// Event handler for when a remote user joins the meeting
let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user;
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
        let player = document.getElementById(`user-container-${user.uid}`);
        if (player != null) {
            player.remove();
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                    <div class="video-player" id="user-${user.uid}"></div>
                  </div>`;
        document.getElementById('video').insertAdjacentHTML('beforeend', player);

        user.videoTrack.play(`user-${user.uid}`);
    }

    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
};

// Event handler for when a remote user leaves the meeting
let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid];
    document.getElementById(`user-container-${user.uid}`).remove();
};

// Function to leave the meeting and remove the local stream
let leaveAndRemoveLocalStream = async () => {
    
    window.location.href = '/3';

    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].stop();
        localTracks[i].close();
    }

    await client.leave();

    generatedCode = null;

    // Clear the meeting code when leaving
    document.getElementById('meeting-code-display').style.display = 'none';
    document.getElementById('stream-controls').style.display = 'none';
    document.getElementById('video').innerHTML = '';
    document.getElementById('meeting-controls').style.display = 'block';

};

// Function to toggle microphone on/off
let toggleMic = async (e) => {
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false);
        e.target.innerText = 'Mic on';
        e.target.style.backgroundColor = 'cadetblue';
    } else {
        await localTracks[0].setMuted(true);
        e.target.innerText = 'Mic off';
        e.target.style.backgroundColor = '#EE4B2B';
    }
};

// Function to toggle camera on/off
let toggleCamera = async (e) => {
    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false);
        e.target.innerText = 'Camera on';
        e.target.style.backgroundColor = 'cadetblue';
    } else {
        await localTracks[1].setMuted(true);
        e.target.innerText = 'Camera off';
        e.target.style.backgroundColor = '#EE4B2B';
    }
};




document.addEventListener('DOMContentLoaded', () => {
    // Make sure the DOM is fully loaded before adding listeners
    document.getElementById('new-meeting').addEventListener('click', createNewMeeting);
    document.getElementById('join-meeting').addEventListener('click', joinExistingMeeting);
    document.getElementById('leave').addEventListener('click', leaveAndRemoveLocalStream);
    document.getElementById('mic').addEventListener('click', toggleMic);
    document.getElementById('camera').addEventListener('click', toggleCamera);
});
