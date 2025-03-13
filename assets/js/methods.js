function setPageHeight() {
  let vh = getViewPortHeight();
  document.documentElement.style.setProperty("--screenHeight", `${vh}px`);

  if (vh > 600)
    document.documentElement.style.setProperty("--dialogueBoxHeight", `200px`);

  if (vh > 1440)
    document.documentElement.style.setProperty("--dialogueBoxHeight", `30vh`);
}

function getViewPortHeight() {
  return window.innerHeight;
}

function getYearDifference(date1, date2) {
  let yearDiff = date2.getFullYear() - date1.getFullYear();

  const month1 = date1.getMonth();
  const month2 = date2.getMonth();
  const day1 = date1.getDate();
  const day2 = date2.getDate();

  if (month2 < month1 || (month2 === month1 && day2 < day1)) {
    yearDiff--;
  }

  return yearDiff;
}

function addStylesheet(address) {
  var link = document.createElement("link");

  link.rel = "stylesheet";
  link.href = address;
  link.type = "text/css";

  document.head.appendChild(link);
}

function changeBodyBackground(bg = "#060606") {
  document.body.style.background = bg;
}

function picTemplate(address) {
  return address.replace(/ /g, "%20").replace(/'/g, "%27");
}

function smartSingleQuotes(text) {
  return text.replace("'", "&rsquo;");
}

function applyFunction(func, args = []) {
  if (typeof func === "function") {
    func.apply(null, args);
  } else {
    console.log(`${func} is not a valid function.`);
  }
}

function setBg(address) {
  setPassageBackgroundImage(picTemplate(address));
  updatePopup2Bg(picTemplate(address));
}

function replaceAllChars(str, charToReplace, replacementChar) {
  return str.split(charToReplace).join(replacementChar);
}

function OxfordFormat(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }

  const length = arr.length;

  if (length === 0) {
    return "";
  } else if (length === 1) {
    return arr[0];
  } else if (length === 2) {
    return arr.join(" and ");
  } else {
    const lastElement = arr.pop();
    return arr.join(", ") + ", and " + lastElement;
  }
}

function goScene(labelName) {
  $passage("", "#060606");

  player.label = new Label(labelName);

  player.currentScene = player.label;

  globalImagesFolder =
    "assets/images/labels/" +
    capitalizeFirstLetter(labelName[0]) +
    "/" +
    labelName.replace(/_/g, "/");
  player.label.call();
}

function goLabel(labelName) {
  // player.location = 'Scene';
  // game.popupPic = false;
  // game.popupPicAspect32 = false;
  player.label = new Label(labelName);

  player.label.call();
}

function goLabelList(labelListStr) {
  console.log(labelListStr);
  let arr = Passage.extractFunctionText(labelListStr);
  arr.forEach((labelName) => {
    goLabel(labelName);
  });
}

function goLabels(...args) {
  args.map(goLabel);
}

