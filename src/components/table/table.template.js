import { toInlineStyles, parse } from "../../core/utils";
import { defaultStyles } from "../../constants";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = "120px";
const DEFAULT_HEIGHT = "30px";

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return state.colState[index] ? state.colState[index] + "px" : DEFAULT_WIDTH;
}

function getHeight(state, index) {
  return state.rowState ? state.rowState[index] + "px" : DEFAULT_HEIGHT;
}

function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state, index),
    };
  };
}

function toColumn({ col, index, width }) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}" 
      style="width: ${width}" 
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state, col);
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
    <div class="cell" 
      contenteditable 
      spellcheck="false" 
      data-type="cell"
      data-col="${col}" 
      data-id="${id}"
      data-value="${data || ""}"
      style="${styles}; width: ${width}; white-space: normal;"
    >
      ${parse(data) || ""}
    </div>
  `;
  };
}

function createRow(index, content, state) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  const height = getHeight(state, index);
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${index}" 
      style="height: ${height}"
    >
      <div class="row-info">
        ${index ? index : ""}
        ${resize}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `;
}

export function createTable(rowsCount, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join("");

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(toCell(state, row))
      .join("");
    rows.push(createRow(row + 1, cells, state));
  }

  return rows.join("");
}
