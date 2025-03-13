function goMsgr() {
  msgrOn();
}

function $city() {
  game.resetPopup();
  game.popup.h2 = "City";
  game.popup.p2 = `The game's map is still under development. More updates on Patreon soon`;
  game.popup.pic = "assets/images/buildings/City/City.jpg";

  game.popup.open = true;
}

function $outsideResidence() {
  player.subLocation = "Overview";
}

function $goToHall() {
  player.subLocation = "Hall";
}

function $goToHall() {
  player.subLocation = "Hall";
}

function $enterRoom(roomName = "") {
  let text = "I should check on Nicoletta first. She said it was serious.";

  if (player.var("episode2TalkedToNicoletta")) {
    text = "I gotta talk to Angie.";
  }

  let text2 = `Troy came back from work and just came out of the shower. It's like he's living here these days. 
  Hazel is almost melting in front of him—as always. Though I'm not sure who's more 
  smitten with him anymore, Hazel or Nicoletta. Dad passed by and winked at Troy.`;

  if (player.var("checkedTroyAndHazel")) {
    text2 = "";
  }
  game.resetPopup();
  game.popup.h2 = roomName;

  if (roomName == "My Room") {
    game.popup.p1 = `Natalie is cleaning my old room.`;
    game.popup.p2 = text;
    game.popup.pic = "assets/images/recurring/Natalie-cleaning.jpg";

    game.popup.open = true;
  } else if (roomName == "Living Room") {
    player.vars.checkedTroyAndHazel = true;
    Save.save();

    game.popup.p1 = text2;
    game.popup.p2 = text;
    game.popup.pic = "assets/images/recurring/Hazel-Troy.jpg";

    game.popup.open = true;
  } else if (roomName == "Angie's Room") {
    if (!player.var("episode2TalkedToNicoletta")) {
      game.popup.p1 = "Angie's door is closed.";
      game.popup.p2 = text;
      game.popup.pic = "assets/images/recurring/angie-door-closed.jpg";

      game.popup.open = true;
    } else {
      ADVOn();
      appendLabelAndPush("$Angie_1");
    }
  } else if (roomName == "Master Bedroom") {
    if (player.var("episode2TalkedToNicoletta")) {
      game.popup.p1 = "I already spoke with Nicoletta.";
      game.popup.p2 = text;
      game.popup.pic = "assets/images/recurring/Nicoletta.jpg";

      game.popup.open = true;
    } else {
      ADVOn();
      appendLabelAndPush("$Nicoletta_1");
    }
  } else {
    player.subLocation = "RoomInterior";

    player.roomName = roomName;
  }
}

function FyodorResidence_Hall() {
  player.location = "Fyodor Residence";
  player.subLocation = "Hall";
}

function goRoulette(labelName = "", animation = true) {
  let delay = 0;
  if (animation) {
    delay = 1500;
    game.showBackgroundVideo();
  }

  setTimeout(() => {
    game.roulette = true;
    if (labelName) goLabel(labelName);
  }, delay);
}

function $episode2_sandbox() {
  sandboxOn();
  player.subLocation = "Overview";
}
$episode2_sandbox.executable = true;

function $episode2_sandbox_2() {
  sandboxOn();
  player.subLocation = "Hall";
}
$episode2_sandbox_2.executable = true;

function stat_change(charName, statType, val) {
  //   if (charName == "player" || !charName) {
  //     val = Number(val);
  //     if (statType == "cash") {
  //       let title = `Earned Money`;
  //       let titleColor = "green";
  //       let name = "Cash +" + val;
  //       if (val < 0) {
  //         title = "Spent Money";
  //         titleColor = "red";
  //         name = "Cash " + val;
  //       }
  //       let description = "";
  //       let currentCash = Number(player.cash);
  //       let newVal = currentCash + val;
  //       if (newVal < 0) {
  //         throw new Error("Cash is " + currentCash + ". Can't spend " + val);
  //       }
  //       player.changeCash(val);
  //       game.showNotification(
  //         title,
  //         titleColor,
  //         name,
  //         description,
  //         "assets/svg/stats/cash.png"
  //       );
  //     }
  //     return;
  //   }
  //   let character = Character.find(charName);
  //   //   console.log(val);
  //   val = Number(val);
  //   let isLevelUp = character.changeStat(statType, val);
  //   let title = `Stat increase`;
  //   let titleColor = "green";
  //   if (val < 0) {
  //     title = `Stat decrease`;
  //     titleColor = "red";
  //   }
  //   statType = capitalizeFirstLetter(statType);
  //   let name = `${statType} +${val}`;
  //   if (val < 0) name = `${statType} ${val}`;

  //   let description = "";
  //   if (isLevelUp)
  //     description =
  //       character.getFirstName() +
  //       statType +
  //       "level increased to " +
  //       character.level;
  //   game.showNotification(
  //     title,
  //     titleColor,
  //     name,
  //     description,
  //     character.getPic()
  //   );
  // }
  return "";
}

