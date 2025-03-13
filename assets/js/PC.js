class PC {
  constructor() {
    this.className = "PC";

    this.menuBarItems = ["File", "Edit", "View", "Go", "Window", "Help"];

    let dockItemsBase = [
      "Finder",
      "Safari",
      "Messages",
      "Mail",
      "Maps",
      "Photos",
      "App Store",
      "Notes",
    ];

    this.dockItems = {};
    dockItemsBase.forEach((item) => {
      this.dockItems[item] = {
        name: item,
        open: false,
        minimized: false,
      };
    });
  }
}

registerClass("PC", PC);

var pc = new PC();
