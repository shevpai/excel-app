import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_TABLE_HEADER } from "./types";

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    payload: data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    payload: data
  }
}

export function changeHeader(text) {
  return {
    type: CHANGE_TABLE_HEADER,
    payload: text
  }
}

