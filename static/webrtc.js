const APP_ID="d24cad8c62a545e8a4442b7efec4c9df"
const TOKEN="007eJxTYJDets2263nVuTndssmnzv8+M9WmMHqNCKea2VEJho9uM1crMBgZWRiam5ubWZgZWZgYmKcmphgBhcwNUswTDQ1Mjc3nvfmQ1hDIyBAcmM/IyACBID4LQ25iZh4DAwAtkx6a"
const CHANNEL = "main"
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

let localTracks = []
let remoteUsers = {}
let generatedCode = null

// Store the meeting code globally using localStorage
let saveMeetingCode = (code) => {
    localStorage.setItem('meetingCode', code)
}

let getStoredMeetingCode = () => {
    return localStorage.getItem('meetingCode')
}

let joinAndDisplayLocalStream = async (code) => {
    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="video-player" id="user-${UID}"></div>
                  </div>`
    document.getElementById('video').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])

    document.getElementById('stream-controls').style.display = 'flex'
    document.getElementById('meeting-controls').style.display = 'none'

    if (code) {
        document.getElementById('meeting-code').innerText = code
        document.getElementById('meeting-code-display').style.display = 'block'
    }
}

// Function to create a new meeting
let createNewMeeting = () => {
    generatedCode = Math.random().toString(36).substring(2, 8)
    alert(`New meeting created. Your meeting code is: ${generatedCode}`)

    // Save the generated meeting code globally (using localStorage)
    saveMeetingCode(generatedCode)

    joinAndDisplayLocalStream(generatedCode)
}

// Function to join an existing meeting
let joinExistingMeeting = async () => {
    let enteredCode = document.getElementById('meeting-code-input').value
    let storedCode = getStoredMeetingCode()

    if (enteredCode !== storedCode) {
        alert("Invalid meeting code! Please try again.")
        return
    }
    
    await joinAndDisplayLocalStream() // Join the meeting if the code is valid
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if (mediaType === 'video') {
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null) {
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                    <div class="video-player" id="user-${user.uid}"></div>
                  </div>`
        document.getElementById('video').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`)
    }

    if (mediaType === 'audio') {
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for (let i = 0; i < localTracks.length; i++) {
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()

    generatedCode = null

    localStorage.removeItem('meetingCode')  // Clear the meeting code when leaving

    document.getElementById('join').style.display = 'block'
    document.getElementById('stream-controls').style.display = 'none'
    document.getElementById('video').innerHTML = ''
    document.getElementById('meeting-code-display').style.display = 'none'
}

let toggleMic = async (e) => {
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false)
        e.target.innerText = 'Mic on'
        e.target.style.backgroundColor = 'cadetblue'
    } else {
        await localTracks[0].setMuted(true)
        e.target.innerText = 'Mic off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

let toggleCamera = async (e) => {
    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false)
        e.target.innerText = 'Camera on'
        e.target.style.backgroundColor = 'cadetblue'
    } else {
        await localTracks[1].setMuted(true)
        e.target.innerText = 'Camera off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

document.getElementById('new-meeting').addEventListener('click', createNewMeeting)
document.getElementById('join-meeting').addEventListener('click', joinExistingMeeting)
document.getElementById('leave').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mic').addEventListener('click', toggleMic)
document.getElementById('camera').addEventListener('click', toggleCamera)
