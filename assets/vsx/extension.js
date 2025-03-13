const vscode = require("vscode");
const fs = require("fs");

let functionsList = [];
let diagnosticCollection;

function activate(context) {
  diagnosticCollection =
    vscode.languages.createDiagnosticCollection("unclosedQuotes");
  updateFunctionList();

  const hoverProvider = vscode.languages.registerHoverProvider("javascript", {
    provideHover(document, position) {
      const wordRange = document.getWordRangeAtPosition(position);
      if (!wordRange) return;

      const word = document.getText(wordRange);
      const matchedFunction = functionsList.find((func) => func.name === word);

      if (matchedFunction) {
        return new vscode.Hover({
          language: "javascript",
          value: matchedFunction.code,
        });
      }
    },
  });

  const definitionProvider = vscode.languages.registerDefinitionProvider(
    "javascript",
    {
      provideDefinition(document, position) {
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) return;

        const word = document.getText(wordRange);
        const matchedFunction = functionsList.find(
          (func) => func.name === word
        );

        if (matchedFunction) {
          return matchedFunction.location;
        }
      },
    }
  );

  vscode.workspace.onDidChangeTextDocument(() => {
    updateFunctionList();
    updateDiagnostics(vscode.window.activeTextEditor.document);
  });

  vscode.workspace.onDidOpenTextDocument((document) => {
    updateDiagnostics(document);
  });

  context.subscriptions.push(
    hoverProvider,
    definitionProvider,
    diagnosticCollection
  );
}

async function updateFunctionList() {
  const jsFiles = await findJavaScriptFiles();
  functionsList = [];

  for (const file of jsFiles) {
    const content = fs.readFileSync(file.fsPath, "utf-8");
    const matches = [
      ...content.matchAll(/function\s+(\$[a-zA-Z0-9_]+)\s*\(.*\)\s*{/g),
    ];

    for (const match of matches) {
      const functionName = match[1];
      const startIndex = match.index || 0;
      const endIndex = content.indexOf("}", startIndex) + 1;
      const code = content.substring(startIndex, endIndex);

      const position = new vscode.Position(
        content.substring(0, startIndex).split("\n").length - 1,
        0
      );

      functionsList.push({
        name: functionName,
        location: new vscode.Location(file, position),
        code,
      });
    }
  }
  console.log("Updated function list: ", functionsList);
}

async function findJavaScriptFiles() {
  return await vscode.workspace.findFiles("**/*.js");
}

// Update diagnostics for unclosed quotes in template literals
function updateDiagnostics(document) {
  if (document.languageId !== "javascript") return;

  const diagnostics = [];
  const text = document.getText();

  // Regex to match template literals
  const templateRegex = /`([^`]*)`/gs;
  let match;

  while ((match = templateRegex.exec(text)) !== null) {
    const templateContent = match[1];
    const templateStart = match.index + 1;

    // Initialize indices for first unclosed quote search
    let unidentifiedQuoteIndex = templateContent.indexOf('"');
    let unidentifiedQuoteIndex2 = -1;

    // Search for unclosed quotes
    while (unidentifiedQuoteIndex !== -1) {
      ({ unidentifiedQuoteIndex, unidentifiedQuoteIndex2 } =
        identifyQuotationAtIndex(
          unidentifiedQuoteIndex,
          unidentifiedQuoteIndex2,
          templateContent,
          templateStart,
          document,
          diagnostics
        ));
    }
  }

  diagnosticCollection.set(document.uri, diagnostics);
}

// Finds unclosed quotes based on rules provided
function identifyQuotationAtIndex(
  unidentifiedQuoteIndex,
  unidentifiedQuoteIndex2,
  str,
  offset,
  document,
  diagnostics
) {
  // Find the next closing quote starting from the last identified opening quote
  if (unidentifiedQuoteIndex2 === -1) {
    unidentifiedQuoteIndex2 = str.indexOf('"', unidentifiedQuoteIndex + 1);
  }

  if (unidentifiedQuoteIndex2 === -1) {
    // No closing quote found, place error at unidentifiedQuoteIndex
    const range = new vscode.Range(
      document.positionAt(offset + unidentifiedQuoteIndex),
      document.positionAt(offset + unidentifiedQuoteIndex + 1)
    );
    diagnostics.push(
      new vscode.Diagnostic(
        range,
        "Unclosed double quote in template literal.",
        vscode.DiagnosticSeverity.Warning
      )
    );
    unidentifiedQuoteIndex = -1;
  } else {
    // Check the line breaks between quotes
    const quoteSegment = str.slice(
      unidentifiedQuoteIndex,
      unidentifiedQuoteIndex2 + 1
    );
    const lineBreakCount = (quoteSegment.match(/\n/g) || []).length;

    if (lineBreakCount <= 3) {
      // If 3 or fewer line breaks, move to the next quote search
      unidentifiedQuoteIndex = str.indexOf('"', unidentifiedQuoteIndex2 + 1);
      unidentifiedQuoteIndex2 = -1;
    } else {
      // More than 3 line breaks, place an error at the first unmatched quote
      const range = new vscode.Range(
        document.positionAt(offset + unidentifiedQuoteIndex),
        document.positionAt(offset + unidentifiedQuoteIndex + 1)
      );
      diagnostics.push(
        new vscode.Diagnostic(
          range,
          "Unclosed double quote in template literal.",
          vscode.DiagnosticSeverity.Warning
        )
      );
      unidentifiedQuoteIndex = unidentifiedQuoteIndex2; // Move the starting point to the second quote
      unidentifiedQuoteIndex2 = -1;
    }
  }

  return { unidentifiedQuoteIndex, unidentifiedQuoteIndex2 };
}

function deactivate() {
  if (diagnosticCollection) {
    diagnosticCollection.dispose();
  }
}

module.exports = {
  activate,
  deactivate,
};
