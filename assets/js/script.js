const _masterAudio_base = [
  {
    name: "bgMusic",
    source: "assets/audio/13BBC/theme.mp3",
    stack: 1,
  },
  {
    name: "heal",
    source: "assets/audio/heal.wav",
  },
  {
    name: "invalid",
    source: "assets/audio/errorFX.wav",
    stack: 4,
  },
  {
    name: "stageComplete",
    source: "assets/audio/stageCompleteFX.mp3",
  },
  {
    name: "cardHover",
    source: "assets/audio/cardHoverFX.wav",
    stack: 5,
  },
  {
    name: "enemyKilled",
    source: "assets/audio/enemyDeadFX.wav",
  },
  {
    name: "defensiveEquipped",
    source: "assets/audio/defensiveEquipped.mp3",
  },
  {
    name: "enemyHit",
    source: "assets/audio/enemyHitFX.mp3",
    stack: 4,
  },
  {
    name: "node",
    source: "assets/audio/nodeFX.wav",
    stack: 2,
  },
  {
    name: "data",
    source: "assets/audio/dataFX.mp3",
    stack: 3,
  },
  {
    name: "buy",
    source: "assets/audio/buyFX.mp3",
    stack: 2,
  },
  {
    name: "openShop",
    source: "assets/audio/openShopFX.mp3",
  },
  {
    name: "take",
    source: "assets/audio/takeFX.mp3",
    stack: 6,
  },
  {
    name: "trash",
    source: "assets/audio/trashFX.mp3",
    stack: 2,
  },
  {
    name: "enemyAttackFlesh",
    source: "assets/audio/enemyAttackFX.mp3",
    stack: 3,
  },
  {
    name: "enemyAttackShield",
    source: "assets/audio/enemyAttackShieldFX_1.wav",
    stack: 3,
  },
  {
    name: "achievement",
    source: "assets/audio/achievementsFX.mp3",
  },
  {
    name: "mine",
    source: "assets/audio/dataminingsFX.wav",
    stack: 2,
  },
  {
    name: "intro",
    source: "assets/audio/intro.mp3",
  },
  {
    name: "takeRelic",
    source: "assets/audio/takeRelicsFX.wav",
  },
  //13 BBC
];

const _masterAudio_13BBC = [
  {
    name: "awkward-female-laugh",
    source: "assets/audio/13BBC/awkward-female-laugh.mp3",
  },

  {
    name: "Blossom-laugh",
    source: "assets/audio/13BBC/Blossom-laugh.mp3",
  },

  {
    name: "break-room-ambience",
    source: "assets/audio/13BBC/break-room-ambience.mp3",
  },

  {
    name: "coffee",
    source: "assets/audio/13BBC/coffee.mp3",
  },

  {
    name: "door",
    source: "assets/audio/13BBC/door.mp3",
  },

  {
    name: "female-angry1",
    source: "assets/audio/13BBC/female-angry1.mp3",
  },

  {
    name: "female-angry2",
    source: "assets/audio/13BBC/female-angry2.mp3",
  },

  {
    name: "female-angry3",
    source: "assets/audio/13BBC/female-angry3.mp3",
  },

  {
    name: "female-angry4",
    source: "assets/audio/13BBC/female-angry4.mp3",
  },

  {
    name: "female-chuckle",
    source: "assets/audio/13BBC/female-chuckle.mp3",
  },

  {
    name: "female-cough",
    source: "assets/audio/13BBC/female-cough.mp3",
  },

  {
    name: "female-gasp",
    source: "assets/audio/13BBC/female-gasp.mp3",
  },

  {
    name: "female-laugh1",
    source: "assets/audio/13BBC/female-laugh1.mp3",
  },

  {
    name: "female-laugh2",
    source: "assets/audio/13BBC/female-laugh2.mp3",
  },

  {
    name: "female-laugh3",
    source: "assets/audio/13BBC/female-laugh3.mp3",
  },

  {
    name: "female-shock",
    source: "assets/audio/13BBC/female-shock.mp3",
  },

  {
    name: "female-yawn",
    source: "assets/audio/13BBC/female-yawn.mp3",
  },

  {
    name: "heartbeat",
    source: "assets/audio/13BBC/heartbeat.mp3",
  },

  {
    name: "heels",
    source: "assets/audio/13BBC/heels.mp3",
  },

  {
    name: "magic-shine",
    source: "assets/audio/13BBC/magic-shine.mp3",
  },

  {
    name: "open-curtain",
    source: "assets/audio/13BBC/open-curtain.mp3",
  },

  {
    name: "Penny-laugh",
    source: "assets/audio/13BBC/Penny-laugh.mp3",
  },

  {
    name: "room-laugh",
    source: "assets/audio/13BBC/room-laugh.mp3",
  },

  {
    name: "screen-door",
    source: "assets/audio/13BBC/screen-door.mp3",
  },

  {
    name: "shock",
    source: "assets/audio/13BBC/shock.mp3",
  },

  {
    name: "shower",
    source: "assets/audio/13BBC/shower.mp3",
  },
];

const _masterAudio_Ep2 = audio_files_list("Ep2", [
  "1-slap",
  "2-slaps",
  "4-slaps",
  "buttplug_popout",
  "Evelyn-mast",
  "masturbation-moans1",
  "masturbation-moans2",
  "pee-ground",
  "whistle",
  "slow-danger",
  "ringtone",
  "door-slam",
  "camera-flash",
]);

const _masterAudio = arrayUnion(
  _masterAudio_base,
  _masterAudio_13BBC,
  _masterAudio_Ep2
);

function $start() {
  // chat_1();
  let selectedEpisode = player.episode;
  player = new Player();
  vm.player = player;
  player.episode = selectedEpisode;
  player.progressEpisode = selectedEpisode;
  player.mainMenuStartText = "Continue playing";
  appendLabelAndPush(`$Ep${player.episode}_start`);
}

// Initialize EnJin
const enJin = new EnJin();

// Add enJin modules
enJin.add("audio");
enJin.add("utilities");

enJin.audioController.load(_masterAudio);

function playGlobalMusic() {
  enJin.audioController.play(settings.currentMusicTrack, true);
  enJin.audioController.setFilterType("lowpass");
}
document.addEventListener("click", function () {
  playGlobalMusic();
});

// --------------------------------------------------------------------------------
// Independent (Orderless) Support Classes
// --------------------------------------------------------------------------------