function capitalizeFirstLetter(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getCharPortrait(charName) {
  charName = capitalizeFirstLetter(charName);
  return `assets/images/characters/${charName}.jpg`;
}

function updateRegularPassage(text) {
  document.querySelectorAll(".scrollableDiv").forEach((div) => {
    div.scrollTop = 0;
  });
  document
    .getElementById("regularPassage")
    .querySelector(".content").innerHTML = text;
  $passage();
}

function appendRegularPassage(text) {
  const id = "passage-" + generateRandomString(4);
  const arr1 = document.querySelectorAll("#regularPassage .content .storyLink");
  const arr2 = document.querySelectorAll(
    "#regularPassage .content .storyButtonWrapper"
  );
  const arr = arrayUnion(arr1, arr2);

  arr.forEach((link) => {
    link.classList.add("hidden");
  });

  const newPassage = document.createElement("div");
  newPassage.id = id;
  newPassage.innerHTML = text;

  const content = document.querySelector("#regularPassage .content");
  content.appendChild(newPassage);

  moveToID(id);
}

function updateFixedPassagePic(address) {
  document
    .getElementById("regularPassage")
    .querySelector(
      ".passageFixedPic"
    ).style.backgroundImage = `url('${address}')`;
}

function updatePopup1Pic(address) {
  document.querySelector(
    ".popup1 .popup_screen .pic"
  ).style.backgroundImage = `url('${address}')`;
}

function updatePopupPic(address) {
  updatePopup1Pic(address);
  updateFixedPassagePic(address);
}

function setPassageBackground(str) {
  document.getElementById("regularPassage").style.background = str;
}

function setPassageBackgroundImage(str) {
  str = picTemplate(str);
  if (str[0] === "#") {
    player.bg = str;
    return;
  }
  player.bg = `url(${str})`;
}

function setRootCSSVariable(variableName, value) {
  document.documentElement.style.setProperty(variableName, value);

  console.log("set", variableName, value);
}

class Story {
  static trigger(inner) {
    return `<div data-trigger-block>${inner}</div>`;
  }

  static link(text, labelName, isScene = true) {
    let func = null;
    if (isScene) {
      func = `goScene('${labelName}')`;
    } else {
      func = `goLabel('${labelName}')`;
    }
    return `<p><a class="storyLink" href="#" onclick="${func}">${text}</a></p>`;
  }

  static button(text, labelName, type = "", change = 0) {
    change = Number(change);
    if (!change) change = "";
    text = text.trim();

    let supplement = "";
    let func = null;

    func = `goLabel('${Passage.sanitizeSingleQuotes(labelName)}')`;

    if (type == "gems") {
      func = `$story_spend('gems', ${change}, 'goLabel(${Passage.sanitizeSingleQuotes(
        labelName
      )})')`;
      text = `${text} ${change} <img src="assets/svg/rewards/gem.svg"`;

      supplement = `<h4 class='text-red-600 limitWarning hidden'>Not enough gems</h4>`;
    }
    if (type == "crypto") {
      func = `$story_spend('crypto', ${change}, 'goLabel(${Passage.sanitizeSingleQuotes(
        labelName
      )})')`;

      text = `${text} ${change} <img src="assets/svg/Coin.svg"`;

      supplement = `<h4 class='text-red-600 limitWarning hidden'>Not enough crypto</h4>`;
    }

    return `<div class="storyButtonWrapper flex gap-4">
                    <button class="stroyButton polygon bg-white"onclick="${func}">${text}</button>
                    ${supplement}
                </div>`;
  }

  static buttonWarning() {
    let nodes = document.querySelector(".storyButtonWrapper .limitWarning");
    nodes.forEach((node) => {
      node.classList.remove("hidden");
      setTimeout(function () {
        nodes.forEach((nestedNode) => {
          nestedNode.classList.add("hidden");
        });
      }, 2000);
    });
  }

  static linkInline(text, labelName, isScene = true) {
    let func = null;
    if (isScene) {
      func = `goScene('${labelName}')`;
    } else {
      func = `goLabel('${labelName}')`;
    }
    return `<a class="storyLink" href="#" onclick="${func}">${text}</a>`;
  }

  static charBox(charName, text, act = "", imageAddress = "") {
    var clr = "#FFFFFF";
    charName = capitalizeFirstLetter(charName);
    if (!imageAddress) imageAddress = getCharPortrait(charName);

    if (charName == "Book") {
      return `
                <div class="char-box" >
                <img class="char-image" src="assets/images/recurring/Book.jpg"/>
                <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                    <div class="char-name">Book <em style="font-size: 18px; color:white">${act}</em></div>
                    <div class="char-text">${text}</div>
                </div>
                </div>
                `;
    }

    var character = Character.find(charName);
    clr = character.color;

    return `
    <div class="char-box" >
      <img class="char-image" src="${imageAddress}"/>
      <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
        <div class="char-name" style="color: ${clr}">${character.displayName} <em style="font-size: 18px; color:white">${act}</em></div>
        <div class="char-text">${text}</div>
      </div>
    </div>
    `;
  }
  static imageLeft(filename) {
    return `<img class="portrait-left" src= "${globalImagesFolder}/${filename}.jpg" data-animate-block>`;
  }

  static imageRight(filename) {
    return `<img class="portrait-right" src= "${globalImagesFolder}/${filename}.jpg" data-animate-block>`;
  }

  static imageCenter(filename, extension = "jpg") {
    return `<img class="portrait-center" src= "${globalImagesFolder}/${filename}.${extension}" data-animate-block>`;
  }

  static image(src, fig = "", cl = "", sty = "", extension = "jpg") {
    var img;
    var classText = ``;
    src = `${globalImagesFolder}/${src}.${extension}`;
    if (cl) classText = `class="${cl}"`;
    var styleText = ``;
    if (sty) styleText = `style="${sty}"`;
    img = `<img src="${src}" ${classText} ${styleText} data-animate-block>`;
    if (fig) {
      img = `
        <figure>
            ${img}
    
            <figcaption>
                ${fig}
            </figcaption>
        </figure>`;
    }
    return img;
  }

  static imageRecurring(src, fig = "", cl = "", sty = "", extension = "jpg") {
    var img;
    var classText = ``;
    src = `assets/images/recurring/${src}.${extension}`;
    if (cl) classText = `class="${cl}"`;
    var styleText = ``;
    if (sty) styleText = `style="${sty}"`;
    img = `<img src="${src}" ${classText} ${styleText} data-animate-block>`;
    if (fig) {
      img = `
        <figure>
            ${img}
    
            <figcaption>
                ${fig}
            </figcaption>
        </figure>`;
    }
    return img;
  }

  static imageAddress(src, fig = "", cl = "", sty = "") {
    var img;
    var classText = ``;
    if (cl) classText = `class="${cl}"`;
    var styleText = ``;
    if (sty) styleText = `style="${sty}"`;
    img = `<img src="${src}" ${classText} ${styleText} data-animate-block>`;
    if (fig) {
      img = `
        <figure>
            ${img}
    
            <figcaption>
                ${fig}
            </figcaption>
        </figure>`;
    }
    return img;
  }

  static video(
    src,
    isControls = true,
    isLoop = false,
    isAutoplay = false,
    isMute = false
  ) {
    return `
        <video class="story-vid"  ${isControls ? `controls` : ``} ${
      isLoop ? `loop` : ``
    } ${isAutoplay ? `autoplay` : ``} ${isMute ? `mute` : ``} ${
      isAnimate ? `data-animate-block` : ``
    }>
            <source src="${globalImagesFolder}/${src}.webm" type="video/webm">
            Your browser does not support the video tag.
        </video>`;
  }

  static videoLoop(src) {
    return `
        <video class="story-vid" loop autoplay mute data-animate-block>
            <source src="${globalImagesFolder}/${src}.webm" type="video/webm">
            Your browser does not support the video tag.
        </video>`;
  }

  static videoAddress(src, isControls = true, isLoop = false, isMute = false) {
    return `
        <video class="story-vid"  ${isControls ? `controls` : ``} ${
      isLoop ? `loop` : ``
    } ${isAutoplay ? `autoplay` : ``} ${
      isMute ? `mute` : ``
    } data-animate-block>
            <source src="${src}.webm" type="video/webm">
            Your browser does not support the video tag.
        </video>`;
  }

  static videoCenter(
    src,
    isAnimate = true,
    isControls = true,
    isLoop = false,
    isAutoplay = false
  ) {
    return `
        <video class="story-vid portrait-center"  ${
          isControls ? `controls` : ``
        } ${isLoop ? `loop` : ``} ${isAutoplay ? `autoplay` : ``} ${
      isAnimate ? `data-animate-block` : ``
    }>
            <source src="${globalImagesFolder}/${src}.webm" type="video/webm">
            Your browser does not support the video tag.
        </video>`;
  }

  static statText(statType, val, charName = "") {
    let className = "decreaseText";
    if (Number(val) >= 0) className = "increaseText";
    let charNameText = charName;
    if (charName) charNameText += " ";
    return `<p class='flex items-center'>

        
        ${statIcon(statType, Number(val) > 0).outerHTML}
      
        <span class="${className}">&nbsp;${charName}${capitalizeFirstLetter(
      statType
    )} ${val}</span>
      
        
        </p>`;
  }
}

function statIcon(type, increase = true) {
  let node = Node.create("bg-image relative inline-block", "span");
  let x = "decrease";
  if (increase) x = "increase";
  node.style.width = "60px";
  node.style.height = "60px";
  node.style.backgroundImage = urlText("assets/svg/stats/circle.png");
  node.innerHTML = `
  ${
    increase
      ? '<img class="Sparkle m-0" style="width: 15px; height: 18.75px; position: absolute; top: 13px; left: 35px;" src="assets/svg/stats/sparkle.svg">'
      : ""
  }
    <img class="icon m-0" style="width: 30.02px; height: 26.67px; position: absolute; top: 19.54px; left: 15.69px;" src="assets/svg/stats/${type}.png">
  <img class="Arrow m-0" style="width: 15px; height: 15px; position: absolute; top: 32px; left: 32px;" src="assets/svg/stats/${x}.svg">
    `;
  return node;
}

function getMainKey(obj) {
  return Object.keys(obj)[0];
}

function getMainVal(obj) {
  return obj[getMainKey(obj)];
}

function addChatOnclick() {
  Chat.charList.forEach((charName) => {
    const node = Chat.getChannelNode(charName);
    node.onclick = function () {
      Chat.charList.forEach((c) => {
        const newNode = Chat.getChannelNode(c);
        newNode.classList.add("NotActive");
      });
      node.classList.remove("NotActive");
      let char = Character.find(charName);
      char.setAsMessenger();
      // console.log('messaging ' + player.messaging)
      player.chatAvatarAddress = getCharPortrait(charName);
      player.chatOnline = true;
    };
  });
}

function calculateReadingTime(text) {
  if (typeof text != "string") console.log(text);
  text = typeof text === "string" ? text : "";

  const wordCount = text.trim().split(/\s+/).length;

  const timeInMinutes = wordCount / 240;

  return Math.round(timeInMinutes * 60000);
}

function updatePopup2Bg(address) {
  address = picTemplate(address);
  document.querySelector(".popup2").style.backgroundImage = `url('${address}')`;
}

function setNodeBackground(container, address) {
  container.style.backgroundImage = `url('${address}')`;
}

function hardPause(milliseconds = 300) {
  game.pause = true;
  setTimeout(() => {
    game.pause = false;
  }, milliseconds);
}

function urlText(address) {
  return `url(${address})`;
}

function getRandomElement(arr) {
  if (arr.length === 0) {
    return null;
  }

  let randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}

function findFirstStringStartingWith(arr, char) {
  // Ensure the character is a single character
  if (char.length !== 1) {
    throw new Error("The second argument must be a single character.");
  }

  // Search through the array for the first string starting with the specified character
  for (let str of arr) {
    // Check if the string starts with the specified character
    if (str.startsWith(char)) {
      return str; // Return the first match
    }
  }

  // If no match is found, return null
  return null;
}

function splitDialogue(str) {
  let arr = extractTextBetweenSeparators(str);
  let speakerArr = splitWordsByWhiteSpaces(arr[0]);
  let dialogueArr = arr[1];

  let arr2 = [];
  for (let i = 0; i < speakerArr.length; i++) {
    arr2.push([speakerArr[i], dialogueArr[i]]);
  }
  return arr2;
}

function generateRandomString(length = 4) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomString += letters[randomIndex];
  }

  return randomString;
}

