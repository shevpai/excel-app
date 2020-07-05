import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_TABLE_HEADER, CURRENT_STYLE, APPLY_STYLE } from "./types";

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

export function changeStyles(styles) {
  return {
    type: CURRENT_STYLE,
    payload: styles
  }
}

// data = val, ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    payload: data
  }
}