class Node extends HTMLDivElement {
  static initHTMLElementExtenders() {
    HTMLElement.prototype.hasSound = function () {
      return !this.classList.contains("no-sound");
    };

    HTMLElement.prototype.addHoverSoundFX = function () {
      if (!this.hasSound())
        this.addEventListener("mouseenter", () => {
          enJin.audioController.play("cardHover");
        });
    };

    HTMLElement.prototype.addClickSoundFX = function () {
      if (!this.hasSound())
        this.addEventListener("click", () => {
          enJin.audioController.play("take");
        });
    };

    HTMLElement.prototype.clickAction = function (func, sound = true) {
      if (sound) this.addClickSoundFX();
      this.addEventListener("click", () => {
        func();
      });
    };

    HTMLElement.prototype.addCorners = function () {
      const node = Node.create("Corners");
      node.innerHTML = `<div class="Corners relative">
              <svg class="Corner4" style="left: 0px; bottom: 0px; position: absolute;" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8L1 8L0.999999 6.99382e-07" stroke="var(--color-2)" stroke-width="2"/>
              </svg>
              <svg class="Corner3" style="right: 0px; bottom: 0px; position: absolute;" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L8 8L1.04907e-06 8" stroke="var(--color-2)" stroke-width="2"/>
              </svg>
              <svg class="Corner2" style="right: 0px; top: 0px; position: absolute;" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1L8 1L8 9" stroke="var(--color-2)" stroke-width="2"/>
              </svg>
              <svg class="Corner1" style="left: 0px; top: 0px; position: absolute;" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L1 1L9 1" stroke="var(--color-2)" stroke-width="2"/>
              </svg>
            </div>`;

      this.appendChild(node);
    };
  }

  static create(className = "", type = "div") {
    const node = document.createElement(type);
    if (className instanceof Array) {
      className.forEach((cl) => {
        node.classList.add(cl);
      });
    } else if (!className) {
      // do nothing
    } else {
      node.className = className;
    }

    return node;
  }

  static fullScreenNode = document.querySelector(".fullScreen");

  static fullScreen(x) {
    const node = Node.fullScreen;
    node.innerHTML = x;
    game.fullScreen = true;
  }

  static createButton(className, text, func) {
    const node = Node.create(className, "button");

    node.innerHTML = text;

    node.clickAction(func);

    return node;
  }

  static createLabelButton(buttonTitle, LabelName) {
    return Node.createButton("polygon", buttonTitle, () => {
      Label.call(LabelName);
    });
  }

  static popup1 = document.querySelector(".popup1");

  static msgr = document.querySelector(".msgr-popup");

  static popup = Node.popup1;
  static getPopupScreen() {
    return Node.popup.querySelector(".popup_screen");
  }

  static showMsgr(charsList, chatList) {}
}

Node.initHTMLElementExtenders();

class Time {
  constructor(time = 0, date = new Date("2016-08-17"), numDay = 1) {
    // 2016-08-17 is a Wednesday
    this.timeSlot = time % 6;
    this.date = date;
    this.numDay = numDay;

    this.timeStr = this.getTimeStr();
    this.dateStr = this.getShortFormat();
  }

  static now = new Time();

  getTimeStr(timeSlot = this.timeSlot) {
    timeSlot = timeSlot % 6;
    const arr = [
      "EarlyMorning",
      "Morning",
      "Noon",
      "Afternoon",
      "Evening",
      "Night",
    ];
    return arr[this.timeSlot];
  }

  getDayOfWeek() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[this.date.getDay()];
  }

  getMonth() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[this.date.getMonth()];
  }

  getYear() {
    return this.date.getFullYear();
  }

  setTime(newTime) {
    this.timeSlot = newTime % 6;
  }

  skipTime(x = 1) {
    this.timeSlot = (this.timeSlot + 1) % 6;
  }

  addDays(days) {
    this.date.setDate(this.date.getDate() + days);
  }

  getTimeSlot() {
    return this.timeSlot;
  }

  getShortFormat() {
    return this.date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
}

class Current {
  static time = new Time();
  static occupants = [];
  static building = null;
  static room = null;
  static label = null;
  static actionsList = [];
  static popup = 1;
}

class Scene {
  constructor(name) {
    this.name = name;
    this.isSeen = false;
  }
}

// Dependent Classes

// Depends on Time and Base

class Stat {
  static getMaxStatPerLevel(lvl) {
    return 5 * lvl;
  }
}

// --------------------------------------------------------------------------------
// Base player class
// --------------------------------------------------------------------------------

class Player {
  constructor() {
    this.className = "Player";

    this.name = game.mainCharName;

    this.supportiveName = game.supportiveName;

    this.supportive2Name = game.supportive2Name;

    this.patreonCode = "Normal Supporter";
    if (game.premium) {
      this.patreonCode = "Premium Supporter";
    }

    this.gameplay = "ADV";

    this.phoneMode = false;

    this.buildingName = "Fyodor Residence";

    this.subLocation = "Overview";

    this.phoneBG = "assets/images/designs/pc/bg1.jpg";

    this.roomName = "";

    this.textBox = true;
    this.location = "";
    this.date = "";
    this.time = "";
    this.skipping = false;
    this.cheatMode = true;
    this.charColor = "red";
    this.charName = "Luke";
    this.charPic = "assets/images/recurring/save.jpg";
    this.charAct = "";
    this.text = ``;
    this.textMenu = [];
    this.vscene = "assets/images/recurring/save.jpg";

    this.videoLoop = false;

    this.landscapeVScene = true;
    // this.cheatCode = "Premium Player";
    this.mainMenuStartText = "New game";
    this.episode = 1;
    this.progressEpisode = 1;

    this.inProgress = false;

    this.onCall = false;
    this.incomingCall = false;
    this.phoneNumberCalling = "182 5843 6068";

    this.acceptCallLabelName = "";
    this.declineCallLabelName = "";

    this.imagesFolder = "";
    this.saveImg = "";
    this.video = {
      active: false,
      controls: true,
      autoplay: true,
      loop: true,
      mute: false,
    };

    this.messengerNames = ["Blossom", "Penny", "Piper", "Evelyn"];

    this.fantasy = false;
    this.isFantasyAnimated = false;

    this.level = 1;
    this.gems = 0;
    this.crypto = 0;
    this.cash = 2000;

    this.class = "Manipulator";

    this.hygiene = 0;
    this.satiety = 1;
    this.fitness = 2;
    this.mood = 3;
    this.focus = 4;
    this.chores = 4;

    this.mode = "RenJS";
    this.sequence = [];

    this.chatButton = {
      active: false,
      absoluteActive: false,
    };

    this.messaging = "Blossom";

    this.vars = {};
  }
  acceptCall() {
    if (!player.acceptCallLabelName) return;
    endRingtone();

    player.incomingCall = false;
    appendLabelAndPush(player.acceptCallLabelName);
    enJin.audioController.play("take");
  }

  declineCall() {
    if (!player.declineCallLabelName) return;
    endRingtone();

    enJin.audioController.play("take");
    player.onCall = false;
    appendLabelAndPush(player.declineCallLabelName);
  }
  callStatus() {
    if (player.incomingCall) return "Calling";
    return "On Call";
  }

  messengers() {
    if (!Array.isArray(this.messengerNames)) {
      throw new Error("this.messengerNames must be an array");
    }

    return this.messengerNames.map((name) => Character.find(name));
  }

  reSetVideo() {
    player.videoLoop = false;
    this.video = {
      active: false,
      controls: true,
      autoplay: true,
      loop: true,
      mute: false,
    };
  }

  hasDarryl() {
    return this.messengerNames.includes("Darryl");
  }