function showGemsWarning() {
  enJin.audioController.play("invalid");
  game.gemsWarning = true;

  setTimeout(function () {
    game.gemsWarning = false;
  }, 2000);
}

function showCryptoWarning() {
  enJin.audioController.play("invalid");
  game.cryptoWarning = true;

  setTimeout(function () {
    game.cryptoWarning = false;
  }, 2000);
}

function showCashWarning() {
  enJin.audioController.play("invalid");
  game.cashWarning = true;

  setTimeout(function () {
    game.cashWarning = false;
  }, 2000);
}

function getDateTextRelativeToToday(currentDate, newDate) {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const newYear = newDate.getFullYear();
  const newMonth = newDate.getMonth();
  const newDay = newDate.getDate();

  if (
    currentYear === newYear &&
    currentMonth === newMonth &&
    currentDay === newDay
  ) {
    return "Today";
  }

  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDay + 1);

  if (
    yesterday.getFullYear() === newYear &&
    yesterday.getMonth() === newMonth &&
    yesterday.getDate() === newDay
  ) {
    return "Yesterday";
  }

  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", { month: "long" });
  return `${day} ${month}`;
}

function createPhotoSwiper(id) {
  const pswpDiv = Node.create("pswp");
  pswpDiv.setAttribute("aria-hidden", "true");
  pswpDiv.setAttribute("id", id);
  pswpDiv.setAttribute("role", "dialog");
  pswpDiv.setAttribute("tabindex", "-1");
  pswpDiv.innerHTML = `
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">

            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title=
                    "Zoom in/out"></button>
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> <button class="pswp__button pswp__button--arrow--right" title=
                "Next (arrow right)"></button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>

        </div>
    `;

  return pswpDiv;
}