function chat_change_crypto(val = "-1", successLabelName, linkText) {
  val = Number(val);
  let char = Character.find(player.messaging);
  if (player.changeCrypto(val)) {
    cryptoNotification(val);
    goLabel(successLabelName);
  } else {
    linkText = Passage.removeSpendOptionsFromLink(linkText);
    Chat.addMessageToNode(
      char.name,
      new Message(
        "",
        `<span class='limitWarningTimed'>Not enough crypto</span>`
      )
    );
    Chat.addMessageToNode(char.name, new Message("Luke", linkText));
  }
}

function chat_change_gems(val = "-50", successLabelName) {
  val = Number(val);
  let char = Character.find(player.messaging);
  if (player.changeGems(val)) {
    char.removeLastMessage();

    gemsNotification(val);
    goLabel(successLabelName);
  } else {
    linkText = Passage.removeSpendOptionsFromLink(char.getLastMessage().text);
    char.removeLastMessage();
    Chat.addMessageToNode(
      char.name,
      new Message("", `<span class='limitWarningTimed'>Not enough gems</span>`)
    );
    Chat.addMessageToNode(char.name, new Message("Luke", linkText));
  }
}

function chat_premium_check(successLabelName) {
  char = Character.findCurrent();
  if (player.cheatMode) {
    char.removeLastMessage();

    goLabel(successLabelName);
  } else {
    linkText = Passage.removePremiumOptionsFromLink(char.getLastMessage().text);
    console.log(linkText);
    char.removeLastMessage();
    Chat.addMessageToNode(
      char.name,
      new Message(
        "",
        `<span class='limitWarningTimed'>Premium mode required</span>`
      )
    );
    Chat.addMessageToNode(char.name, new Message("Luke", linkText));
  }
}

function normal_change_gems(val = "-50", successLabelName) {
  val = Number(val);
  let char = Character.find(player.messaging);
  if (player.changeGems(val)) {
    char.removeLastMessage();

    gemsNotification(val);
    goLabel(successLabelName);
  } else {
    linkText = Passage.removeSpendOptionsFromLink(char.getLastMessage().text);
    char.removeLastMessage();
    Chat.addMessageToNode(
      char.name,
      new Message("", `<span class='limitWarningTimed'>Not enough gems</span>`)
    );
    Chat.addMessageToNode(char.name, new Message("Luke", linkText));
  }
}

function chat_change_currency(str, successLabelName) {
  let split = str.trim().split(" ");
  if (split[1] == "gems") chat_change_gems(split[0], successLabelName);
  if (split[1] == "crypto") chat_change_crypto(split[0], successLabelName);
}

function normal_change_currency(str, successLabelName) {
  let split = str.trim().split(" ");
  if (split[1] == "gems") normal_change_gems(split[0], successLabelName);
  if (split[1] == "crypto") normal_change_crypto(split[0], successLabelName);
}

function activate_chat_nav(labelName) {
  const node = document.querySelector(
    ".msgr-popup .ChannelList .Header #ChatMenuButton"
  );
  node.classList.add("pulse-animation");
  node.onclick = function () {
    node.classList.remove("pulse-animation");
    node.onclick = function () {};
    goScene(labelName);
  };
}

function story_spend(type, val = 1, successLabelName) {
  if (type == "gems") {
    if (player.changeGems(val)) {
      Label.call(successLabelName);
    } else {
      Story.buttonWarning();
    }
  }

  if (type == "crypto") {
    if (player.changeCrypto(val)) {
      Label.call(successLabelName);
    } else {
      Story.buttonWarning();
    }
  }
}

function switchTab(fullName, tabID) {
  let obj;
  if (!fullName.includes("_")) {
    obj = Building.getByName(fullName);
  } else {
    obj = Room.getByName(fullName);
  }

  obj.currentTab = tabID;
}

function goldButton() {}

function city() {}

function goLocation(buildingName, roomName = "Hall") {
  // const fullName = `${simplifyLocationName(
  //   buildingName
  // )}_${simplifyLocationName(roomName)}`;

  player.location = buildingName;

  if (["Hall", "Overview"].includes(roomName)) {
    player.subLocation = roomName;
    return;
  }

  $enterRoom(roomName);
}

function $Ep1_End() {
  globalImagesFolder = "assets/images/posters";
  player.episode = 2;

  return `
  image "episode1-1-1"
  "This is the end of Blunder #1: Message Your Girlfriend At Work."
  [
  (Start Episode 2: $Ep2_start),
  (Go back to Main Menu: endGame)
  ]

`;
}

function $Ep2_End() {
  globalImagesFolder = "assets/images/posters";
  player.episode = 1;

  return `
  image "episode2-1-1"
  "This is the end of Blunder #2: Make your home their home."
  [
  (Go back to Main Menu: endGame),
  (Visit Patreon: openPatreonLink)
  ]

`;
}
