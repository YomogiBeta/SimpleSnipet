import * as vscode from "vscode"
import { SnipetData } from "./@types/SnipetType"

export default class Completions implements vscode.CompletionItemProvider {
  private snipet: SnipetData[] = []

  constructor(snipet: SnipetData[]) {
    this.snipet = snipet
  }

  public provideCompletionItems(): vscode.ProviderResult<
    vscode.CompletionItem[]
  > {
    const result: vscode.CompletionItem[] = []
    this.snipet.forEach(item => {
      let completion = new vscode.CompletionItem(item.keyword)
      completion.insertText = new vscode.SnippetString(item.document.getText())
      result.push(completion)
    })
    return result
  }
}
