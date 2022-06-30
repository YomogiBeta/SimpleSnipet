import {TextDocument} from "vscode"
export type SnipetData = {
  keyword: string,
  document: TextDocument
}
export type Snipet = {
  [language: string]: Array<SnipetData>
}