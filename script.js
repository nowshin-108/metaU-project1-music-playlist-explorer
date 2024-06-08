// JavaScript for Opening and Closing the Modal
var modal = document.getElementById("modal-overlay");
var span = document.getElementsByClassName("close")[0];
// grab section playlist cards

function createSongList(array) {
    const songsDiv = document.getElementById('songs');


    for (let innerIndex = 0; innerIndex < array.songs.length; innerIndex++) {
        let currentSong = array.songs[innerIndex];
        let individual_song = document.createElement("div");
        individual_song.classList.add('modal-song-container');
        
        // Create cover art element
        let coverArt = document.createElement("img");
        coverArt.id = "cover_art";
        coverArt.src = currentSong.cover_art;
        coverArt.alt = "blah";
        individual_song.appendChild(coverArt);
        
        // Add br elements
        let br1 = document.createElement("br");
        let br2 = document.createElement("br");
        individual_song.appendChild(br1);
        individual_song.appendChild(br2);
        
        // Create song info element and its children
        let songInfo = document.createElement("div");
        songInfo.id = "song-info";
        
        let title = document.createElement("p");
        title.id = "title";
        title.textContent = currentSong.title;
        songInfo.appendChild(title);
        
        let artist = document.createElement("p");
        artist.id = "artist";
        artist.textContent = currentSong.artist;
        songInfo.appendChild(artist);
        
        let album = document.createElement("p");
        album.id = "album";
        album.textContent = currentSong.album;
        songInfo.appendChild(album);
        
        individual_song.appendChild(songInfo);
        
        // Add br elements
        let br3 = document.createElement("br");
        let br4 = document.createElement("br");
        individual_song.appendChild(br3);
        individual_song.appendChild(br4);
        
        // Create song length element and its children
        let songLength = document.createElement("div");
        songLength.id = "song-length";
        
        let duration = document.createElement("p");
        duration.id = "duration";
        duration.textContent = currentSong.duration;
        songLength.appendChild(duration);
        
        individual_song.appendChild(songLength);
        
        // Append individual_song to the modal content
        document.querySelector('.modal-content').appendChild(individual_song);
    }
    
}

function openModal(array) {
    let individual_playlist = document.createElement("div");
    individual_playlist.classList.add('modal-head-container');
    
    // Create playlist art element
    let playlistArt = document.createElement("img");
    playlistArt.id = "playlist_art";
    playlistArt.src = array.playlist_art;
    playlistArt.alt = "blah";
    individual_playlist.appendChild(playlistArt);

    // Create modal header info element and its children
    let modalHeaderInfo = document.createElement("div");
    modalHeaderInfo.id = "modal-header-info";

    let playlistName = document.createElement("h1");
    playlistName.id = "playlist_name";
    playlistName.textContent = array.playlist_name;
    modalHeaderInfo.appendChild(playlistName);

    let playlistCreator = document.createElement("h3");
    playlistCreator.id = "playlist_creator";
    playlistCreator.textContent = array.playlist_creator + " ";
    modalHeaderInfo.appendChild(playlistCreator);

    individual_playlist.appendChild(modalHeaderInfo);

    // Create shuffle button element
    let shuffleButton = document.createElement("button");
    shuffleButton.id = "shuffle-button";
    shuffleButton.textContent = "Shuffle";
    individual_playlist.appendChild(shuffleButton);

    // Append individual_playlist to the modal content
    document.querySelector('.modal-content').appendChild(individual_playlist);

    
    document.getElementById("shuffle-button").addEventListener("click", () => shuffleSongs(array));

    createSongList(array);
    modal.style.display = "block";
}

