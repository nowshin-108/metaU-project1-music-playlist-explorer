// JavaScript for Opening and Closing the Modal
var modal = document.getElementById("modal-overlay");
var span = document.getElementsByClassName("close")[0];
// grab section playlist cards

function openModal(array) {

    console.log(array);
    console.log(array.playlist_art);
    
    console.log("This function ran");


    let individual_playlist = document.createElement("div");
    individual_playlist.classList.add('modal-head-container');
    individual_playlist.innerHTML += `
        <img id="playlist_art" src="${array.playlist_art}" alt="blah">
        <div id="modal-header-info">
            <h1 id="playlist_name">${array.playlist_name}</h1>
            <h3 id="playlist_creator">${array.playlist_creator} </h3>
        </div>
        `;
    // append stuff above to grabbed playlist section
    document.querySelector('.modal-content').appendChild(individual_playlist);

    const songsDiv = document.getElementById('songs');
    // songsDiv.innerHTML = ''; 
    for (let innerIndex = 0; innerIndex < array.songs.length; innerIndex++) {
        let currentSong = array.songs[innerIndex];
        let individual_song = document.createElement("div");
        individual_song.classList.add('modal-song-container');
        individual_song.innerHTML += `
                <img id="cover_art" src="${currentSong.cover_art}" alt="blah"> <br> <br>
                <div id="song-info">
                    <p id="title">${currentSong.title}</p>
                    <p id="artist">${currentSong.artist}</p>
                    <p id="album">${currentSong.album}</p>
                </div>
                <div id="song-length">
                    <br> <br>
                    <p id="duration">${currentSong.duration}</p>
                    <br> <br>
                </div> 
            `;
        // append stuff above to grabbed playlist section
        document.querySelector('.modal-content').appendChild(individual_song);
    }
    modal.style.display = "block";
}

span.onclick = function () {

    const modalDynamicHead = document.querySelectorAll('.modal-head-container');
        
    modalDynamicHead.forEach(element => {
        element.parentNode.removeChild(element);
    });

    const modalDynamicBody = document.querySelectorAll('.modal-song-container');
        
    modalDynamicBody.forEach(element => {
        element.parentNode.removeChild(element);
    });
            
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function populatePlaylists(data) {
    for (let index = 0; index < data.playlists.length; index++) {
        let currentPlaylist = data.playlists[index];
        let individual_playlist = document.createElement("div");
        individual_playlist.classList.add('playlist');
        let clickmodalelement = document.createElement("div");
        clickmodalelement.classList.add("click-modal");
        clickmodalelement.innerHTML =`
        <img src="${currentPlaylist.playlist_art}" alt="song">
        <h4>${currentPlaylist.playlist_name}</h4>
        <p>${currentPlaylist.playlist_creator}</p>
        <p><i class="fa-solid fa-heart"></i> ${currentPlaylist.likeCount}</p>
        `;
        individual_playlist.appendChild(clickmodalelement);
        clickmodalelement.addEventListener("click", () =>{
            console.log(currentPlaylist);
            openModal(currentPlaylist);
        })

        // append stuff above to grabbed playlist section
        document.querySelector('.playlist-cards').appendChild(individual_playlist);
    }
}
populatePlaylists(data);
// openModal(dummy);