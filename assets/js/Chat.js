class Chat {
  constructor(name = "") {
    this.className = "Chat";

    this.name = name;
    this.history = [];

    this.charLeft = name;
    this.charRight = "Luke";
    this.lastMessageDate = new Date();
  }

  getCharacter() {
    Character.find(this.name);
  }

  static find(name) {
    return this.getCharacter(name).chat;
  }

  static MsgrChatNode = document.querySelector(".msgr-popup .msger .msgr-chat");

  static clearMsgrChatArea(charName) {
    Chat.getMsgArea(charName).innerHTML = "";
  }

  static getMsgArea(charName) {
    return document.querySelector(
      `.msgr-popup .msger .msger-chat .msger-chat-area.${charName}`
    );
  }

  static addMessageToNode(charName, message) {
    const msgArea = Chat.getMsgArea(charName);

    if (message instanceof Message) {
      const messageNode = message.createMessageNode();
      msgArea.appendChild(messageNode);

      const char = Character.find(charName);
      char.setLastMessage(message);
      msgArea.scrollTop += 500;
      vm.scrollToBottom(charName);
      if (player.messaging !== charName) vm.scrollAllMessengersAbsolute();
    } else {
      goLabel(message);
    }
  }

  static appendArrayToNode(charName, arr) {
    const msgArea = Chat.getMsgArea(charName);
    const fragment = document.createDocumentFragment(); // document fragment for batch DOM insertion
    let lastMessage = null;
    arr.forEach((message) => {
      const messageNode =
        message instanceof Message ? message.createMessageNode() : null;
      if (messageNode) {
        fragment.appendChild(messageNode);
        lastMessage = message;
      }
    });

    msgArea.appendChild(fragment);

    if (lastMessage) {
      let character = Character.find(charName);
      character.setLastMessage(lastMessage);
    }
  }

  static botResponseArr(charName, messages, isDelay = true) {
    const character = Character.find(charName);
    let cumulativeDelay = 0;

    messages.forEach((message, index) => {
      let delay = isDelay ? cumulativeDelay : 0;
      if (isDelay) {
        cumulativeDelay +=
          calculateReadingTime(message.text) + (message.imageNum ? 3000 : 0);
      }
      const timeoutRef = setTimeout(() => {
        this.processMessage(charName, message);
        renjs.timeoutMessages = renjs.timeoutMessages.filter(
          (t) => t.timeoutRef !== timeoutRef
        );
      }, delay);

      renjs.timeoutMessages.push({
        timeoutRef: timeoutRef,
        charName: charName,
        message: message,
      });
    });
  }

  static processMessage(charName, message) {
    if (message.func) {
      goLabel(message.func);
      return;
    }
    let character = Character.find(charName);
    character.setLastMessage(message);
    character.lastMessageDate = new Date();
    Chat.addMessageToNode(charName, message);
    Character.sort();
    if (player.messaging !== charName && message.type != "center")
      character.notificationNum++;
  }

  static createLinkHTML(text, charName, labelName) {
    const isTraversed = Label.find(labelName).isTraversed;
    const sanitizedLabel = Passage.sanitizeSingleQuotes(labelName);
    var func = `Character.find('${capitalizeFirstLetter(
      charName
    )}').removeLastMessage(); goLabel('${sanitizedLabel}')`;
    let extra = "";
    if (hasPremiumPattern(text)) {
      text = Passage.removePremiumPattern(text);
      extra = crownInline();

      if (game.premium && !settings.highlightPremiumChoices) {
        extra = "";
      }

      if (!game.premium) {
        return `<p>${text} ${extra}</p>`;
      }
    }

    if (hasComingSoonPattern(text)) {
      text = Passage.removeComingSoonPattern(text);
      extra = `(Coming Soon)`;
      return `<p>${text} ${extra}</p>`;
    }

    const linkHTML = `<a class="storyLink ${
      isTraversed ? "traversedLink" : ""
    }" href="#" onclick="${func}">${text}</a>${extra}`;
    return `<p>${linkHTML}</p>`;
  }

  static link(text, charName, labelName) {
    return new Message(
      "Luke",
      Chat.createLinkHTML(text, charName, labelName),
      "",
      "",
      text
    );
  }

  static linkArr(arr, charName) {
    const linkInnerHTML = arr
      .map(([text, labelName]) =>
        Chat.createLinkHTML(text, charName, labelName)
      )
      .join("");
    return new Message("Luke", linkInnerHTML, "", "");
  }

  static linkInline(text, charName, labelName, isScene = true) {
    return Chat.createLinkHTML(text, charName, labelName, true);
  }

  static channelsNode = document.querySelector(
    ".msgr-popup .ChannelList .Channels"
  );

  getChannelNode() {
    return document.querySelector(
      ".msgr-popup .ChannelList .Channels .Channel." + this.name
    );
  }

  static getChannelNode(charName) {
    return document.querySelector(
      ".msgr-popup .ChannelList .Channels .Channel." + charName
    );
  }

  static makeCharOnline(charName) {
    Chat.getChannelNode(charName).querySelector(".Online").style.display = "";
  }

  static makeCharOffline(charName) {
    Chat.getChannelNode(charName).querySelector(".Online").style.display =
      "none";
  }

  static makeChatOnline() {
    document.querySelector(
      ".msgr-popup .msger .Header .AccessoriesAvatar .Online"
    ).style.display = "";
  }

  static makeChatOffline() {
    document.querySelector(
      ".msgr-popup .msger .Header .AccessoriesAvatar .Online"
    ).style.display = "none";
  }

  static currentActiveChar = "Dream";

  static activateChannelNode(charName) {
    const nextNode = Chat.getChannelNode(charName);

    const oldNode = Chat.getChannelNode(Chat.currentActiveChar);

    oldNode.classList.add("NotActive");

    oldNode.onclick = function () {
      Chat.activateChannelNode(oldNode);
      console.log(
        "clicked, switched from",
        Chat.currentActiveChar,
        " to ",
        charName
      );
    };

    nextNode.classList.remove("NotActive");
    nextNode.onclick = function () {
      console.log("clicked but doing nothing");
    };

    Chat.currentActiveChar = charName;
  }

  static processString(strOrigin, chatCharName) {
    if (typeof strOrigin !== "string") {
      console.log(strOrigin + " not a string");
      return;
    }
    let str = strOrigin;
    let chat = [];
    // let n = 0;
    let obj;

    while (str.trim().length > 0) {
      // n++;
      const firstNonWhitespaceIndex = str.search(/\S/);
      const c = str[firstNonWhitespaceIndex];

      // If there's no character found, exit the loop
      if (!c) return chat;

      if (c === ":") {
        str = str.replace(":", "").trim();
        continue;
      }

      if (c !== '"' && c !== "[" && c !== "{") {
        let charName = Passage.getFirstWord(str);
        if (!charName) {
          console.log(c, str, Passage.getFirstWord(str));
        } else {
          let partUntilQuote = Passage.firstPartUntilChar(str, '"');
          obj = Passage.extractBySeparators(partUntilQuote, "(", ")");
          let imageNum = obj.result;
          charName = Passage.getFirstWord(obj.str);
          str = str.replace(partUntilQuote, "").trim();
          charName = capitalizeFirstLetter(charName.replaceAll(":", ""));

          obj = Passage.extractBySeparators(str, '"', '"');
          chat.push(
            new Message(capitalizeFirstLetter(charName), obj.result, imageNum)
          );
          str = obj.str;
        }
      } else if (c === "[") {
        let obj = Passage.extractBySeparators(str, "[", "]");
        let args = Passage.splitArguments(obj.result);

        let arr2 = args.map((arg) => {
          let { key, value } = Passage.extractKeyValuePair(arg);
          return [key, value];
        });

        chat.push(Chat.linkArr(arr2, chatCharName));
        str = obj.str;
      } else if (c === "{") {
        obj = Passage.extractBySeparators(str, "{", "}");
        chat.push(new Message("", "", "", "", obj.result));
        str = obj.str;
      } else if (c === '"') {
        obj = Passage.extractBySeparators(str, '"', '"');
        chat.push(new Message("", obj.result));
        str = obj.str;
      }

      // Safety check to prevent infinite loops
      if (str.trim().length === strOrigin.trim().length) {
        console.warn("Potential infinite loop detected, stopping execution.");
        break;
      }

      // if (n == 100) {
      //   console.log(str);
      //   return chat;
      // }
    }

    return chat;
  }
}