  sortMessengersBase() {
    const order = [];

    player.messengers().sort((a, b) => {
      const indexA = order.indexOf(a.displayName);
      const indexB = order.indexOf(b.displayName);

      // If either displayName is not in the order array, place it at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
  }
  sortMessengers() {
    this.sortMessengersBase();
    return player
      .messengers()
      .sort((a, b) => b.lastMessageDate - a.lastMessageDate);
    // console.log(Character.All);
  }
  var(propName) {
    return this.vars.hasOwnProperty(propName) ? this.vars[propName] : false;
  }

  deactivateChat() {
    if (player.chatButton.active || player.chatButton.absoluteActive) {
      player.chatButton.active = false;
      msgrOff();
    }
  }

  changeGems(count = 0) {
    let num = Number(this.gems) + Number(count);
    console.log(num);
    if (num < 0) {
      showGemsWarning();
      return false;
    }
    this.gems = num;
    vm.gems = this.gems;
    return true;
    // console.log(`Number of crypto is ${vm.crypto}`)
  }

  earnGems(count = 0) {
    return this.changeGems(Number(count));
  }

  spendGems(count = 0) {
    return this.changeGems(Number("-" + count));
  }

  changeCrypto(count = 0) {
    let num = Number(this.crypto) + Number(count);
    console.log(this.crypto, count, num);
    if (num < 0) {
      showCryptoWarning();
      return false;
    }
    this.crypto = num;
    vm.crypto = this.crypto;
    return true;
    // console.log(`Number of crypto is ${vm.crypto}`)
  }

  earnCrypto(count = 0) {
    return this.changeCrypto(Number(count));
  }

  spendCrypto(count = 0) {
    return this.changeCrypto(Number("-" + count));
  }

  changeCash(count = 0) {
    let num = Number(this.cash) + Number(count);
    if (num < 0) {
      showCashWarning();
      return false;
    }
    this.cash = num;
    vm.cash = this.cash;
    return true;
    // console.log(`Number of crypto is ${vm.crypto}`)
  }

  earnCash(count = 0) {
    changeCash(Number(count));
  }

  spendCash(count = 0) {
    changeCash(Number("-" + count));
  }
}

registerClass("Player", Player);

// --------------------------------------------------------------------------------
// Game class
// Contains all functions and methods related to the game
// --------------------------------------------------------------------------------

class Game {
  constructor() {
    this.className = "Game";

    this.title = "13 BBC";
    this.setDocumentTitle();

    this.titlePart1 = "13";
    this.titlePart2 = "BBC";

    this.wordCount = 12000;
    this.CGCount = 260;

    this.theme = "green";

    this.preloader = false;

    this.electron = true;

    if (this.electron) {
      this.preloader = false;
    }

    this.setPalette();

    this.fullTitle = "13 Basic Blunders to Cuckening";

    this.version = "0.15";

    this.numberOfEpisodes = 2;

    this.mainCharName = "Luke";

    this.supportiveName = "Blossom";
    this.supportiveRelationship = "girlfriend";

    this.supportive2Name = "Penny";
    this.supportive2Relationship = "mother";

    this.devMode = true;
    this.premium = false;
    if (
      localStorage.getItem("premium") &&
      !this.version.toLowerCase().includes("premium")
    ) {
      this.version = this.version.trim() + " Premium";
    }
    if (this.version.toLowerCase().includes("premium")) {
      this.premium = true;
    }

    this.online = false;

    this.patreonUnlockCode = "TExQo9vK";

    this.restartEpisode = false;

    this.keyboardGuide = false;

    this.keyPresses = true;

    this.isTyping = true;

    this.lastSaveTime = 0;

    this.screenCapAbsolute = true;
    this.scrollAnimationsAbsolute = true;

    this.mode = "RenJS";

    this.pause = false;

    this.scene = false;

    this.popup = {
      open: false,
      h2: "",
      p1: "",
      p2: "",
      pic: "",
      skipText: "Go back",
      buttons: [],
    };

    this.gameAchievements = false;
    this.savesScreen = false;
    this.settingsScreen = false;

    this.lowerFrequency = 300; // Low pass frequency when in store etc
    this.defaultFrequency = 15000; // Default low pass frequency
    this.mainMenu = true;
    this.gameCreation = false;
    this.gameAchievements = false;
    this.muted = false;
    this.init = false;
    this.shopMinimized = false;
    this.completedAchievementCount = 0;
    this.upgradesMinimized = true;
    this.popup1 = false;
    this.popup2 = false;
    this.passage = false;

    this.backgroundVideo = false;
    this.backgroundVideoActive = false;
    this.backgroundVideoSrc = "assets/gif/chest-animation3.mp4";

    this.enablePassagePopup = false;
    this.popupPic = false;
    this.popupPicAspect32 = false;
    this.fullScreenClick = false;

    this.roulette = false;
    this.earnedPrizePage = false;

    this.cryptoWarning = false;
    this.gemsWarning = false;
    this.cashWarning = false;

    this.popupData = {};
    this.popupData.h2 = ``;
    this.popupData.p1 = ``;
    this.popupData.p2 = ``;
    this.popupData.leaveText = `Leave`;
    this.popupData.buttonsNum = 1;
    this.popupData.buttonTexts = [``, ``, ``, ``, ``, ``, ``, ``, ``, ``];
    this.popupData.buttonLabels = [``, ``, ``, ``, ``, ``, ``, ``, ``, ``];

    this.sceneInnerHTML = "";

    this.prologue1 = true;

    this.msgr = false;

    this.pcMode = false;

    this.fullScreen = false;
  }

  setDocumentTitle(title = this.title) {
    document.title = title;
  }

  resetPopup() {
    this.popup = {
      open: false,
      h2: "",
      p1: "",
      p2: "",
      pic: "",
      skipText: "Go back",
      buttons: [],
    };
  }

  unlockPremiumPopup() {
    game.resetPopup();
    game.popup.h2 = "Premium Unlocked";
    game.popup.p2 = `Congratulations! You've successfully activated your premium code. Click the button below to reset your game and unlock exclusive premium content.`;
    game.popup.pic = "assets/images/recurring/premium.jpg";
    game.popup.buttons.push({
      title: "Unlock Premium",
      action: () => {
        saveToLocalStorage("premium", { premium: true });
        Save.reset(false);
        player.patreonCode = "Premium Supporter";
        document.getElementById("patreonCodeInputBox").innerHTML =
          player.patreonCode;
        document.querySelector("img.net.codeIcon").src = "assets/svg/crown.svg";
      },
    });
    game.popup.open = true;
  }

  correctGameVersion() {
    if (game.premium && !this.version.toLowerCase().includes("premium")) {
      this.version = this.version.trim() + " Premium";
    }
  }

  start() {
    if (
      !game.premium &&
      player.patreonCode &&
      player.patreonCode != "Normal Supporter"
    ) {
      if (player.patreonCode.toLocaleLowerCase() == game.patreonUnlockCode) {
        game.unlockPremiumPopup();
        return;
      }

      setTimeout(() => {
        player.patreonCode = "Normal Supporter";
        document.getElementById("patreonCodeInputBox").innerHTML =
          player.patreonCode;
      }, 500);
      game.resetPopup();
      game.popup.h2 = "Wrong Patreon Code";
      game.popup.p2 = `Your Patreon code is invalid. Please get the correct code from Patreon. 
        Avoid multiple incorrect attempts, as it may corrupt your save.`;
      game.popup.pic = "assets/images/recurring/warning.jpg";
      game.popup.buttons.push({
        title: "Start in Normal Mode",
        action: () => {
          document.getElementById("patreonCodeInputBox").innerHTML =
            "Normal Supporter";
          player.patreonCode = "Normal Supporter";
          this.start();
        },
      });
      game.popup.buttons.push({
        title: `<span class="cursor-pointer-all">${inlineSparklingText(
          "Patreon"
        )}</span>`,
        action: () => {
          openPatreonLink();
        },
      });

      game.popup.open = true;
      return;
    } else if (game.premium) {
      player.patreonCode = "Premium Supporter";
      document.getElementById("patreonCodeInputBox").innerHTML =
        player.patreonCode;
    }

    if (player.progressEpisode != player.episode) {
      let selectedEpisode = player.episode;
      setTimeout(() => {
        player.episode = player.progressEpisode;
      }, 500);
      game.resetPopup();
      game.popup.h2 = "Start Episode " + selectedEpisode;
      game.popup.p2 = `Are you sure you want to start Episode ${selectedEpisode}? This will reset progress in other episodes.`;
      game.popup.pic = `assets/images/posters/episode${selectedEpisode}-1-1.jpg`;
      game.popup.buttons.push({
        title: "Start Episode " + selectedEpisode,
        action: () => {
          player.episode = selectedEpisode;
          player.progressEpisode = player.episode;
          renjs = new RenJS();
          game.start();
        },
      });
      game.popup.open = true;
      return;
    }

    if (game.restartEpisode) {
      setTimeout(() => {
        game.restartEpisode = false;
      }, 500);
      game.resetPopup();
      game.popup.h2 = "Restart Episode " + player.episode;
      game.popup.p2 = `Are you sure you want to restart Episode ${player.episode}? This will reset your progress.`;
      game.popup.pic = `assets/images/posters/episode${player.episode}-1-1.jpg`;
      game.popup.buttons.push({
        title: "Start Episode " + player.episode,
        action: () => {
          renjs = new RenJS();
          game.restartEpisode = false;
          game.start();
        },
      });
      game.popup.open = true;
      return;
    }

    vmReset();

    if (game.devMode) {
      // devCall
      // pcOn();
    }

    let playerName = capitalizeFirstLetter(
      document.getElementById("nameInputBox").value
    );
    let supportiveName = game.supportiveName;
    let supportive2Name = game.supportive2Name;

    if (supportiveName)
      supportiveName = capitalizeFirstLetter(
        document.getElementById("supportiveNameInputBox").value
      );

    if (supportive2Name)
      supportive2Name = capitalizeFirstLetter(
        document.getElementById("supportive2NameInputBox").value
      );

    let PatreonCode = "Premium Supporter";

    let patreonCodeSplit = document
      .getElementById("patreonCodeInputBox")
      .value.toLowerCase()
      .split(" ");
    patreonCodeSplit[0] = capitalizeFirstLetter(patreonCodeSplit[0].trim());
    patreonCodeSplit[1] = capitalizeFirstLetter(patreonCodeSplit[1].trim());

    let patreonCode = patreonCodeSplit.join(" ");

    renjs.clearTimeoutMessages();
    game.mainMenu = false;

    player.mainMenuStartText = "Continue playing";

    enJin.audioController.setFrequency(this.defaultFrequency);
    enJin.audioController.play("openShop");

    // updateTextMessages();

    if (!renjs.sequence[renjs.stepNum]) {
      $start();
    } else {
      Save.load();
      Character.setChats();
      renjs.stepNum--;
      if (renjs.isTyping) renjs.nextStep();
      renjs.nextStep();
    }

    player.inProgress = true;
    player.name = playerName;
    player.supportiveName = supportiveName;
    player.supportive2Name = supportive2Name;

    player.patreonCode = patreonCode;

    // player.cheatCode = cheatCode;
    Luke.displayName = player.name;
    Blossom.displayName = player.supportiveName;
    Penny.displayName = player.supportive2Name;

    updateVMCharName();
    Save.save();

    //insert a null step in the beginning to allow player name adjustment
  }

  showBackgroundVideo(
    src = "assets/gif/chest-animation3.mp4",
    delayActive = 2000,
    delayUnrender = 3000
  ) {
    game.backgroundVideo = true;
    game.backgroundVideoActive = true;
    game.backgroundVideoSrc = src;
    setTimeout(() => {
      game.backgroundVideoActive = false;
    }, delayActive);
    setTimeout(() => {
      game.backgroundVideo = false;
    }, delayUnrender);
  }

  showNotification(title, titleColor = "", name, description, imageAddress) {
    console.log(title, titleColor, name, description, imageAddress);
    setTimeout(function () {
      let notif = {
        title: title,
        titleColor: titleColor,
        name: name,
        description: description,
        imageAddress: imageAddress,
      };

      vm.currentNotification = notif;
      vm.currentNotification.imageAddress = vm.currentNotification.imageAddress;
      vm.currentNotification.titleColor = titleColor;

      console.log(vm.currentNotification.titleColor);

      vm.isNotification = true;
      vm.currentNotificationDelay = 3500;

      enJin.audioController.play("achievement");

      setTimeout(function () {
        vm.isNotification = false;
        vm.currentNotificationDelay = 0;
      }, 3500);
    }, vm.currentNotificationDelay);
  }

  static palette = {
    red: {
      "--primary-clr": "#e84a4a",
      "--primary-clr-2": "#ff6b69",
      "--primary-bright": "#ff6b6b",
      "--secondary-clr": "#2c0f14",
      "--dark-clr": "#3b1214",
      "--darker-clr": "#1a0809",
      "--primary-dark-2": "#3b1214",
      "--content-clr": "#290707",
      "--shade": "#2c0f14",
      "--bg-clr": "#000003",
    },

    green: {
      "--primary-clr": "#4ae84a",
      "--primary-clr-2": "#69ff6b",
      "--primary-bright": "#6bff6b",
      "--secondary-clr": "#142c0f",
      "--dark-clr": "#123b12",
      "--darker-clr": "#081a08",
      "--primary-dark-2": "#123b12",
      "--content-clr": "#072907",
      "--shade": "#0f2c0f",
      "--bg-clr": "#000003",
    },

    blue: {
      "--primary-clr": "#00ffc2",
      "--primary-clr-2": "#00fcc0",
      "--primary-bright": "#00ffc2",
      "--secondary-clr": "#061b20",
      "--dark-clr": "#0f272d",
      "--darker-clr": "#041316",
      "--primary-dark-2": "#051418",
      "--content-clr": "#041316",
      "--shade": "#0e2328",
      "--bg-clr": "#000003",
    },
  };

  setPalette() {
    const palette = Game.palette[this.theme];
    if (!palette) {
      console.error(`Palette for theme '${this.theme}' not found.`);
      return;
    }

    const root = document.documentElement;
    for (const [key, value] of Object.entries(palette)) {
      root.style.setProperty(key, value);
    }
  }
}

registerClass("Game", Game);

var game = new Game();
var renjs = new RenJS();

var globalImagesFolder = "assets/images/recurring";

RenJS.baseConsoleLog();

// console.clear();

// Create the player
var player = new Player();

var settings = new Settings();
//Chats depend on Character

// ----------------------------------------
// Ratio tables
// ----------------------------------------

// Function to generate ratio ranges for a ratio table and push to an array.
// All of our drops, stages and shop cards are seeded random, but we want some to be more common than other. By creating a ratio table
// we can roll a random number and check which range it falls in. The wider the range, the more likely it will be 'chosen'
if (game.preloader) {
  (function (html) {
    "use strict";

    /* animations
     * -------------------------------------------------- */
    const tl = anime
      .timeline({
        easing: "easeInOutCubic",
        duration: 800,
        autoplay: false,
      })
      .add({
        targets: "#loader",
        opacity: 0,
        duration: 1000,
        begin: function (anim) {
          window.scrollTo(0, 0);
        },
      })
      .add({
        targets: "#preloader",
        opacity: 0,
        complete: function (anim) {
          document.querySelector("#preloader").style.visibility = "hidden";
          document.querySelector("#preloader").style.display = "none";
        },
      })
      .add(
        {
          targets: [".s-header__logo", ".s-header__menu-toggle"],
          opacity: [0, 1],
        },
        "-=200"
      )
      .add(
        {
          targets: [".s-intro__perTitle", ".s-intro__title", ".s-intro__more"],
          translateY: [100, 0],
          opacity: [0, 1],
          delay: anime.stagger(200),
        },
        "-=400"
      )
      .add(
        {
          targets: [".s-intro__social", ".s-intro__scroll"],
          opacity: [0, 1],
          delay: anime.stagger(200),
        },
        "-=200"
      );

    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {
      if (!game.preloader) {
        return;
      }
      const preloader = document.querySelector("#preloader");
      if (!preloader) return;

      html.classList.add("ss-preload");

      window.addEventListener("load", function () {
        html.classList.remove("ss-preload");
        html.classList.add("ss-loaded");
        tl.play();
      });
    }; // end ssPreloader

    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {
      ssPreloader();
      ssOffCanvas();
      ssMasonry();
    })();
  })(document.documentElement);
}

//global Names

// Vue instance
vm = new Vue({
  el: ".game",

  data() {
    return {
      player: player,
      game: game,
      renjs: renjs,
      settings: settings,

      pc: pc,

      fullScreenPossible: RenJS.isFullScreenChangePossible(),

      isNotification: false,
      currentNotification: {
        name: "",
        title: "",
        description: "title",
        imageAddress: "assets/svg/rewards/crypto.png",
        titleColor: "#FF0000",
      },

      isCtrlPressed: false,
      isMetaPressed: false,
      isSpacePressed: false,
      isEnterPressed: false,
      isSpaceKilled: false,
      isEnterKilled: false,
    };
  },

  methods: {
    // Reset data object. Used when updating the seed to re-evaluate all random properties using seed
    handleResetClick() {
      game.resetPopup();
      game.popup.h2 = "Game Reset";
      game.popup.p2 = `This will reset the game and delete all your saves. Kindly do not use this except under the developer's 
      instructions.`;
      game.popup.pic = "assets/images/recurring/warning.jpg";
      game.popup.buttons.push({
        title: "Reset",
        action: () => {
          Save.reset();
        },
      });
      game.popup.open = true;
    },
    setKeyPresses(status) {
      this.game.keyPresses = status;
    },
    checkKeyPresses() {
      const inputs = document.querySelectorAll("input");
      const isAnyInputFocused = Array.from(inputs).some(
        (input) => input === document.activeElement
      );
      this.game.keyPresses = !isAnyInputFocused;
    },

    handlePatreonCodeFromBox() {
      if (game.premium) {
        return;
      }
      this.player.patreonCode = document.getElementById(
        "patreonCodeInputBox"
      ).value;
    },

    handleMoreStuff() {
      game.resetPopup();
      game.popup.h2 = "Support!";
      game.popup.p2 = `Would you like to check out my Patreon page?`;
      game.popup.pic = "assets/images/recurring/support.jpg";
      game.popup.buttons.push({
        title: `<span class="cursor-pointer-all">${inlineSparklingText(
          "Patreon"
        )}</span>`,
        action: () => {
          openPatreonLink();
        },
      });

      // game.popup.buttons.push({
      //   title: "Kofi",
      //   action: () => {
      //     openKofiLink();
      //   },
      // });
      game.popup.open = true;
    },

    handleMapButton() {
      if (player.subLocation == "Overview") {
        $city();
      } else if (player.subLocation == "Overview") {
        $outsideResidence();
      } else if (player.subLocation == "RoomInterior") {
        $goToHall();
      }
    },

    handlePreferencesReset() {
      game.resetPopup();
      game.popup.h2 = "Reset preferences to default";
      game.popup.p2 = `This will reset to default settings.`;
      game.popup.pic = "assets/images/recurring/settings.jpg";
      game.popup.buttons.push({
        title: "Reset",
        action: () => {
          Settings.reset();
        },
      });
      game.popup.open = true;
    },

    mainMenu() {
      mainMenu();
    },

    switchMessenger(charName) {
      Character.switchMessenger(charName);
    },

    getCharacter(name) {
      return Character.find(name);
    },

    scrollToBottom(characterName) {
      const chatContainer = this.$refs["chatContainer-" + characterName]?.[0];
      if (chatContainer) {
        chatContainer.scrollTop += chatContainer.scrollHeight;
        // console.log("scrolled " + characterName + " to bottom");
      }
    },

    fantasyAnimation() {
      this.player.isFantasyAnimated = false;
      setTimeout(() => {
        this.player.isFantasyAnimated = true;
      }, 50);
    },

    handleSaveClick(index) {
      const autoSaveData = loadFromLocalStorage(`${game.title}Save0`);
      const indexSaveData = this.saves()[index];

      game.resetPopup();
      game.popup.h2 = indexSaveData.description;
      game.popup.p1 = indexSaveData.dateStr;
      if (!autoSaveData) {
        game.resetPopup();
        game.popup.p2 =
          "There are no data to save. Please start a new game first.";
      } else if (index === 0) {
        game.popup.p2 = "Forced autosave is unavailable yet.";
      } else {
        game.popup.buttons.push({
          title: "Save",
          action: () => {
            Save.save(index);
          },
        });
        if (indexSaveData.dateStr.trim()) {
          game.popup.p2 =
            "Saving will replace data on this slot and loading will replace your current Autosave.";
          game.popup.buttons.push({
            title: "Load",
            action: () => {
              Save.load(index);
              game.start();
            },
          });
        } else {
          game.popup.p2 = "Would you like to save on this slot?";
        }
      }
      if (indexSaveData.image) {
        game.popup.pic = indexSaveData.image;
        // console.log("update to " + game.popup.pic);
      } else {
        game.popup.pic = "assets/images/recurring/save.jpg";
      }
      // console.log(game.popup.pic);
      game.popup.open = true;
    },

    handlePopupButtonClick(button) {
      enJin.audioController.play("openShop");
      if (typeof button.action === "function") {
        button.action();
      }
      game.popup.open = false;
    },

    saves() {
      return Array.from({ length: 8 }, (_, i) => {
        const key = `${game.title}Save${i}`;
        const localData = localStorage.getItem(key);
        let dateStr = " ";
        let image = "";

        if (localData) {
          try {
            const parsedData = JSON.parse(localData);
            dateStr = parsedData.dateStr || dateStr;
            image = parsedData.image || image;
          } catch (error) {
            console.error(`Error parsing localStorage item ${key}:`, error);
          }
        }

        return {
          num: i,
          description: i === 0 ? "Autosave" : `Save ${i}`,
          dateStr,
          image,
        };
      });
    },

    isPicLandscape() {
      return isLandscape(this.$refs.renJSPic);
    },

    isVidLandscape() {
      return isLandscape(this.$refs.renJSVid);
    },

    onPlay() {
      if (game.muted) return;
      if (player.videoLoop) return;

      enJin.audioController.globalMute();
    },

    onPause() {
      if (game.muted) return;
      enJin.audioController.globalUnmute();
    },

    scrollAllMessengers() {
      this.player.messengers().forEach((character) => {
        // if (player.messaging != character.name)
        this.scrollToBottom(character.name);
      });
    },

    scrollAllMessengersAbsolute() {
      this.player.messengers().forEach((character) => {
        this.scrollToBottom(character.name);
      });
    },

    setInkRenJSInkTransitionSize() {
      console.log("setting");
      const renJSPic = this.$refs.renJSPic;
      const renJSVid = this.$refs.renJSVid;
      const inkTransition = this.$refs.inkTransition;

      if (renJSPic && inkTransition) {
        const { offsetWidth, offsetHeight } = renJSPic;
        inkTransition.style.width = `${offsetWidth}px`;
        inkTransition.style.height = `${offsetHeight}px`;
      }

      if (renJSVid && inkTransition) {
        const { offsetWidth, offsetHeight } = renJSVid;
        inkTransition.style.width = `${offsetWidth}px`;
        inkTransition.style.height = `${offsetHeight}px`;
      }
    },

    onFullScreenToggle() {
      toggleFullScreen();
    },

    onTypewriterToggle() {
      Settings.save();
    },
    onCharacterImageToggle() {
      Settings.save();
    },
    onTextBoxStyleToggle() {
      if (settings.textBoxStyle == "CC") {
        Settings.setTextBoxStyle("Shadow");
      } else if (settings.textBoxStyle == "Shadow") {
        Settings.setTextBoxStyle("CC");
      }

      Settings.save();
    },

    onHighlightPremiumChoicesToggle() {
      Settings.save();
    },
    onRightClickSaveToggle() {
      Settings.save();
    },
    onAudioToggle() {
      Settings.audioToggle();
    },
    onSFXVolumeChange() {
      Settings.setSFXVolume();
    },
    onMusicVolumeChange() {
      Settings.setMusicVolume();
    },
  },

  watch: {
    settings: {
      handler() {
        Settings.save();
      },
      deep: true,
    },

    "settings.typingSpeed"(newValue) {
      this.settings.typewriterEnabled = newValue !== 0;
    },

    "player.fantasy": function () {
      document.body.style.backgroundColor = this.player.fantasy
        ? "#f9f8f1"
        : "";
    },

    "player.buildingName": function () {
      this.building = currentBuildingObj();
    },

    "player.vscene": function () {
      if ((this.$refs.renJSPic || this.$refs.renJSVid) && this.player.fantasy) {
        this.fantasyAnimation();
      }
    },

    isPicLandscape(newValue) {
      this.player.landscapeVScene = newValue;
    },

    isVidLandscape(newValue) {
      this.player.landscapeVScene = newValue;
    },
  },

  computed: {
    typewriterSettingText() {
      return this.settings.typewriterEnabled ? "Enabled" : "Disabled";
    },

    characterImageSettingText() {
      return this.settings.charImage ? "Enabled" : "Disabled";
    },

    textBoxSettingText() {
      if (this.settings.textBoxStyle == "CC") return "Closed Captions";
      return this.settings.textBoxStyle;
    },

    patreonCodeSvg() {
      if (game.premium) {
        document.getElementById("patreonCodeInputBox").value =
          "Premium Supporter";
        return "assets/svg/crown.svg";
      }

      return "assets/svg/el_network.svg";
    },

    buildingBGPic() {
      let name = "Fyodor Residence";
      return `assets/images/buildings/${name.replace(" ", "%20")}/bg.png`;

      if (player.subLocation == "Overview") {
        return "";
      } else {
        return `assets/images/buildings/${name.replace(" ", "%20")}/bg.png`;
      }
    },

    fullScreenSettingText() {
      if (!this.fullScreenPossible) {
        return "Fullscreen API is not supported by this browser.";
      }
      return this.settings.fullScreen ? "Full Screen" : "Window Mode";
    },

    // restartEpisodeText() {
    //   return this.game.restartEpisode ? "Restart" : "Continue";
    // },
    highlightPremiumChoicesText() {
      return this.settings.highlightPremiumChoices ? "Enabled" : "Disabled";
    },

    rightClickSaveText() {
      return this.settings.rightClickSave ? "Enabled" : "Disabled";
    },

    audioSettingText() {
      return this.settings.audioEnabled ? "Enabled" : "Disabled";
    },

    startGameText() {
      return this.settings.fullScreen ? "Start Game" : "Start";
    },

    mapButtonDescription() {
      const subLocationToMapButtonDescription = {
        Overview: "City",
        Hall: "Outside",
        RoomInterior: "Hall",
      };
      return subLocationToMapButtonDescription[this.player.subLocation];
    },
  },

  updated() {
    this.scrollAllMessengers();
  },

  mounted() {
    this.scrollAllMessengers();
  },
});

document.documentElement.style.setProperty(
  "--screenHeight",
  `${window.innerHeight}px`
);

window.addEventListener("resize", () => {
  document.documentElement.style.setProperty(
    "--screenHeight",
    `${window.innerHeight}px`
  );
});

// player.label.call();

class Prize {
  constructor(rarity = "common", reward = "crypto", count = 0) {
    this.rarity = rarity;
    this.reward = reward;
    this.count = count;
    this.node = this.createNode();
  }