function createFolioItem(
  className = "",
  smallImageAddress,
  bigImageAddress = "",
  title = " ",
  category = " ",
  caption = " "
) {
  if (!bigImageAddress) bigImageAddress = smallImageAddress;

  const node = Node.create("folio-item ");

  node.innerHTML = `
        <div class="folio-item__thumb">
            <a class="folio-item__thumb-link" href="${smallImageAddress}" Title="${title}">
                <img ${
                  className ? 'class="' + className + '"' : ""
                } src="${bigImageAddress}">
            </a>
        </div>
        <div class="folio-item__info">
            <div class="folio-item__cat">${category}</div>
            <h4 class="folio-item__title">${title}</h4>
        </div>
        <div class="folio-item__caption">
            <p>${caption}</p>
        </div>
    `;

  return node;
}

function imageDataSize(imageNode, maxWidth = 1050, maxHeight = 700) {
  const aspectRatio = imageNode.offsetWidth / imageNode.offsetHeight;
  console.log(
    imageNode.src,
    imageNode.offsetWidth,
    imageNode.offsetHeight,
    aspectRatio
  );
  let height = maxHeight;
  let width = Math.round(height * aspectRatio);

  if (width > maxWidth) {
    width = maxWidth;
    height = Math.round(width / aspectRatio);
  }

  console.log(`Width: ${width}px, Height: ${height}px`);

  return `${width}x${height}`;
}