registerClass("Chat", Chat);

class Message {
  constructor(charName = "", text = "", imageNum = "", vidNum = "", func = "") {
    this.className = "Message";
    this.charName = charName;
    this.imagesFolder = globalImagesFolder;
    this.imageNum = imageNum;
    this.vidNum = vidNum;
    this.text = text;

    this.func = func;

    this.type = charName === "Luke" ? "right" : charName ? "left" : "center";
  }

  getImageOuterHTML() {
    if (!this.imageNum) return "";
    return `<image class="chatImage" src="${this.imagesFolder}/${this.imageNum}.jpg">`;
  }

  getVideoOuterHTML() {
    if (!this.vidNum) return "";
    return `<video class="chatImage" src="${this.imagesFolder}/${this.vidNum}.webm">`;
  }

  static originType(messageOrigin) {
    if (messageOrigin.char == "Luke") return "right";
    return "left";
  }

  getType() {
    if (this.charName == "Luke") return "right";
    if (!charName) return "center";
    return "left";
  }

  createMessageNode() {
    const node = Node.create(`msg ${this.type}-msg`);
    // if (this.type == "center" && !this.text) {
    //   this.text = getDateTextRelativeToToday(player.time.date, this.time.date);
    // }

    let msgImg = `<div class="msg-img" style="background-image: url(assets/images/characters/${this.charName}.jpg)"></div>`;

    if (this.type == "center") msgImg = "";

    let text = this.text;
    text = RenJS.replaceMainCharacterNames(text);
    node.innerHTML = `
          ${msgImg}
    
          <div class="msg-bubble">
              ${this.getImageOuterHTML()}
              ${this.getVideoOuterHTML()}
    
            <div class="msg-text">
              ${text}
            </div>
          </div>
          
          `;

    return node;
  }
}

registerClass("Message", Message);