  equals(prize) {
    let boo = true;
    if (this.rarity != prize.rarity) boo = false;
    if (this.reward != prize.reward) boo = false;
    if (this.count != prize.count) boo = false;
    return boo;
  }

  isSpecial() {
    return this.rarity.split("-").length > 1;
  }

  createNode(cardChar = "") {
    const node = Node.create("tile");
    if (this.isSpecial()) node.classList.add("specialTileShadow");

    let rewardExtension = "svg";
    if (this.reward == "crypto") rewardExtension = "png";
    let rewardAddress = `assets/svg/rewards/${this.reward}.${rewardExtension}`;
    if (cardChar) {
      rewardAddress = `assets/images/characters/${cardChar}.jpg`;
    }
    node.style.backgroundImage = urlText(`assets/svg/tiles/${this.rarity}.png`);

    node.innerHTML = `
            ${
              this.isSpecial()
                ? '<img class="IconGraphicSparkle" src="assets/svg/sparkle.svg" style="width: 30px; height: 30px; top: -6px; left: -9px; z-index:30; position: absolute;">'
                : ""
            }
            <div class="tileComponent" style="background-image: url('${rewardAddress}')"></div>    
        `;
    if (this.count) {
      let node2 = Node.create("tileQuantityContainer");
      node2.innerHTML = `
            <div class="relative Goldman" style="color:white; width: 56px; position: relative; justify-content: flex-end; align-items: flex-start; display: inline-flex;">
                <div class="X">x</div>
                <div class="Qty">${this.count}</div>
            </div>
            `;
      node.querySelector(".tileComponent").appendChild(node2);
    }
    return node;
  }