function populatePlaylists(data) {
    for (let index = 0; index < data.playlists.length; index++) {
        let currentPlaylist = data.playlists[index];

        let individual_playlist = document.createElement("div");
        individual_playlist.classList.add('playlist');

        let clickmodalelement = document.createElement("div");
        clickmodalelement.classList.add("click-modal");

        // Create img element
        let playlistImage = document.createElement("img");
        playlistImage.src = currentPlaylist.playlist_art;
        playlistImage.alt = "song";
        clickmodalelement.appendChild(playlistImage);

        // Create playlistHeader div and its children
        let playlistHeader = document.createElement("div");
        playlistHeader.id = "playlistHeader";

        let playlistName = document.createElement("h4");
        playlistName.textContent = currentPlaylist.playlist_name;
        playlistHeader.appendChild(playlistName);
        clickmodalelement.appendChild(playlistHeader);

        // Create creatorName p element
        let creatorName = document.createElement("p");
        creatorName.id = "creatorName";
        creatorName.textContent = currentPlaylist.playlist_creator;
        clickmodalelement.appendChild(creatorName);

        // Create card-footer div and its children
        let cardFooter = document.createElement("div");
        cardFooter.id = "card-footer";

        // Create playlist heart div and its children
        let playlistHeart = document.createElement("div");
        playlistHeart.id = `playlist-heart-${currentPlaylist.playlistID}`;

        let heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-regular");
        heartIcon.classList.add("fa-heart");
        playlistHeart.appendChild(heartIcon);
        cardFooter.appendChild(playlistHeart);

        // Create likeCount p element
        let likeCount = document.createElement("p");
        likeCount.id = `likeCount-${currentPlaylist.playlistID}`;
        likeCount.textContent = currentPlaylist.likeCount;
        cardFooter.appendChild(likeCount);

        // Create trash icon element
        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fa", "fa-trash", "aria-hidden", "true");
        trashIcon.id = "delete-icon";
        cardFooter.appendChild(trashIcon);

        clickmodalelement.appendChild(cardFooter);

        individual_playlist.appendChild(clickmodalelement);

        heartIcon.addEventListener("click", () => {
            event.stopPropagation();
            likePlaylist(heartIcon, likeCount)
        });

        trashIcon.addEventListener("click", () => {
            event.stopPropagation();
            // likePlaylist(heartIcon, likeCount)
        });

        clickmodalelement.addEventListener("click", () => {
            openModal(currentPlaylist);
        });

        document.querySelector('.playlist-cards').appendChild(individual_playlist);
    }
}

function shuffleSongs(playlist) {
    console.log("This function ran");
    let currentIdx = playlist.songs.length - 1;

    while (currentIdx >= 0) {
        let randomIdx = Math.floor((Math.random() * (currentIdx + 1)))

        let tmp = playlist.songs[currentIdx];
        playlist.songs[currentIdx] = playlist.songs[randomIdx];
        playlist.songs[randomIdx] = tmp;
        currentIdx--;
    }

    //can make this a function later
    const modalDynamicBody = document.querySelectorAll('.modal-song-container');
        
    modalDynamicBody.forEach(element => {
        element.parentNode.removeChild(element);
    });

    createSongList(playlist);
}

// function likePlaylist(playlist_array) {

//     let heart = document.querySelector('#playlist-heart');
//     let likeCount_initial = playlist_array.likeCount
//     // Changing the heart to solid
//     if (String(heart.classList).includes("fa-regular")) {
//         // Change to solid if liked.
//         heart.classList = ""
//         heart.classList.add("fa-solid");
//         heart.classList.add("fa-heart");

//         likeCount_initial.innerText = String(Number(likeCount_initial.innerText) + 1);
//     }
//     else {
//         // Change to outline if unliked.
//         heart.classList = ""
//         heart.classList.add("fa-regular");
//         heart.classList.add("fa-heart");

//         likeCount_initial.innerText = String(Number(likeCount_initial.innerText) - 1);
//     }
// }

function likePlaylist(heart, likeCount) {
    // Changing the heart to solid
    if (String(heart.classList).includes("fa-regular")) {
        // Change to solid if liked.
        heart.classList = ""
        heart.classList.add("fa-solid");
        heart.classList.add("fa-heart");

        likeCount.innerText = String(Number(likeCount.innerText) + 1);
    }
    else {
        // Change to outline if unliked.
        heart.classList = ""
        heart.classList.add("fa-regular");
        heart.classList.add("fa-heart");

        likeCount.innerText = String(Number(likeCount.innerText) - 1);
    }
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

populatePlaylists(data);