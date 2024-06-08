// const playlists = data.playlists; // assuming data.playlists is an array of playlists

// function loadFeature(playlist) {
//   let modal = document.getElementsByClassName('feature-screen')[0];
//   console.log(modal);
//   console.log("hello")
//   modal.innerHTML = `
//   <div class="featurecontent">
//                 <div class="modalhead">
//                     <span class="modalpic">
//                         <img class="card-pic" src="${playlist.playlist_art}">
//                         <div id="song-title"><h1>${playlist.playlist_name}</h1></div>
//                         <div id="artiste">${playlist.playlist_creator}</div>
//                     </span>
//                 </div>
//                 <div class="songs">

//                 </div>
//             </div>
//   `
//   // code to display the selected playlist
//   let modalContent = document.getElementsByClassName('songs')[0];
//     for (let i=0; i < playlist.songs.length; i++){
//         let song = playlist.songs[i];
//         modalContent.innerHTML += `
//         <div class="modaltitle">
//             <div class="modalsong">
//                 <span class="songpic">
//                     <img class="song-pic" src="${song.cover_art}">
//                 </span>
//                 <span class="songtitle">
//                     <div id="song-title"><h2>${song.title}</h2></div>
//                     <div id="artiste">${song.artist}</div>
//                     <div id="album">${song.album}</div>
//                 </span>
//                 <span class="duration">
//                     <div id="artiste">${song.duration}</div>
//                 </span>
//             </div>
//         </div>

//         `
//     }
// }
// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
//   }

// function selectRandomPlaylist() {
//   const randomPlaylist = playlists[getRandomInt(9)];
//   loadFeature(randomPlaylist);
// }

// selectRandomPlaylist(); // call the function to select and display a random playlist


// JavaScript for Opening and Closing the Modal
// var modal = document.getElementById("modal-overlay");
// var span = document.getElementsByClassName("close")[0];


function featuredPlaylist(playlist){
    let randomIdx = Math.floor((Math.random() * (playlist.length)));
    current_playlist = playlist[randomIdx];

    const modalContent = document.querySelector('.modal-content');
    const modalHeadContainer = document.createElement("div");
    modalHeadContainer.classList.add('modal-head-container');

    const playlistArt = document.createElement("img");
    playlistArt.id = "playlist_art";
    playlistArt.src = current_playlist.playlist_art;
    playlistArt.alt = "blah";
    modalHeadContainer.appendChild(playlistArt);

    const modalHeaderInfo = document.createElement("div");
    modalHeaderInfo.id = "modal-header-info";

    const playlistName = document.createElement("h1");
    playlistName.id = "playlist_name";
    playlistName.textContent = current_playlist.playlist_name;
    modalHeaderInfo.appendChild(playlistName);

    const playlistCreator = document.createElement("h3");
    playlistCreator.id = "playlist_creator";
    playlistCreator.textContent = current_playlist.playlist_creator + " ";
    modalHeaderInfo.appendChild(playlistCreator);

    modalHeadContainer.appendChild(modalHeaderInfo);

    const modalBodyContainer = document.createElement("div");
    modalBodyContainer.classList.add('modal-body-container');

    for (let innerIndex = 0; innerIndex < current_playlist.songs.length; innerIndex++) {
        const currentSong = current_playlist.songs[innerIndex];
        const individual_song = document.createElement("div");
        individual_song.classList.add('modal-song-container');

        const coverArt = document.createElement("img");
        coverArt.id = "cover_art";
        coverArt.src = currentSong.cover_art;
        coverArt.alt = "blah";
        individual_song.appendChild(coverArt);

        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        individual_song.appendChild(br1);
        individual_song.appendChild(br2);

        const songInfo = document.createElement("div");
        songInfo.id = "song-info";

        const title = document.createElement("p");
        title.id = "title";
        title.textContent = currentSong.title;
        songInfo.appendChild(title);

        const artist = document.createElement("p");
        artist.id = "artist";
        artist.textContent = currentSong.artist;
        songInfo.appendChild(artist);

        const album = document.createElement("p");
        album.id = "album";
        album.textContent = currentSong.album;
        songInfo.appendChild(album);

        individual_song.appendChild(songInfo);

        const br3 = document.createElement("br");
        const br4 = document.createElement("br");
        individual_song.appendChild(br3);
        individual_song.appendChild(br4);

        const songLength = document.createElement("div");
        songLength.id = "song-length";

        const duration = document.createElement("p");
        duration.id = "duration";
        duration.textContent = currentSong.duration;
        songLength.appendChild(duration);

        individual_song.appendChild(songLength);

        // Append individual_song to the modal body container
        modalBodyContainer.appendChild(individual_song);
    }

    // Append modal head container and modal body container to the modal content
    modalContent.appendChild(modalHeadContainer);
    modalContent.appendChild(modalBodyContainer);
}

featuredPlaylist(data.playlists);