  static rewardTypes = [
    { rarity: "common", weight: 50 },
    { rarity: "rare", weight: 30 },
    { rarity: "epic", weight: 15 },
    { rarity: "legendary", weight: 4 },
    { rarity: "relic", weight: 1 },
  ];

  static getRandomRewardRarity(special = false) {
    let totalWeight = Prize.rewardTypes.reduce(
      (total, reward) => total + reward.weight,
      0
    );

    let randomNum = Math.random() * totalWeight;

    for (let i = 0; i < Prize.rewardTypes.length; i++) {
      if (randomNum < Prize.rewardTypes[i].weight) {
        return Prize.rewardTypes[i].rarity;
      }
      randomNum -= Prize.rewardTypes[i].weight;
    }
  }

  static rewardListTemplate = [
    new Prize("common", "gem", "5"),
    new Prize("rare", "gem", "10"),
    new Prize("legendary", "crypto", "10"),
    new Prize("epic", "gem", "20"),
    new Prize("common", "crypto", "1"),
    new Prize("epic", "crypto", "3"),

    new Prize("relic", "gem", "100"),
  ];

  static rewardGroupByRarity(rewardList) {
    let grouping = {
      common: [],
      rare: [],
      epic: [],
      legendary: [],
      relic: [],
    };
    rewardList.forEach((reward) => {
      grouping[reward.rarity].push(reward);
    });

    return grouping;
  }

