class RenJS {
  constructor() {
    this.className = "RenJS";
    // this.labels = RenJS.getFunctionNames().map((name) => new Label(name));
    this.defaultTypingSpeed = 20;
    this.isTyping = false;

    this.stepNum = 0;
    this.sequence = [null];

    this.manualSave = false;

    this.pasteText = "";

    this.timeoutMessages = [];
  }

  static baseConsoleLog() {
    // console.clear();
    console.log("%c 🕹️ RenJSₗᵢₜ active", "color: #970fff");
    console.log("%c 👁 Do not modify the game", "color: #060606");
    console.log(
      `%c 😍 ${game.title} and RenJSₗᵢₜ created by ~Liturgy`,
      "color: #ff0000"
    );
  }

  newSequence() {
    this.sequence = [null];
    this.stepNum = 0;
  }

  static openInNewTab(url) {
    if (url) {
      if (game.electron) {
        window.electronAPI.openInNewTab(url);
        return;
      }
      window.open(url, "_blank");
    } else {
      console.error("No URL provided.");
    }
  }

  static getDollarFunctions() {
    return Object.keys(window)
      .filter((key) => typeof window[key] === "function" && key.startsWith("$"))
      .map((key) => window[key]);
  }

  static getGlobalFunctionByName(name) {
    return typeof globalThis[name] === "function" ? globalThis[name] : null;
  }

  static getFunctionNames(functionArray = []) {
    if (!functionArray || !functionArray.length)
      return RenJS.getDollarFunctions().map((fn) => fn.name);
    return functionArray.map((fn) => fn.name);
  }

  skipMessageTimeouts() {
    let cumulativeDelay = 0;
    this.timeoutMessages.forEach((timeoutMessage) => {
      clearTimeout(timeoutMessage.timeoutRef);
      setTimeout(() => {
        Chat.processMessage(timeoutMessage.charName, timeoutMessage.message);
      }, cumulativeDelay);
      cumulativeDelay += 200;
    });
    this.timeoutMessages = [];
  }

  clearTimeoutMessages() {
    this.timeoutMessages.forEach((timeoutMessage) => {
      clearTimeout(timeoutMessage.timeoutRef);
    });
    this.timeoutMessages = [];
  }

  type(text) {
    if (!settings.typewriterEnabled) {
      this.clearTypewriter(text);
      return;
    }
    this.pasteText = text;
    this.isTyping = true;
    this.resetTypewriter();
    typewriter
      .typeString(text)
      .callFunction(() => {
        this.isTyping = false;
      })
      .start();
  }

  static disableLinksInNewTabs(className = "") {
    document.addEventListener("click", function (event) {
      const link = event.target.closest(
        "a" + (className ? `.${className}` : "")
      );
      if (link && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        console.log(
          `Opening links in a new tab is disabled${
            className ? " for this link" : ""
          }.`
        );
      }
    });
  }

  paste(text) {
    this.pasteText = text;
    this.resetTypewriter();
    typewriter.pasteString(text).start();
  }

  finishTyping() {
    typewriter.stop();
    this.isTyping = false;
    this.clearTypewriter(this.pasteText);
  }

  resetTypewriter() {
    typewriter = new Typewriter(dialogueBox, {
      loop: false,
      delay: settings.typingSpeed,
      deleteSpeed: 0,
    });
  }

