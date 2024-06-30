window.onload = () => {
  let imgInfo = [
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165134.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165203.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165211.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165216.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165223.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165228.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165233.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165237.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165243.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165247.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165252.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165257.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165303.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165307.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165320.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165330.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165334.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165343.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165926.jpg' },
    { imgSrc: 'https://cdn.jsdelivr.net/gh/ayou001/pic-bed/20240618165933.jpg' },
  ];


  const renderDOM = document.querySelector('.photo-album');
  let prevMode = 1;
    // Fisher-Yates 洗牌算法
  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  };

  const getInnerHTML = (item) => {
    return `
      <div class="photo-container">
        <div class="show">
          <div class="hover-show">
            <div class="author">
              <div class="author-hover-arrow">
                <div class="arrow"></div>
              </div>
            </div>
            <div class="svg-container download">
              <svg class="svg" t="1673083589533" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/1999/xlink" width="200" height="200">
                <path d="M952.8 668.48a40.16 40.16 0 0 0-39.2 39.2c0 86.24-57.6 156.96-130.88 156.96H241.28C168 864 110.4 793.92 110.4 707.68a40.16 40.16 0 0 0-39.2-39.2A40.16 40.16 0 0 0 32 707.68c0 130.72 94.24 235.36 209.28 235.36h541.44C897.76 943.04 992 838.4 992 707.68a40.16 40.16 0 0 0-39.2-39.2z" fill="#4592D8" p-id="2099"></path>
                <path d="M484.48 686.72a45.12 45.12 0 0 0 57.6 0l149.12-149.12a38.88 38.88 0 0 0-54.88-54.88l-81.12 81.12V119.04a39.36 39.36 0 0 0-78.56 0v444.8l-81.12-81.12a38.88 38.88 0 0 0-54.88 54.88z" fill="#4592D8" p-id="2100"></path>
              </svg>
            </div>
            <div class="mask"></div>
          </div>
          <img class="scenery" src="${item.imgSrc}" alt="scenery">
        </div>
      </div>
    `;
  };

  const reduceDOM = (limit) => {
    const shuffledImgInfo = shuffleArray(imgInfo.slice()); // 打乱图片顺序
    const htmlString = Array.from(Array(limit), () => '<div class="photo-list">');
    shuffledImgInfo .forEach((item, index) => {
      const surplus = index % limit;
      if (surplus < limit) {
        htmlString[surplus] += getInnerHTML(item);
      }
    });
    for (let i = 0; i < limit; i++) {
      htmlString[i] += '</div>';
    }
    renderDOM.innerHTML = htmlString.join('');
    attachEventHandlers();

    const downloads = document.querySelectorAll('.download');
    downloads.forEach((download, index) => {
      download.onclick = () => {
        const req = new XMLHttpRequest();
        const img = document.querySelectorAll('.scenery')[index];
        req.open('GET', img.src, true);
        req.responseType = 'blob';
        req.onload = () => {
          const url = window.URL.createObjectURL(req.response);
          const a = document.createElement('a');
          a.href = url;
          a.download = '';
          a.click();
        };
        req.send();
      };
    });
  };

  const resize = () => {
    const width = window.innerWidth;
    if (width >= 1000 && prevMode !== 3) {
      prevMode = 3;
      reduceDOM(prevMode);
    } else if (width < 1000 && prevMode !== 2) {
      prevMode = 2;
      reduceDOM(prevMode);
    }
  };

  const attachEventHandlers = () => {
    const images = document.querySelectorAll('.scenery');
    images.forEach((image) => {
      image.addEventListener('click', (event) => {
        showOverlay(event.target.src);
      });
    });
  };

  const showOverlay = (src) => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `<img src="${src}" alt="Enlarged Image">`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('show'), 10);
    overlay.addEventListener('click', () => {
      overlay.classList.remove('show');
      setTimeout(() => overlay.remove(), 300);
    });
  };

  resize();
  window.onresize = resize;
};

// Music related functionality
var music = document.getElementById('music');
var musicico = document.getElementById('musicico');
var tem = true;

const musicList = [
  './music/waves.mp3',
  './music/I\'m Outta Time.mp3',
  // Add more songs here
];

// Shuffle the music list for random play order
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

shuffleArray(musicList);

music.src = musicList[0];

// Function to play random music from the list
const playRandomMusic = () => {
  const randomIndex = Math.floor(Math.random() * musicList.length);
  music.src = musicList[randomIndex];
  music.play();
};

// Play next random song when the current one ends
music.addEventListener('ended', playRandomMusic);

// Function to toggle music play/pause
function musiccc() {
  if (tem == false) {
    music.play();  // Play music
    tem = true;
    musicico.style.animationPlayState = 'running';  // Play music icon animation
  } else {
    music.pause();  // Pause music
    tem = false;
    musicico.style.animationPlayState = 'paused';  // Pause music icon animation
  }
}