  static getRandomRewardFromGroupingByRarity(rarity, grouping) {
    return getRandomElement(grouping[rarity]);
  }

  static getFairPrize(rewardList) {
    let grouping = Prize.rewardGroupByRarity(rewardList);
    let rarity = Prize.getRandomRewardRarity();

    //rewardList must have one of each rarity
    return Prize.getRandomRewardFromGroupingByRarity(rarity, grouping);
  }

  getIndex(rewardsList) {
    for (let i = 0; i < rewardsList.length; i++) {
      if (this.equals(rewardsList[i])) return i;
    }
    console.log("prize " + this + " not found in array" + rewardsList);
    return null;
  }

  static getByIndex(rewardsList, n) {
    return rewardsList[n];
  }

  setAsCurrentPrize() {
    // console.log(this)
    player.currentPrize = this;
    let node = document.querySelector(".earnedPrizePage .current-prize-tile");
    node.innerHTML = "";
    if (this.reward == "crypto") {
      node.appendChild(this.createNode());
    } else if (this.reward == "gem") {
      node.appendChild(this.createNode());
    } else {
      let charName = getRandomElement(Prize.cardPool[this.rarity]);
      Character.find(charName).increaseCards(this.count);
      node.appendChild(this.createNode(charName));
    }
  }

  earn() {
    if (this.reward == "crypto") {
      player.earnCrypto(this.count);
    } else if (this.reward == "gem") {
      player.earnGems(this.count);
    } else {
      let charName = getRandomElement(Prize.cardPool[this.rarity]);
      Character.find(charName).increaseCards(this.count);
    }
    game.earnedPrizePage = true;
  }

