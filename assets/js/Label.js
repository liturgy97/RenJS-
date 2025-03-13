class Label {
  constructor(name = "") {
    this.className = "Label";
    this.name = Passage.deSanitizeSingleQuotes(name);
    this.traversed = false;

    const func = this.getFunction();
    this.objType = "Label";

    this.msgr = !!func?.msgr;
    this.executable = !!func?.executable;

    this.isScene = !!func?.isScene;

    this.imagesFolder = "";
    if (func && func.imagesFolder) {
      // console.log("update imagesFolder");
      this.imagesFolder = func.imagesFolder;
    }
  }

  getFunction() {
    return RenJS.getGlobalFunctionByName(this.name);
  }

  execute() {
    this.getFunction()();
  }

  getStr() {
    const func = this.getFunction();
    return typeof func === "function" ? func() : "";
  }

  static find(name) {
    // const label = renjs.labels.find((label) => label.name === name);
    const label = null;
    if (!label) {
      // console.log("Couldn't find label " + name + ". Creating a new label.");
      return new Label(name);
    }
    return label;
  }

  find(name) {
    // const label = renjs.labels.find((label) => label.name === name);
    const label = null;

    if (!label) return this;
  }

  getFolder() {
    let replacement = replaceAllChars(this.name, "_", "/");
    return picTemplate("assets/images/labels/" + replacement);
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

  static callFunction(str) {
    return Passage.processFunction(str);
  }

  static call(name) {
    let label = new Label(name);
    label.call();
  }

  call() {
    if (!this.name) return;
    player.label = this;
    vm.currentLabel = player.label.name;

    this.traversed = true;

    let func = Passage.processFunction(this.name);
    updateScrollAnimationBlocks();
    animateOnScroll();
    return func;
  }
}

registerClass("Label", Label);
