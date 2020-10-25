function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;
  return `
    <div 
      class="button ${button.active ? "active" : ""}"
      ${meta}
    >
      <i class="material-icons" ${meta}>${button.icon}</i>
    </div>
  `;
}

function createOptions(state) {
  const fontSizeArr = [
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    32,
    36,
  ];

  const options = fontSizeArr.map((size) => {
    return `      
      <option value="${size}px" ${
      state.fontSize === size + "px" ? 'selected="selected"' : ""
    }>${size}</option>
    `;
  });

  return options.join("");
}

function createToolbarTextAlign(state) {
  const buttons = [
    {
      icon: "format_align_left",
      active: state["textAlign"] === "left",
      value: { textAlign: "left" },
    },
    {
      icon: "format_align_center",
      active: state["textAlign"] === "center",
      value: { textAlign: "center" },
    },
    {
      icon: "format_align_right",
      active: state["textAlign"] === "right",
      value: { textAlign: "right" },
    },
  ];
  return buttons.map(toButton).join("");
}

function createToolTextStyles(state) {
  const buttons = [
    {
      icon: "format_bold",
      active: state["fontWeight"] === "bold",
      value: { fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold" },
    },
    {
      icon: "format_italic",
      active: state["fontStyle"] === "italic",
      value: {
        fontStyle: state["fontStyle"] === "italic" ? "normal" : "italic",
      },
    },
    {
      icon: "format_underlined",
      active: state["textDecoration"] === "underline",
      value: {
        textDecoration:
          state["textDecoration"] === "underline" ? "none" : "underline",
      },
    },
    {
      icon: "strikethrough_s",
      active: state["textDecoration"] === "line-through",
      value: {
        textDecoration:
          state["textDecoration"] === "line-through" ? "none" : "line-through",
      },
    },
  ];
  return buttons.map(toButton).join("");
}

function createColorPic(state) {
  return `
    <div class="button colorpicker tip">
      <span>Text Color</span>
      <label class="material-icons" for="text-color">colorize</label>
      <input
        id="text-color" 
        type="color" 
        value=${state.color || "#ff0000"}
        data-type="text-color"
      > 
    </div>
    <div class="button colorpicker tip">
      <span>Fill</span>
      <label class="material-icons" for="text-color">format_paint</label>
      <input
        id="background-color" 
        type="color" 
        value=${state.backgroundColor || "#f8f9fa"}
        data-type="background-color"
      > 
    </div>`;
}

function createFontSizeChanger(state) {
  return `
      <div class="font-size">
        <select data-type="font-size">
          ${createOptions(state)}
        </select>
      </div>  
    `;
}

export function createToolbar(state) {
  return `
      ${createToolbarTextAlign(state)}
      ${createFontSizeChanger(state)}
      ${createToolTextStyles(state)}
      ${createColorPic(state)}
    `;
}
