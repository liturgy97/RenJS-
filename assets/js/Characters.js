class Character {
  constructor(
    name = "",
    color = "#FFFFFF",
    messenger = false,
    chatTimestamp = ""
  ) {
    this.className = "Character";
    this.name = capitalizeFirstLetter(name);
    this.lastName = "";
    this.displayName = name;

    this.pic = this.getPic();
    this.color = color;
    this.messenger = messenger;
    this.chat = new Chat(this.name);
    this.chat.history = [];
    // console.log(this.chat.history);
    this.online = false;
    this.lastMessageDate = new Date();
    this.lastMessageText = "";
    this.timestamp = chatTimestamp;
    this.notificationNum = 0;
    this.addToAll();
  }

  getTruncatedName() {
    return this.lastName
      ? `${this.name} ${getNameInitial(this.lastName)}`
      : this.name;
  }

  setChatHistory(chatHistoryStr) {
    this.chat.history = Chat.processString(chatHistoryStr, this.name);
  }

  static assignDates(arr) {
    if (arr.length === 0) return;

    let currentTime = new Date();

    arr[0].lastMessageDate = new Date(
      currentTime.getTime() - (arr.length + 1) * 24 * 60 * 60 * 1000 // Convert days to milliseconds
    );

    for (let i = 1; i < arr.length; i++) {
      arr[i].lastMessageDate = new Date(
        arr[i - 1].lastMessageDate.getTime() + 24 * 60 * 60 * 1000
      );
    }
  }

  static find(name) {
    name = capitalizeFirstLetter(name);

    return globalThis[name];
  }
  static findCurrent() {
    return Character.find(player.messaging);
  }
  getLastMessage() {
    return this.chat.history[this.chat.history.length - 1];
  }

  changeStat(statType, val) {
    let statVal = Number(this[statType]);
    val = Number(val);
    let lvl = Number(this[statType + "Lvl"]);
    let levelUp = false;
    let newVal = statVal + val;
    if (newVal < 0) {
      newVal = 0;
    } else if (newVal >= Stat.getMaxStatPerLevel(lvl)) {
      levelUp = this.LevelUp(statType);
      newVal = Number(this[statType]);
    }

    this[statType] = newVal;
    return levelUp;
  }

  equals(obj2) {
    return this.name == obj2.name;
  }

  in(arr) {
    let met = false;
    arr.forEach((element) => {
      if (this.equals(element)) {
        met = true;
        return;
      }
    });
    return met;
  }

  getDisplayName() {
    return this.displayName;
  }

  getPic() {
    return `assets/images/characters/${this.name}.jpg`;
  }

  appendChatHistory(arr) {
    const charName = this.name.split(" ")[0];
    arr.forEach((message) => {
      this.chat.history.push(message);
      Chat.addMessageToNode(charName, message);
    });
  }

  setAsMessenger() {
    const charName = this.name.split(" ")[0];
    player.messaging = charName;
    if (charName == "Darryl") {
      vm.DarrylNotifNum = 0;
    }

    if (charName == "Dream") {
      vm.DreamNotifNum = 0;
    }

    player.chatAvatarAddress = `assets/images/characters/${charName}.jpg`;
    player.chatOnline = true;
  }

  addChatNotif() {
    this.notificationNum++;
  }

  setLastMessage(message) {
    if (message.type == "center") return;
    if (message.text && !message.text.includes("storyLink")) {
      this.lastMessageText = message.text;
      if (!game.mainMenu) {
        this.lastMessageText = RenJS.replaceMainCharacterNames(
          this.lastMessageText
        );
      }
    }
  }

  appendBotSequence(arr) {
    const validMessages = arr.filter((message) => message instanceof Message);

    this.chat.history.push(...validMessages);

    if (validMessages.length > 0) {
      Chat.botResponseArr(this.name, validMessages);
    }
  }

  removeLastMessage() {
    const charName = this.name.split(" ")[0];
    this.chat.history.pop();
    const container = Chat.getMsgArea(charName);
    // console.log(container)
    const messages = container.querySelectorAll(".msg");

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // console.log('message removed, messaging ' + charName)
      lastMessage.remove();
    }
  }

  appendChat(str) {
    this.appendChatHistory(Chat.processString(str, this.name));
  }

  appendBot(str) {
    this.appendBotSequence(Chat.processString(str, this.name));
  }

  static sort(list = player.messengers()) {
    list = list.sort((a, b) => b.lastMessageDate - a.lastMessageDate);
    return list;
  }

  setOnline() {
    this.online = true;
  }

  chatWarning(text) {
    Chat.addMessageToNode(
      this.name,
      new Message("", `<span class='limitWarningTimed'>${text}</span>`)
    );
  }

  setOffline() {
    this.online = false;
  }

  static setOnline(...args) {
    const onlineSet = new Set(args);

    for (const character of player.messengers()) {
      character.online = onlineSet.has(character.name);
    }
  }

  addToAll() {
    if (!Character.All.includes(this)) {
      Character.All.push(this);
    }
  }

  static allNames() {
    return Character.All.map(({ name }) => name);
  }

  static messengers() {
    return Character.All.filter((character) => character.messenger);
  }

  static switchMessenger(charName) {
    let character = Character.find(charName);
    player.messaging = character.name;
    character.notificationNum = 0;
  }
  clearNode() {
    Chat.getMsgArea(this.name).innerHTML = "";
  }
  static clearAllNodes() {
    player.messengers().forEach((character) => {
      character.clearNode();
    });
  }

  static setChats() {
    Character.clearAllNodes();

    player.messengers().forEach((character) => {
      const {
        name,
        chat: { history },
      } = character;

      Chat.appendArrayToNode(name, history);
    });

    player.sortMessengers();
  }

  static All = [];
}

registerClass("Character", Character);
var Luke = new Character("Luke", "#FF9999");
var Blossom = new Character("Blossom", "#FFD700");
var Lucio = new Character("Lucio", "#FFFFFF");

var Louie = new Character("Louie", "#D890D8");
var Devon = new Character("Devon", "#A3FFD1");
var Samantha = new Character("Samantha", "#7DBDE8");

var Piper = new Character("Piper", "#A5FFFF");
var Evelyn = new Character("Evelyn", "#e0aaff");

var Penny = new Character("Penny", "#90EE90");

var Jack = new Character("Jack", "#255F38");
var Tom = new Character("Tom", "#205781");
