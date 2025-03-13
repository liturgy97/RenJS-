class Save {
  //   constructor(name = "") {
  //     this.name = name;
  //     this.className = "Save";
  //     this.player = new Player();
  //     this.renjs = new RenJS();
  //     this.image = player.saveImg;
  //     this.dateStr = getCurrentTimeStr();
  //   }

  static bindClassNameToObj(obj) {
    if (obj && typeof obj === "object") {
      if (Array.isArray(obj)) {
        obj.forEach((element) => {
          Save.bindClassNameToObj(element);
        });
      } else {
        const className = Save.isObjectClassNameInRegistry(obj);
        if (className) {
          obj.className = className;
        }
        Object.values(obj).forEach((value) => {
          Save.bindClassNameToObj(value);
        });
      }
    }
    return obj;
  }

  static ObjectDifference(obj1, obj2) {
    function findDifference(o1, o2) {
      let diff = {};
      let className = "";
      if (Save.hasClassName(o1)) {
        className = o1.className;
      }
      const keys = new Set([...Object.keys(o1), ...Object.keys(o2)]);

      for (let key of keys) {
        if (!(key in o1)) {
          continue;
        }
        if (!(key in o2)) {
          diff[key] = o1[key];
          continue;
        }

        const val1 = o1[key];
        const val2 = o2[key];

        if (Array.isArray(val1) && Array.isArray(val2)) {
          if (!areArraysDeeplySimilar(val1, val2)) {
            diff[key] = val1;
          }
        } else if (
          typeof val1 === "object" &&
          val1 !== null &&
          typeof val2 === "object" &&
          val2 !== null
        ) {
          const nestedDiff = findDifference(val1, val2);
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        } else if (val1 !== val2) {
          diff[key] = val1;
        }
      }
      if (className) diff.className = className;
      return diff;
    }

    function areArraysDeeplySimilar(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        const val1 = arr1[i];
        const val2 = arr2[i];

        if (
          typeof val1 === "object" &&
          val1 !== null &&
          typeof val2 === "object" &&
          val2 !== null
        ) {
          if (!Save.areObjectsSimilar(val1, val2)) {
            return false;
          }
        } else if (val1 !== val2) {
          return false;
        }
      }
      return true;
    }

    return findDifference(obj1, obj2);
  }

  static ObjectSum(obj1, obj2) {
    function mergeObjects(o1, o2) {
      const result = Array.isArray(o2) ? [] : o2;

      const keys = new Set([...Object.keys(o1), ...Object.keys(o2)]);

      for (let key of keys) {
        const val1 = o1[key];
        const val2 = o2[key];

        // If key exists only in obj2, take its value
        if (!(key in o1)) {
          result[key] = val2;
          continue;
        }

        // If key exists only in obj1, take its value
        if (!(key in o2)) {
          result[key] = val1;
          continue;
        }

        // If both values are arrays, merge them deeply
        if (Array.isArray(val1) && Array.isArray(val2)) {
          result[key] = mergeArrays(val1, val2);
        }
        // If both values are objects, merge them deeply
        else if (
          typeof val1 === "object" &&
          val1 !== null &&
          typeof val2 === "object" &&
          val2 !== null
        ) {
          result[key] = mergeObjects(val1, val2);
        } else {
          // If key exists in both but values are primitives, take obj1's value
          result[key] = val1;
        }
      }

      return result;
    }

    function mergeArrays(arr1, arr2) {
      const length = Math.max(arr1.length, arr2.length);
      const result = [];
      for (let i = 0; i < length; i++) {
        const val1 = arr1[i];
        const val2 = arr2[i];

        if (val1 === undefined) {
          result.push(val2); // Take value from arr2 if arr1 doesn't have it
        } else if (val2 === undefined) {
          result.push(val1); // Take value from arr1 if arr2 doesn't have it
        } else if (
          typeof val1 === "object" &&
          val1 !== null &&
          typeof val2 === "object" &&
          val2 !== null
        ) {
          result.push(mergeObjects(val1, val2)); // Deep merge if both are objects
        } else {
          result.push(val1); // Take obj1's value if there's a conflict
        }
      }
      return result;
    }

    return mergeObjects(obj1, obj2);
  }

  static isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  static areObjectsSimilar(obj1, obj2) {
    return Save.isObjectEmpty(Save.ObjectDifference(obj1, obj2));
  }

  static getObjectClass(obj) {
    if (obj === null) {
      return "null";
    }

    if (obj === undefined) {
      return "undefined";
    }

    if (obj.constructor && obj.constructor.name) {
      return obj.constructor.name;
    }

    if (Array.isArray(obj)) {
      return "Array";
    }

    if (typeof obj === "object") {
      return "Object";
    }

    return typeof obj;
  }

  static isObjectClassNameInRegistry(obj) {
    const className = Save.getObjectClass(obj);
    return className in classRegistry ? className : null;
  }

  static isConstructedObject(obj) {
    return obj.constructor && obj.constructor.name;
  }

  static hasClassName(obj) {
    return obj.hasOwnProperty("className") && obj.className;
  }

  static createObjByClassName(str) {
    if (classRegistry[str]) {
      return new classRegistry[str]();
    } else {
      throw new Error(`Class "${str}" not found.`);
    }
  }

  //   static restoreObject(obj) {
  //     if (!obj) return;
  //     const { className } = obj;
  //     console.log(className);
  //     const template =
  //       className && classRegistry[className]
  //         ? Save.createObjByClassName(className)
  //         : {};
  //     return Save.ObjectSum(obj, template);
  //   }

  static reduceObject(obj) {
    const { className } = obj;
    const template =
      className && classRegistry[className]
        ? Save.createObjByClassName(className)
        : {};
    return Save.ObjectDifference(obj, template);
  }

  static objectUnion(obj1, obj2) {
    const result = obj2;

    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        result[key] = obj1[key];
      }
    }

    return result;
  }

  static restoreObject(element) {
    if (typeof element !== "object" || element === null) {
      return element; // Return unchanged if not an object or array.
    }

    if (Array.isArray(element)) {
      return element.map((item) => Save.restoreObject(item));
    }

    if (element.className && classRegistry[element.className]) {
      const template = Save.createObjByClassName(element.className);
      element = Save.objectUnion(element, template);
    }

    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        element[key] = Save.restoreObject(element[key]);
      }
    }
    return element;
  }

  static savePair(obj) {
    if (!Save.hasClassName(obj)) {
      return { className: "", data: obj };
    }

    return {
      className: obj.className,
      data: Save.ObjectDifference(
        obj,
        Save.createObjByClassName(obj.className)
      ),
    };
  }

  static getSaveFromLocalStorage(n = 0) {
    return localStorage.getItem(Save.saveKey(n));
  }

  static getLocalStorageSize() {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const keySize = key.length;
        const valueSize = localStorage.getItem(key).length;
        totalSize += keySize + valueSize;
      }
    }
    const sizeInMB = totalSize / (1024 * 1024);
    return `${sizeInMB.toFixed(2)} MB`;
  }

  static clearLocalStorageItem(key) {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    } else {
      alert(`No item found in localStorage with the key "${key}".`);
    }
  }

  static reset(hard = true) {
    player = new Player();
    renjs = new RenJS();
    game = new Game();
    if (hard) {
      localStorage.clear();
      localStorage.setItem(game.title + game.version, "true");
      console.log("Reset Local Storage");
    }
    Object.assign(vm.$data, vm.$options.data.call(vm));
  }

  static saveKey(n) {
    return `${game.title}Save${n}`;
  }

  static save(n = 0) {
    const saveData = {};

    player.imagesFolder = globalImagesFolder;
    saveData.renjs = renjs;

    if (game.premium) player.patreonCode = "Premium Supporter";
    saveData.player = player;

    saveData.image = player.saveImg;
    saveData.dateStr = getCurrentTimeStr();

    let key = Save.saveKey(n);

    if (localStorage.getItem(key)) Save.clearLocalStorageItem(key);

    saveToLocalStorage(key, saveData);
  }

  static load(n = 0) {
    const loadedData = Save.restoreObject(
      loadFromLocalStorage(Save.saveKey(n))
    );
    // console.log(loadedData);
    if (!loadedData || !loadedData.player) return;
    player = loadedData.player;
    renjs = loadedData.renjs;
    if (player.patreonCode == "Premium Supporter") {
      game.premium = true;
      game.correctGameVersion();
    }

    vmReset();
    globalImagesFolder = player.imagesFolder;

    Save.save();
  }
}

registerClass("Save", Save);