function cryptoNotification(val) {
  val = Number(val);
  let title = `Earned Crypto`;
  let titleColor = "green";
  let name = "Crypto +" + val;
  if (val < 0) {
    title = "Spent Crypto";
    titleColor = "red";
    name = "Crypto " + val;
  }
  let description = "";

  game.showNotification(
    title,
    titleColor,
    name,
    description,
    "assets/svg/Coin.svg"
  );
}

function gemsNotification(val) {
  val = Number(val);
  let title = `Earned Gems`;
  let titleColor = "green";
  let name = "Gems +" + val;
  if (val < 0) {
    title = "Spent Gems";
    titleColor = "red";
    name = "Gems " + val;
  }
  let description = "";

  game.showNotification(
    title,
    titleColor,
    name,
    description,
    "assets/svg/rewards/gem.svg"
  );
}

const cons = function () {
  console.log("here");
};

function updateDocumentTitle(newTitle) {
  let titleElement = document.querySelector("head > title");

  if (!titleElement) {
    titleElement = document.createElement("title");
    document.head.appendChild(titleElement);
  }
  titleElement.textContent = newTitle;
}

function arrayDifference(arr1, arr2) {
  return arr1.filter((element) => !arr2.includes(element));
}

function arrayIntersect(arr1, arr2) {
  return arr1.filter((element) => arr2.includes(element));
}

function arrayUnion(...arrays) {
  return [...new Set(arrays.flat())];
}

