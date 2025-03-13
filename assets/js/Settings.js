class Settings {
  constructor() {
    this.className = "Settings";
    this.fullScreen = false;
    if (game.electron) this.fullScreen = true;
    this.fullScreenAsk = true;
    this.typewriterEnabled = true;
    this.typingSpeed = 20;
    this.fontSize = 18;
    this.audioEnabled = true;
    this.sfxVolume = 100;
    this.musicVolume = 100;
    this.musicTracks = ["bgMusic", "slow-danger"];
    this.currentMusicTrack = "bgMusic";

    this.highlightPremiumChoices = false;
    this.rightClickSave = true;

    this.textBoxStyle = "CC";
    this.charImage = true;
  }
  static save() {
    saveToLocalStorage("settings", settings);
    // console.log("saved");
  }

  static load() {
    // console.log("Settings loaded");

    const storedSettings = loadFromLocalStorage("settings");
    if (!storedSettings) {
      console.log("No saved settings");
      return;
    }

    settings = Save.restoreObject(storedSettings);

    if (game.electron) settings.fullScreen = true;

    vm.settings = settings;
  }

  static reset() {
    settings = new Settings();
    if (game.electron) {
      fullScreenOn();
    }
    vm.settings = settings;
  }

  static setSFXVolume(volume = settings.sfxVolume) {
    settings.sfxVolume = volume;
    enJin.audioController.setSFXVolume(settings.sfxVolume);
    Settings.save();
  }
  static setMusicVolume(volume = settings.musicVolume) {
    settings.musicVolume = volume;
    console.log("here");
    settings.musicTracks.forEach((track) => {
      enJin.audioController.setVolume(track, settings.musicVolume);
    });

    Settings.save();
  }

  static audioToggle() {
    enJin.audioController.globalMuteToggle();
    Settings.save();
  }

  static setTextBoxStyle(value = "CC") {
    settings.textBoxStyle = value;
  }
}

registerClass("Settings", Settings);