  static cardPool = {
    common: ["Angie", "Sunny"],
    rare: ["Hazel", "Nicoletta"],
    epic: ["Troy"],
    legendary: ["Dad"],
    relic: ["Mom"],
  };
}

let options = {
  spacing: 10,

  acceleration: 350,

  fps: 40,

  audio: "assets/audio/click.wav",

  selector: ":scope > *",

  stopCallback: function ({ detail: { prize } }) {
    // console.log("stop");
    // console.log(`Selected prize index is: ${prize.index}`);
    Prize.getByIndex(Prize.rewardListTemplate, prize.index).setAsCurrentPrize();
    game.earnedPrizePage = true;
  },

  startCallback: function ({ detail: { prize } }) {
    // console.log("start");
    Prize.getByIndex(Prize.rewardListTemplate, prize.index).setAsCurrentPrize();
    // console.log(player.currentPrize)
    hardPause(4000);
    setTimeout(() => {
      player.currentPrize.earn();
    }, 4000);
  },
};

const prizes = Prize.rewardListTemplate.length;
const rouletteNode = document.querySelector(".preview__roulette.roulette");

Prize.rewardListTemplate.forEach((reward) => {
  let el = reward.createNode();
  rouletteNode.appendChild(el);
});

let roulette = new Roulette(".roulette", options);

function startRoulette() {
  let prizeList = Prize.rewardListTemplate;
  let prize = Prize.getFairPrize(prizeList);
  let index = prize.getIndex(prizeList);
  roulette.rotateTo(index, { tracks: 1, random: false });
}

function stopRoulette() {
  roulette.stop();
}

function reSpinRoulette() {
  if (player.spendGems(50)) game.earnedPrizePage = false;
}

var scrollAnimationBlocks = [];

var scrollTriggerBlocks = [];

function updateScrollAnimationBlocks() {
  if (game.mode.toLowerCase() == "renjs") return;
  scrollAnimationBlocks = document.querySelectorAll(
    "#regularPassage .scrollableDiv [data-animate-block]"
  );
}

function updateScrollTriggerBlocks() {
  if (game.mode.toLowerCase() == "renjs") return;

  scrollAnimationBlocks = document.querySelectorAll(
    "#regularPassage .scrollableDiv [data-trigger-block]"
  );
}

if (!game.scrollAnimationsAbsolute)
  setRootCSSVariable("--data-animate-initial", 1);

function animateOnScroll() {
  if (game.mode.toLowerCase() == "renjs") return;

  if (!game.scrollAnimationsAbsolute) return;
  scrollAnimationBlocks = document
    .querySelector("#regularPassage .scrollableDiv")
    .querySelectorAll("[data-animate-block]:not(.ss-animated)");
  var viewportHeight = window.innerHeight;
  if (!scrollAnimationBlocks.length) return;
  // Function to handle the animation logic
  let scrollY = document.querySelector(
    "#regularPassage .scrollableDiv"
  ).scrollTop;
  scrollAnimationBlocks.forEach(function (current) {
    // Calculate position within #passage
    const passageRect = document
      .querySelector("#regularPassage .scrollableDiv")
      .getBoundingClientRect();
    const elementTop =
      current.getBoundingClientRect().top - passageRect.top + scrollY;
    const triggerTop = elementTop + viewportHeight * 0.2 - viewportHeight;
    const blockHeight = current.offsetHeight;
    const blockSpace = triggerTop + blockHeight;
    const isViewed = scrollY > triggerTop;
    const isAnimated = current.classList.contains("ss-animated");

    // Check if the element is initially visible in the first viewport height
    const isInitiallyVisible = current.offsetTop < viewportHeight;

    if ((isViewed || isInitiallyVisible) && !isAnimated) {
      anime({
        targets: current,
        opacity: [0, 1],
        translateY: [100, 0],
        delay: anime.stagger(200, { start: 200 }),
        duration: 800,
        easing: "easeInOutCubic",
        begin: function (anim) {
          current.classList.add("ss-animated");
        },
      });
    }
  });

  // Listen for scroll events on the #passage element

  // Initial check for elements in the first viewport height
}

function triggerOnScroll() {
  scrollTriggerBlocks = document
    .querySelector("#regularPassage .scrollableDiv")
    .querySelectorAll("[data-trigger-block]:not(.ss-triggered)");
  var viewportHeight = window.innerHeight;
  if (!scrollTriggerBlocks.length) return;
  // Function to handle the animation logic
  let scrollY = document.querySelector(
    "#regularPassage .scrollableDiv"
  ).scrollTop;
  scrollTriggerBlocks.forEach(function (current) {
    // Calculate position within #passage
    const passageRect = document
      .querySelector("#regularPassage .scrollableDiv")
      .getBoundingClientRect();
    const elementTop =
      current.getBoundingClientRect().top - passageRect.top + scrollY;
    const triggerTop = elementTop - viewportHeight;
    if (triggerTop < 0) triggerTop = 0;
    const blockHeight = current.offsetHeight;
    const isViewed = scrollY > triggerTop;
    const isTriggered = current.classList.contains("ss-triggered");

    // Check if the element is initially visible in the first viewport height
    const isInitiallyVisible = current.offsetTop < viewportHeight;

    if ((isViewed || isInitiallyVisible) && !isTriggered) {
      current.classList.add("ss-triggered");
      console.log("triggered and called " + current.innerHTML);
      Label.call(current.innerHTML);
    }
  });
}
// if (game.scrollAnimationsAbsolute)
//   document
//     .querySelector("#regularPassage .scrollableDiv")
//     .addEventListener("scroll", animateOnScroll);

// document
//   .querySelector("#regularPassage .scrollableDiv")
//   .addEventListener("scroll", triggerOnScroll);

// if (game.devMode) {
//   game.init = true;
//   game.restart(true);
// }
function resetPressedButtons() {
  vm.isCtrlPressed = false;
  vm.isMetaPressed = false;
  vm.isSpacePressed = false;
  vm.isEnterPressed = false;

  vm.isSpaceKilled = false;
  vm.isEnterKilled = false;

  renjs.handleKeyDownOrUp();
}

setPageHeight();

window.addEventListener("resize", () => {
  setPageHeight();
});

const dialogueBox = document.getElementById("dialogueBox");

var typewriter = new Typewriter(dialogueBox, {
  loop: false,
  delay: settings.typingSpeed,
  deleteSpeed: 0,
});

// if (game.devMode) {
//   game.mainMenu = false;
// }

// chat_1();
// Theodora_1_6();

function updateKeyState(event, isPressed) {
  if (
    (event.key === "Control" && !vm.isCtrlPressed) ||
    (event.key === "Meta" && !vm.isMetaPressed)
  ) {
    // console.log("triggered no ctrl clicks");
    const links = document.querySelectorAll("a");

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
        }
      });
    });
  }
  if (event.key === "Escape") fullScreenOff();
  if (event.key === "Control") vm.isCtrlPressed = isPressed;

  if (event.key === "Meta") vm.isMetaPressed = isPressed;

  if (event.key === " " || event.key === "Spacebar") {
    vm.isSpacePressed = isPressed;
    if (!isPressed) vm.isSpaceKilled = false;
  }
  if (event.key === "Enter") {
    vm.isEnterPressed = isPressed;

    if (!isPressed) vm.isEnterKilled = false;
  }
  renjs.handleKeyDownOrUp();
}