function simplifyLocationName(str) {
  return str.replace(/[\s']/g, "").trim();
}

function randomName() {
  const options = [
    "Luke",
    "Ethan",
    "Ryan",
    "Lucas",
    "Dylan",
    "Brandon",
    "Tyler",
    "Nathan",
    "Connor",
    "Evan",
    "Logan",
    "Garrett",
  ];
  const randomString = options[Math.floor(Math.random() * options.length)];
  document.getElementById("nameInputBox").value = randomString;
  player.name = randomString;
}

function getSceneByType(type, action, result) {
  const defaultExtensions = { image: "jpg", video: "webm" };
  let [name, extension] = getExtensionParts(result);
  extension = extension || defaultExtensions[type];
  result = name || result;

  const paths = {
    image: {
      address: result,
      recurring: `assets/images/recurring/${result}.${extension}`,
      default: `${globalImagesFolder}/${result}.${extension}`,
    },
    video: {
      address: result,
      default: `${globalImagesFolder}/${result}.${extension}`,
    },
  };

  if (type == "video") {
    if (!action) {
      player.reSetVideo();
    } else if (action == "loop") {
      this.videoLoop = true;
      player.video.controls = false;
      player.video.loop = true;
      player.video.autoplay = true;
    }
  }
  return paths[type]?.[action] || paths[type]?.default || "";
}

function getExtensionParts(filename) {
  const parts = filename.split(".");
  const extension = parts[parts.length - 1];

  // Check if the last part is a valid extension of 3 or 4 alphanumeric characters
  if (/^\w{3,4}$/.test(extension) && parts.length > 1) {
    return [parts.slice(0, -1).join("."), extension];
  }

  return [];
}

function setHeaderLocation(str) {
  player.location = str;
}

function setHeaderDate(str) {
  player.date = str;
}

function setHeaderTime(str) {
  player.time = str;
}

function setHeaderText(locationStr = "", dateStr = "", timeStr = "") {
  player.location = locationStr;
  player.date = dateStr;
  player.time = timeStr;
}

function appendLabelAndPush(labelName) {
  let label = Label.find(labelName);
  // console.log(label);
  if (label.msgr) {
    msgrOn();

    label.execute();
    return;
  }

  if (label.imagesFolder) globalImagesFolder = label.imagesFolder;

  if (label.executable) {
    // console.log("executing label " + label.name);
    label.execute();
    return;
  }
  msgrOff();
  renjs.appendLabel(labelName);
  renjs.nextStep();
}

function getCharacter(name) {
  return Character.find(name);
}

function executeLabelActions(labelName) {
  RenJS.getGlobalFunctionByName(labelName).actions();
}

function matchSize(node1, node2) {
  const node2Rect = node2.getBoundingClientRect();

  node1.style.width = `${node2Rect.width}px`;
  node1.style.height = `${node2Rect.height}px`;
}

// Run the function initially to match sizes

function isLandscape(element) {
  return element.offsetWidth >= element.offsetHeight;
}

function fantasyOn() {
  player.fantasy = true;
}

function fantasyOff() {
  player.fantasy = false;
  player.isFantasyAnimated = false;
}

function initFantasyAnimation() {
  player.isFantasyAnimated = true;
}

function msgrOff() {
  manualSaveOff();

  game.msgr = false;
}

function msgrOn() {
  manualSaveOn();
  deActivateChatMenuButton();

  game.msgr = true;
}

function pcOn() {
  manualSaveOn();

  game.pcMode = true;
}

function pcOff() {
  manualSaveOff();

  game.pcMode = false;
}

function phoneOn(bg = "") {
  if (bg) player.phoneBG = bg;
  updateIphoneScale();

  player.phoneMode = true;
}

function phoneOff() {
  player.phoneMode = false;
}

function videoLoopOn() {
  player.video.controls = false;

  player.videoLoop = true;
}

function videoLoopOff() {
  player.video.controls = true;

  player.videoLoop = false;
}

function gemInline() {
  return `<img class="inline-icon" src='assets/svg/rewards/gem.svg'>`;
}

function crownInline() {
  return `<img class="inline-icon" src='assets/svg/crown.svg'>`;
}

function findGemsLinkPattern(str) {
  const regex = /-\d+\s+gems/g;
  return str.match(regex) || [];
}

function findCryptoLinkPattern(str) {
  const regex = /-\d+\s+crypto/g;
  return str.match(regex) || [];
}

function isCryptoLinkPattern(str) {
  return findCryptoLinkPattern(str).length;
}

function isGemsLinkPattern(str) {
  return findGemsLinkPattern(str).length;
}

function findSpendLinkPattern(str) {
  if (isCryptoLinkPattern(str)) return findCryptoLinkPattern(str)[0];
  if (isGemsLinkPattern(str)) return findGemsLinkPattern(str)[0];
  return null;
}

function prepareLink(text) {
  let cryptoPattern = findCryptoLinkPattern(text);
  let gemPattern = findGemsLinkPattern(text);

  cryptoPattern.forEach((pattern) => {
    const replacement = `
          <span style='text-decoration: none;'>${pattern.replace(
            " crypto",
            ""
          )}</span>
          <img class="inline-icon" src='assets/svg/rewards/crypto.png'>`;
    text = Passage.replaceAllInstances(text, pattern, replacement);
  });

  gemPattern.forEach((pattern) => {
    const replacement = `
          <span style='text-decoration: none;'>${pattern.replace(
            " gems",
            ""
          )}</span>
          <img class="inline-icon" src='assets/svg/rewards/gem.svg'>`;
    text = Passage.replaceAllInstances(text, pattern, replacement);
  });

  return text;
}

function nextStep() {
  renjs.nextStep();
}

function activateChatMenuButton() {
  player.chatButton.active = true;
}

function deActivateChatMenuButton() {
  player.chatButton.active = false;
}
function hasPremiumPattern(str) {
  const lowerStr = str.toLowerCase();
  return (
    lowerStr.includes("premium") ||
    lowerStr.includes("(p)") ||
    lowerStr.includes("crown.svg")
  );
}

function hasComingSoonPattern(str) {
  const lowerStr = str.toLowerCase();
  return lowerStr.includes("Coming soon") || lowerStr.includes("(c)");
}

function setImagesFolder(address) {
  globalImagesFolder = address;
}

function playSound(filename) {
  enJin.audioController.play(filename);
}

function bing() {
  enJin.audioController.play("take");
}

function ring() {
  enJin.audioController.play("stageComplete");
}

function pageInit() {
  renjs.clearTimeoutMessages();

  game.mainMenu = true;
  game.savesScreen = false;
  game.settingsScreen = false;

  game.init = true;
}

function mainMenu() {
  pageInit();
  enJin.audioController.play("take");
  enJin.audioController.play("intro");
}

mainMenu.executable = true;
function endGame() {
  mainMenu();
  player.episode = 2;
  player.progressEpisode = 2;
  renjs.newSequence();
  Save.reset(false);
  Save.save();
}

endGame.executable = true;

function saveMenu() {
  pageInit();
  game.savesScreen = true;
  enJin.audioController.play("take");
}
saveMenu.executable = true;

function settingsMenu() {
  pageInit();
  game.settingsScreen = true;

  enJin.audioController.play("take");
}

settingsMenu.executable = true;

function openPatreonLink() {
  RenJS.openInNewTab("https://www.patreon.com/Liturgy97");
}
openPatreonLink.executable = true;

function addUniqueByProperty(array, object, property = "name") {
  if (!array.some((item) => item[property] === object[property])) {
    array.push(object);
  }
}
function updateVMCharName(name = player.charName) {
  player.charName = removeNumbersFromText(name);
  if (name == game.mainCharName) {
    player.charName = player.name;
  }
  if (game.supportiveName && name == game.supportiveName)
    player.charName = player.supportiveName;
  if (game.supportive2Name && name == game.supportive2Name)
    player.charName = player.supportive2Name;
}

function updateTextMessages() {
  const messagesContainers = document.querySelectorAll(
    ".msg-text, .LastMessage"
  );
  const replaceMainCharacterNames = RenJS.replaceMainCharacterNames;

  messagesContainers.forEach((messageContainer) => {
    const updatedContent = replaceMainCharacterNames(
      messageContainer.innerHTML
    );
    if (messageContainer.innerHTML !== updatedContent) {
      messageContainer.innerHTML = updatedContent;
    }
  });
}

function saveToLocalStorage(key, data) {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    // console.log(`Data saved under key: ${key}`);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

function loadFromLocalStorage(key) {
  try {
    const jsonData = localStorage.getItem(key);
    if (jsonData === null) {
      console.warn(`No data found for key: ${key}`);
      return null;
    }
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
}

const vmPropertiesToSave = [
  "textBox",
  "location",
  "date",
  "time",
  "skipping",
  "cheatMode",
  "charColor",
  "charName",
  "charPic",
  "charAct",
  "text",
  "textMenu",
  "vscene",
  "landscapeVScene",
];

function manualSaveOn() {
  renjs.manualSave = true;
}

function manualSaveOff() {
  renjs.manualSave = false;
}

function getCurrentTimeStr() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  return `${dayName}, ${date} ${monthName} ${year} ${hours}:${minutes} ${ampm}`;
}

function narratorText(text) {
  return `<span class='text-green'>${text}</span>`;
}

function hiddenText(text) {
  return `<span class='hidden'>${text}</span>`;
}

function playIntroMusic() {
  enJin.audioController.play("intro");
}
function vmReset() {
  Object.assign(vm.$data, vm.$options.data.call(vm));
}
function receiveCall(
  phoneNumberCalling = "",
  acceptCallLabelName = "",
  declineCallLabelName = ""
) {
  startRingtone();
  if (phoneNumberCalling) player.phoneNumberCalling = phoneNumberCalling;
  player.onCall = true;
  player.incomingCall = true;
  player.acceptCallLabelName = acceptCallLabelName;
  player.declineCallLabelName = declineCallLabelName;
}
function onCall(phoneNumberCalling = "") {
  endRingtone();
  if (phoneNumberCalling) player.phoneNumberCalling = phoneNumberCalling;
  player.onCall = true;
  player.incomingCall = false;
}
function endCall() {
  bing();
  player.onCall = false;
  player.incomingCall = false;
}
function removeNumbersFromText(text) {
  return text.replace(/\d+/g, "");
}
function valBounds(x, min = 0, max = 100) {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}

const classRegistry = {};

function registerClass(name, cls) {
  classRegistry[name] = cls;
}

async function toggleFullScreen(changeSettings = false) {
  if (game.electron) {
    electronToggleFullScreen();
    return;
  }
  if (changeSettings) {
    settings.fullScreen = !settings.fullScreen;
    console.log("Updated Settings");
    Settings.save();
  }
  try {
    if (settings.fullScreen) {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        await document.documentElement.msRequestFullscreen();
      } else {
        console.error("Fullscreen API is not supported by this browser.");
        return;
      }

      if (window.innerWidth < 1200) {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock("landscape");
          console.log(
            "Device width is less than 1200px. Screen locked to landscape mode."
          );
        } else {
          console.warn("Orientation locking is not supported by this browser.");
        }
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      } else {
        console.error("Fullscreen exit is not supported by this browser.");
      }
    }
  } catch (error) {
    console.error("Error toggling fullscreen or orientation:", error);
  }

  setPageHeight();
}

async function fullScreenOn() {
  if (game.electron) {
    if (!electronIsFullScreen()) electronToggleFullScreen();
    settings.fullScreen = electronIsFullScreen();

    return;
  }
  try {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      await document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      await document.documentElement.msRequestFullscreen();
    } else {
      console.error("Fullscreen API is not supported by this browser.");
      return;
    }

    if (window.innerWidth < 1200) {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock("landscape");
        console.log(
          "Device width is less than 1200px. Screen locked to landscape mode."
        );
      } else {
        console.warn("Orientation locking is not supported by this browser.");
      }
    }
  } catch (error) {
    console.error("Error toggling fullscreen or orientation:", error);
  }
}

