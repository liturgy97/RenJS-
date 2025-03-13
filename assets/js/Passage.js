class Passage {
  constructor(str) {
    this.str = str;
  }

  p() {
    return Passage.p(this.str);
  }

  static removePremiumOptionsFromLink(text) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    const lines = tempDiv.querySelectorAll("p");

    for (const line of lines) {
      if (hasPremiumPattern(line.outerHTML)) {
        line.remove();
      }
    }

    return tempDiv.outerHTML;
  }

  static removeComingSoonPattern(text) {
    if (hasComingSoonPattern(text)) {
      return text
        .replace("Coming Soon", "")
        .replace("(c)", "")
        .replace("(C)", "")
        .trim();
    }

    return text;
  }

  static removeSpendOptionsFromLink(text) {
    text = text.replace(
      `<img class="inline-icon" src='assets/svg/rewards/crypto.png'>`,
      "crypto"
    );
    text = text.replace(
      `<img class="inline-icon" src='assets/svg/rewards/gem.svg'>`,
      "gems"
    );
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;

    const lines = tempDiv.querySelectorAll("p");

    for (const line of lines) {
      if (line.textContent.match(/-\d+\s*gems/)) {
        line.remove();
        console.log(tempDiv.outerHTML);
        return tempDiv.outerHTML;
      }
    }

    return { str: text, result: null };
  }

  static replaceAllInstances(str, search, replacement) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedSearch, "g");
    return str.replace(regex, replacement);
  }

  static convertToSmartQuotes(text) {
    // Convert single quotes that are not part of words to smart single quotes
    text = text.replace(/(^|\W)'|'(\W|$)/g, "$1’$2");

    // Convert double quotes smartly:
    // 1. Replace double quotes at the start of a word or after a whitespace as opening quotes.
    // 2. Replace double quotes followed by a space or end of line as closing quotes.
    let isOpeningDoubleQuote = true;
    text = text.replace(/"/g, () => {
      if (isOpeningDoubleQuote) {
        isOpeningDoubleQuote = false;
        return "“";
      } else {
        isOpeningDoubleQuote = true;
        return "”";
      }
    });

    return text;
  }

  static convertToHTMLQuotes(text) {
    text = replaceAllChars(text, "’", "&rsquo;");
    text = replaceAllChars(text, "“", "&ldquo;");
    text = replaceAllChars(text, "”", "&rdquo;");
    return text;
  }

  static p(text) {
    return `<p>${text}</p>`;
  }

  static sanitizeSingleQuotes(str) {
    return str.replace(/'/g, "\\'");
  }

  static deSanitizeSingleQuotes(str) {
    return str.replace(/\\'/g, "'");
  }

  static regExSeparator(separator1 = '"', separator2 = '"') {
    // Check if either separator is a square bracket and escape it if so
    const escapeRegex = (char) =>
      char.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");

    // Escape separator characters using the helper function
    const sep1 = escapeRegex(separator1);
    const sep2 = escapeRegex(separator2);

    return new RegExp(`(?<!\\\\)${sep1}([^${sep1}${sep2}\\\\]*)${sep2}`);
  }

  findLargestParenthesesSubstring() {
    return Passage.findLargestParenthesesSubstring(this.str);
  }

  extractFunctionText() {
    return Passage.extractFunctionText(this.str);
  }

  static hasParentheses(input) {
    return input.includes("(");
  }

  static extractFunctionNameAndArgs(input) {
    const match = input.match(/^([a-zA-Z_$][a-zA-Z0-9_$@\.]*)\((.*)\)$/);
    if (!match)
      throw new Error(
        "Invalid input format. Expected format: string1(string2) received " +
          input
      );
    return {
      functionName: match[1], // Extracts function name
      argsString: match[2], // Extracts the argument string
    };
  }

  static splitArguments(argsString) {
    const args = [];
    let currentArg = "";
    let nestedParentheses = 0;
    let insideSingleQuote = false;
    let insideDoubleQuote = false;

    for (let char of argsString) {
      // Handle commas outside of quotes and parentheses
      if (
        char === "," &&
        nestedParentheses === 0 &&
        !insideSingleQuote &&
        !insideDoubleQuote
      ) {
        args.push(currentArg.trim());
        currentArg = "";
      } else {
        currentArg += char;

        // Check if entering or exiting single quote
        if (char === "'" && !insideDoubleQuote) {
          insideSingleQuote = !insideSingleQuote;
        }

        // Check if entering or exiting double quote
        if (char === '"' && !insideSingleQuote) {
          insideDoubleQuote = !insideDoubleQuote;
        }

        // Handle parentheses
        if (char === "(") nestedParentheses++;
        else if (char === ")") nestedParentheses--;
      }
    }

    if (currentArg) args.push(currentArg.trim()); // Add the last argument
    return args;
  }

  static extractFunctionText(input) {
    if (!Passage.hasParentheses(input)) {
      return { functionName: input, args: [] };
    }

    const { functionName, argsString } =
      Passage.extractFunctionNameAndArgs(input);
    const args = Passage.splitArguments(argsString);

    return { functionName, args };
  }

  static extractKeyValuePair(input) {
    const match = input.match(/^\(([^:]+):\s*(.+)\)$/);
    if (!match)
      throw new Error("Invalid input format. Expected format: (str1: str2)");

    const key = match[1].trim();
    const value = match[2].trim();

    return { key, value };
  }

  static isNumber(str) {
    return /^-?\d+(\.\d+)?$/.test(str);
  }

  static menuLinkArr(arr) {
    return arr
      .map(([text, labelName], index) =>
        Passage.createLinkHTML(text, labelName, index !== arr.length - 1)
      )
      .join("");
  }

  static removePremiumPattern(text) {
    if (hasPremiumPattern(text)) {
      return text
        .replace("Premium", "")
        .replace("premium", "")
        .replace("(p)", "")
        .replace("(P)", "")
        .trim();
    }

    return text;
  }
  static createLinkHTML(text, labelName, isInline = false) {
    const isTraversed = Label.find(labelName).isTraversed;
    let extra = "";

    if (hasPremiumPattern(text)) {
      text = Passage.removePremiumPattern(text);
      extra = ` ${crownInline()}`;

      if (game.premium && !settings.highlightPremiumChoices) {
        extra = "";
      }

      if (!game.premium) {
        return `<p style="font-size:20px">${text}${extra}</p>`;
      }
    }

    if (hasComingSoonPattern(text)) {
      text = Passage.removeComingSoonPattern(text);
      extra = ` (Coming Soon)`;

      return `<p style="font-size:20px">${text}${extra}</p>`;
    }

    const sanitizedLabel = Passage.sanitizeSingleQuotes(labelName);
    const func = `appendLabelAndPush('${sanitizedLabel}')`;
    const tagWrapper = isInline ? ["<p>", "</p>"] : ["", ""];

    return `${tagWrapper[0]}<a class="storyLink ${
      isTraversed ? "traversedLink" : ""
    }" href="#" onclick="${func}">${text}</a>${extra}${tagWrapper[1]}`;
  }

  static processArg(str) {
    // Case 1: Check if str is enclosed in single or double quotes
    const singleQuoteMatch = str.match(/^'(.*)'$/);
    const doubleQuoteMatch = str.match(/^"(.*)"$/);
    if (singleQuoteMatch) {
      return singleQuoteMatch[1]; // Return the content inside single quotes
    } else if (doubleQuoteMatch) {
      return doubleQuoteMatch[1]; // Return the content inside double quotes
    }

    // Case 2: Check if str is a number (including integers and decimals)
    if (Passage.isNumber(str)) {
      return parseFloat(str); // Return the number itself (parsed as a float)
    }

    // Case 3: Check if str is in the format str3(str4)
    const functionFormatMatch = str.match(/^(\w+)\(.*\)$/);
    if (functionFormatMatch) {
      return Passage.processFunction(str); // Process the function call
    }

    // Case 4: Return the global variable or constant with name str
    return globalThis[str] || `No global variable named '${str}' found`;
  }

  static processFunction(str) {
    let obj = Passage.extractFunctionText(str);
    const func = window[obj.functionName];
    let args = obj.args;
    if (typeof func !== "function") {
      throw new Error(
        `Function "${obj.functionName}" is not defined or not callable.`
      );
    }

    for (let i = 0; i < args.length; i++) {
      args[i] = Passage.processArg(args[i]);
    }

    // console.log(func, args)

    return func(...args);
  }

  static processFunctionStringArray(arr) {
    arr.map((element) => {
      Passage.processFunction(element);
    });
  }

  static findLargestParenthesesSubstring(str) {
    let maxSubstring = "";
    let stack = [];
    let currentSubstring = "";
    let start = -1;

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") {
        if (stack.length === 0) start = i;
        stack.push(i);
      } else if (str[i] === ")") {
        stack.pop();
        if (stack.length === 0 && start !== -1) {
          currentSubstring = str.slice(start + 1, i);
          if (currentSubstring.length > maxSubstring.length) {
            maxSubstring = currentSubstring;
          }
          start = -1;
        }
      }
    }

    return maxSubstring;
  }

  extractLargestParenthesesSubstring() {
    return Passage.extractLargestParenthesesSubstring(this.str);
  }

  static extractLargestParenthesesSubstring(str) {
    let p = new Passage(str);

    let obj = {
      result: p.extractLargestParenthesesSubstring(),
      str: p.str.replace(`(${this.result})`, ""),
    };

    return obj;
  }

  splitByLargestParentheses() {
    return Passage.splitByLargestParentheses(this.str);
  }

  static splitByLargestParentheses(strOrigin) {
    let p = new Passage(strOrigin);
    let arr = [];
    while (p.str.trim().length > 0) {
      let obj = p.extractLargestParenthesesSubstring();
      arr.push(obj.result);
      p.str = obj.str;
    }
  }

  static extractBySeparators(strOrigin, separator1 = '"', separator2 = '"') {
    let str = strOrigin;
    let result = "";

    const regex = Passage.regExSeparator(separator1, separator2);

    const match = str.match(regex);

    if (!match) {
      // Check if one separator is present but not the other
      const hasSeparator1 = str.includes(separator1);
      const hasSeparator2 = str.includes(separator2);

      if (hasSeparator1 || hasSeparator2) {
        throw new Error(
          `One of the separators (${separator1} or ${separator2}) was found without the other.`
        );
      }
    }

    if (match) {
      result = match[1];
      str = str.replace(match[0], "");
    }
    let obj = {};
    obj.str = str;
    obj.result = result;

    return obj;
  }

  static splitWordsByWhiteSpaces(str) {
    const arr = str.split(/\s+/);

    return arr.filter((word) => word !== "");
  }

  static executeLabelString(str) {
    //functions inside the text must be labels
    // Regular expression to capture function name and arguments, if any
    const regex = /^(\w+)\((.*)\)$/;
    const match = str.match(regex);

    if (match) {
      // Extract the function name and arguments
      const labelName = match[1];
      const argsStr = match[2].trim();
      let args = [];
      if (argsStr) {
        args = argsStr.split(",").map((arg) => arg.trim());
      }
      console.log(labelName, args);

      return Label.call(labelName, args);
    } else {
      console.error(`Invalid function call format: "${str}"`);
    }
    return "";
  }

  static getGlobalVariable(varName) {
    if (typeof globalThis[varName] === "undefined") {
      console.log("Character " + varName + " not found.");
      return undefined;
    }
    return globalThis[varName];
  }

  static getFirstWord(str) {
    const match = str.match(/^\s*(\S+)/);
    return match ? match[1] : null;
  }

  static firstNonWhitespaceCharacter(str) {
    return str.split("").find((char) => char.trim() !== "");
  }

  static firstPartUntilChar(str, char, includeChar = false) {
    const index = str.indexOf(char);
    if (index === -1) return str;
    return includeChar ? str.slice(0, index + 1) : str.slice(0, index);
  }

  static removeWhitespace(str) {
    return str.replace(/\s+/g, "");
  }

  static update(text) {
    updateRegularPassage(Passage.processString(text));
  }

  static append(text) {
    appendRegularPassage(Passage.processString(text));
  }
}