document.addEventListener("keydown", (event) => {
  if (!game.init) {
    game.init = true;
    return;
  }
  const key = event.key.toLowerCase();
  if (!game.keyPresses) {
    return;
  }
  if (key === "s") {
    saveMenu();
  } else if (key === "m") {
    mainMenu();
  } else if (key === "f") {
    toggleFullScreen(true);
  } else if (key === "p") {
    settingsMenu();
  } else if (key === "c") {
    game.start();
  } else if (game.mainMenu) {
    return;
  }

  updateKeyState(event, true);
});

document.addEventListener("keyup", (event) => {
  updateKeyState(event, false);
});

document.addEventListener("visibilitychange", resetPressedButtons);
window.addEventListener("blur", resetPressedButtons);

Character.setChats();

console.log();

Save.load();

RenJS.disableLinksInNewTabs();

var characterOrder = [Blossom, Penny, Piper, Evelyn];

function checkVersion() {
  const x = localStorage.getItem(game.title + game.version);

  if (x != "true") {
    Save.reset();
  }
}

function updateFrame() {
  const frame = document.getElementById("gameFrame");
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  if (maxWidth > 1199 || maxWidth > maxHeight) {
    frame.style.width = `100%`;
    frame.style.height = `100%`;
    return;
  }
  const aspectRatio = 16 / 9;

  let width = maxWidth;
  let height = width / aspectRatio;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  frame.style.width = `${width}px`;
  frame.style.height = `${height}px`;
}

function updateIphoneScale() {
  const BASE_HEIGHT = 1517.76;
  const BASE_WIDTH = 745.25;

  const container = document.querySelector(".iphone-container");
  const wrapper = document.querySelector(".iphone-frame-wrapper");

  if (!container || !wrapper) return;

  const containerHeight = container.clientHeight;

  const scale = containerHeight / BASE_HEIGHT;

  document.documentElement.style.setProperty("--iphone-scale", scale);

  document.documentElement.style.setProperty("--iphone-scale", scale);

  wrapper.style.width = `${BASE_WIDTH * scale}px`;
  wrapper.style.height = `${BASE_HEIGHT * scale}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!game.electron) return;

  window.electronAPI.onFullscreenStatusChanged((status) => {
    settings.fullScreen = status;
    console.log("Fullscreen status changed:", status);
  });

  window.electronAPI.getFullscreenStatus().then((status) => {
    settings.fullScreen = status;
    console.log("Initial fullscreen status:", settings.fullScreen);
  });
});

window.addEventListener("load", updateIphoneScale);

window.addEventListener("resize", updateIphoneScale);

window.addEventListener("resize", updateFrame);

window.addEventListener("load", updateFrame);

checkVersion();

Settings.load();

Settings.fullScreen = false;

Settings.save();

vm.game = game;
RenJS.fullScreenTracker();

const grandPatreonCode = "Premium Supporter";

document.addEventListener("contextmenu", function (event) {
  if (!settings.rightClickSave) {
    return;
  }
  event.preventDefault();
  saveMenu();
});