async function fullScreenOff() {
  if (game.electron) {
    if (electronIsFullScreen()) electronToggleFullScreen();

    return;
  }
  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      await document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      await document.msExitFullscreen();
    } else {
      console.error("Fullscreen exit is not supported by this browser.");
    }
  } catch (error) {
    console.error("Error toggling fullscreen or orientation:", error);
  }
}

function electronToggleFullScreen() {
  window.electronAPI.toggleFullscreen();
  settings.fullScreen = electronIsFullScreen();
}

function electronIsFullScreen() {
  // return settings.fullScreen;
  return window.electronAPI.getFullscreenStatus();
}

function electronCheckFullscreen() {
  if (settings.fullScreen) {
    fullScreenOn();
  } else {
    fullScreenOff();
  }
}

function ADVOn() {
  player.gameplay = "ADV";
}

function sandboxOn() {
  player.gameplay = "sandbox";
}

function currentBuildingObj() {
  return Building.getByName(player.buildingName);
}

function getNameInitial(name) {
  return `${capitalizeFirstLetter(name)[0]}.`;
}

function premiumCodeCheck() {
  if (!game.premium && player.patreonCode == "Premium Supporter") {
    game.premium = true;
  }
}

function sparklingTextCheck() {
  const stars = document.querySelectorAll(".magic-star:not(.star-animated)");
  if (!stars.length) {
    return;
  }

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const animateStar = (star) => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);
  };

  stars.forEach((star, index) => {
    star.classList.add("star-animated");
    setTimeout(() => {
      animateStar(star);
      setInterval(() => animateStar(star), 1300);
    }, index * 650);
  });
}
//removed  text-transparent from the class
function inlineSparklingText(text) {
  return `
    <span
          class="inline-block magic bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text"
        >
          <span>${text}</span>
          <svg
            class="magic-star premium-color"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2.5l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2.5z"
            />
          </svg>
          <svg
            class="magic-star premium-color"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2.5l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2.5z"
            />
          </svg>
        </span>
    `;
}

function updateFullScreenStatus() {
  if (
    document.fullscreenElement || // Standard browsers
    document.webkitFullscreenElement || // Safari
    document.mozFullScreenElement || // Firefox
    document.msFullscreenElement // IE/Edge
  ) {
    settings.fullScreen = true;
  } else {
    settings.fullScreen = false;
  }
  // console.log("Full-screen mode:", settings.fullScreen);
}

function dev(text) {
  if (game.devMode) {
    console.log(text);
  }
}

function simp(title, name, text) {
  game.showNotification(title, "#FF0000", name, text, "assets/svg/user.png");
}

function audio_files_list(folder, names) {
  return names.map((name) => ({
    name: name,
    source: `assets/audio/${folder}/${name}.mp3`,
  }));
}

function changeMusicTrack(name) {
  if (name == settings.currentMusicTrack) {
    return;
  }
  enJin.audioController.stop(settings.currentMusicTrack);

  settings.currentMusicTrack = name;
  enJin.audioController.play(name, true);
}
function startRingtone() {
  enJin.audioController.play("ringtone");
}
function endRingtone() {
  enJin.audioController.stop("ringtone");
}