  static replaceNameWith(input, originalName, replacementName) {
    // Matches text within '' or "" to skip those parts
    const quotedRegex = /(['"])(.*?)\1/g;

    // Matches the original name with potential suffixes (repeated letters or punctuation)
    const regex = new RegExp(`\\b${originalName}(\\w*|[^a-zA-Z]*)`, "gi");

    // Temporary storage for quoted sections to protect them during replacement
    const quotes = [];

    // Temporarily replace quoted sections with placeholders
    const tempInput = input.replace(
      quotedRegex,
      (match, quoteChar, quotedText) => {
        quotes.push(match); // Store the entire match
        return `@@QUOTED_${quotes.length - 1}@@`; // Placeholder
      }
    );

    // Replace occurrences of originalName outside quotes
    const result = tempInput.replace(regex, (match, suffix) => {
      let replacement = replacementName;

      if (suffix) {
        if (/^[a-zA-Z]+$/.test(suffix)) {
          // Handle repeated letters
          const repeatChar = suffix[0];
          replacement += repeatChar.repeat(suffix.length);
        } else {
          // Handle punctuation or other suffixes
          replacement += suffix;
        }
      }

      return replacement;
    });

    // Restore quoted sections
    return result.replace(/@@QUOTED_(\d+)@@/g, (_, index) => quotes[index]);
  }

  static replaceMainCharacterNames(text) {
    if (player.name != game.mainCharName)
      text = RenJS.replaceNameWith(text, game.mainCharName, player.name);

    if (game.supportiveName)
      text = RenJS.replaceNameWith(
        text,
        game.supportiveName,
        player.supportiveName
      );

    if (game.supportive2Name)
      text = RenJS.replaceNameWith(
        text,
        game.supportive2Name,
        player.supportive2Name
      );
    return text;
  }

  clearTypewriter(text = "") {
    dialogueBox.querySelector(".Typewriter__wrapper").innerHTML = text;
  }

  currentStep() {
    this.nextStep(this.stepNum);
  }

  nextStep(num = this.stepNum + 1) {
    // console.log("triggered next step");
    if (game.mainMenu) {
      this.stopSkipping();
      return;
    }
    if (this.isTyping) {
      this.finishTyping();
    } else {
      if (this.sequence.length > num) {
        this.stepNum = num;
        this.sequence[this.stepNum].push();
      }
    }
  }

  prevStep() {
    if (this.isTyping) {
      this.finishTyping();
    } else {
      if (this.stepNum > 0) {
        this.stepNum -= 1;
        sequence[this.stepNum].call("pull");
      }
    }
  }

  appendSequence(input) {
    if (Array.isArray(input)) {
      this.sequence = this.sequence.concat(input);
    } else {
      throw new Error("Input: " + input + " is neither an array or a string.");
    }
  }

  appendStep(step) {
    if (!(variable instanceof Step)) {
      throw new Error(step + " is not a Step object");
    } else {
      this.sequence.push(step);
    }
  }

  appendLabel(someFunction) {
    var labelName;
    if (typeof someFunction === "string") {
      labelName = someFunction;
    } else {
      labelName = someFunction.name;
    }
    const label = Label.find(labelName);
    var str;
    if (!label) {
      console.log("No str for label " + label);
      str = label.call();
    } else {
      str = label.getStr().trim();
    }
    if (label.isScene) {
      labelName = replaceAllChars(labelName, "$", "");
      globalImagesFolder = picTemplate(
        `assets/images/labels/${capitalizeFirstLetter(
          labelName[0]
        )}/${labelName.replace(/_/g, "/")}`
      );
    }

    if (label.imagesFolder) {
      globalImagesFolder = label.imagesFolder;
    }

    const sequence = [];
    let vscene = "",
      funcs = [],
      charName = "",
      charPic = "",
      charColor = "",
      charAct = "",
      word = "",
      text = "",
      menu = "";

    let remainingStr = str;

    while (remainingStr.trim().length > 0) {
      const firstNonWhitespaceIndex = remainingStr.search(/\S/);
      const currentChar = remainingStr[firstNonWhitespaceIndex];

      if (!currentChar) {
        return sequence;
      }

      if (currentChar !== '"' && currentChar !== "{" && currentChar !== "[") {
        word = Passage.getFirstWord(remainingStr);
        let act = "";
        let obj;

        if (word[0] == "$") {
          remainingStr = remainingStr.replace(word, "");
          this.appendLabel(word);
          continue;
        }

        if (word.includes("(")) {
          obj = Passage.extractBySeparators(remainingStr, "(", ")");
          act = obj.result;
          remainingStr = obj.str;
          word = Passage.getFirstWord(remainingStr);
        }
        remainingStr = remainingStr.replace(word, "").trim();
        obj = Passage.extractBySeparators(remainingStr, '"', '"');
        remainingStr = obj.str;

        if (word === "image" || word === "video") {
          vscene = getSceneByType(word, act, obj.result);
        } else {
          charName = capitalizeFirstLetter(word);
          charAct = act;
          charPic = Character.find(charName)?.pic || "";
          charColor = Character.find(charName)?.color || "#FFFFFF";
          text = obj.result;
        }
      } else if (currentChar === "{") {
        const obj = Passage.extractBySeparators(remainingStr, "{", "}");
        funcs.push(obj.result);
        remainingStr = obj.str;
      } else if (currentChar === "[") {
        let obj = Passage.extractBySeparators(remainingStr, "[", "]");
        let args = Passage.splitArguments(obj.result);

        let arr2 = args.map((arg) => {
          let { key, value } = Passage.extractKeyValuePair(arg);
          return [key, value];
        });

        text = Passage.menuLinkArr(arr2);
        remainingStr = obj.str;
      } else if (currentChar === '"') {
        const obj = Passage.extractBySeparators(remainingStr, '"', '"');
        remainingStr = obj.str;
        text = obj.result;
      }

      if (text) {
        let step = new Step(
          label.name,
          charName,
          charAct,
          text,
          vscene,
          funcs,
          menu
        );
        this.sequence.push(step);

        (vscene = ""),
          (funcs = []),
          (charName = ""),
          (charPic = ""),
          (charColor = ""),
          (charAct = ""),
          (word = ""),
          (text = ""),
          (menu = "");
      }
    }

    label.traversed = true;
  }
  static copyProperties(target, source) {
    if (typeof target !== "object" || target === null) {
      throw new TypeError("Target must be a non-null object.");
    }
    if (typeof source !== "object" || source === null) {
      throw new TypeError("Source must be a non-null object.");
    }

    Object.keys(source).forEach((key) => {
      target[key] = source[key];
    });

    return target;
  }

  static isFullScreenChangePossible() {
    if (game.electron) {
      return true;
    }
    const isRequestFullscreenSupported = !!(
      document.documentElement.requestFullscreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.msRequestFullscreen
    );

    const isExitFullscreenSupported = !!(
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen
    );

    const isFullscreenChangeEventSupported = !!(
      "onfullscreenchange" in document ||
      "onwebkitfullscreenchange" in document ||
      "onmsfullscreenchange" in document
    );

    return (
      isRequestFullscreenSupported &&
      isExitFullscreenSupported &&
      isFullscreenChangeEventSupported
    );
  }

  static onFullScreenChange() {
    if (document.fullscreenElement) {
      settings.fullScreen = true;
    } else {
      settings.fullScreen = false;
    }

    Settings.save();
  }

  static fullScreenTracker() {
    document.addEventListener("fullscreenchange", RenJS.onFullScreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      RenJS.onFullScreenChange
    );
    document.addEventListener("msfullscreenchange", RenJS.onFullScreenChange);
  }

  skip(bufferTime = 0) {
    if (game.mainMenu || game.roulette) return;
    player.skipping = true;

    if (player.cheatMode) {
      const intervalId = setInterval(() => {
        this.nextStep();
        if (!player.skipping || !vm.isCtrlPressed || !vm.isMetaPressed) {
          clearInterval(intervalId);
          player.skipping = false;
        }
      }, bufferTime);
      renjs.skipMessageTimeouts();
    }
  }

  static skip(bufferTime = 0) {
    if (!vm.isCtrlPressed || !vm.isMetaPressed) {
      player.skipping = false;
      return;
    }
    player.skipping = true;

    if (player.cheatMode) {
      const intervalId = setInterval(() => {
        this.nextStep();
        if (!player.skipping) {
          clearInterval(intervalId);
        }
      }, bufferTime);
    }
  }

  stopSkipping() {
    player.skipping = false;
  }

  handleKeyDownOrUp() {
    if (vm.isCtrlPressed || vm.isMetaPressed) {
      this.skip();
    } else {
      this.stopSkipping();
    }

    if (
      (vm.isSpacePressed && !vm.isSpaceKilled) ||
      (vm.isEnterPressed && !vm.isEnterKilled)
    ) {
      vm.isSpaceKilled = true;
      vm.isEnterKilled = true;
      this.nextStep();
    }
  }
}

registerClass("RenJS", RenJS);

class Step {
  constructor(
    labelName = "",
    charName = "",
    charAct = "",
    text = "",
    vscene = "",
    functionStrings = [],
    menu = []
  ) {
    this.className = "Step";
    this.labelName = labelName;
    this.traversed = this.getLabel().traversed;
    this.charName = charName;
    this.charAct = charAct;

    this.charColor = "";
    this.charPic = "";

    this.text = text;
    this.vscene = vscene;
    this.functionStrings = functionStrings;
    this.save = null;
    this.menu = menu;
    this.objType = "Step";
    if (this.charName) {
      const character = Character.find(this.charName);
      if (character) {
        this.charName = character.displayName;
        this.charColor = character.color;
        this.charPic = character.pic;
      }
    }
  }

  getLabel() {
    return Label.find(this.labelName);
  }

  call(type = "push") {
    game.msgr = false;
    player.label = this.getLabel();
    if (this.functionStrings.length) {
      if (type === "push") {
        if (!this.manualSave) Save.save(); //save before executing
        Passage.processFunctionStringArray(this.functionStrings);
      } else {
        Save.load(); //load and go back one step immediately, the step with the function is always skipped while rolling back
        this.prevStep();
      }
    }

    updateVMCharName(this.charName);
    player.charAct = this.charAct;
    player.charColor = this.charColor;
    player.charPic = this.charPic;

    player.charAct = this.charAct;
    player.charColor = this.charColor;
    player.charPic = this.charPic;

    this.text = RenJS.replaceMainCharacterNames(this.text);
    if (this.text) {
      renjs.clearTypewriter();
      if (type == "push") {
        renjs.type(this.text);
      } else {
        renjs.paste(this.text);
      }
    }
    if (this.vscene) {
      player.vscene = this.vscene;
      player.vscene = this.vscene;
      if (player.vscene.includes(".webm") || player.vscene.includes(".mp4")) {
        player.video.active = true;
      } else {
        player.video.active = false;
        player.saveImg = this.vscene;
      }
    }
    if (this.menu) {
    }
    Save.save();

    //call next step  when displaying an image or calling a function
  }

  push() {
    this.call("push");
  }

  pull() {
    this.call("pull");
  }
}

registerClass("Step", Step);
