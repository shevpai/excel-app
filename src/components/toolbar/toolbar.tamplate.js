function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <div 
      class="button ${button.active ? 'active' : ''}"
      ${meta}
    >
      <i class="material-icons" ${meta}>${button.icon}</i>
    </div>
  `
}


function createToolbarTextAlign(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'}
    }    
  ]
  return buttons.map(toButton).join('')
}

function createToolTextStyles(state) {
  const buttons = [
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
    },
    {
      icon: 'strikethrough_s',
      active: state['textDecoration'] === 'line-through',
      value: {textDecoration: state['textDecoration'] === 'line-through' ? 'none' : 'line-through'}
    }
  ]
  return buttons.map(toButton).join('')
}


function createColorPic(state) {
  return `
    <div class="button colorpicker tip">
      <span>Text Color</span>
      <label class="material-icons" for="text-color">colorize</label>
      <input
        id="text-color" 
        type="color" 
        value=${state.color || '#ff0000'}
        data-type="text-color"
      > 
    </div>
    <div class="button colorpicker tip">
      <span>Fill</span>
      <label class="material-icons" for="text-color">format_paint</label>
      <input
        id="background-color" 
        type="color" 
        value=${state.backgroundColor || '#f8f9fa'}
        data-type="background-color"
      > 
    </div>`
}

function createFontSizeChanger(state) {
  console.log(state)
  return `
    <div class="font-size">
      <select data-type="font-size">
        <option value="6px" ${state.fontSize === '6px' ? 'selected="selected"' : ''}>6</option>
        <option value="7px" ${state.fontSize === '7px' ? 'selected="selected"' : ''}>7</option>
        <option value="8px" ${state.fontSize === '8px' ? 'selected="selected"' : ''}>8</option>
        <option value="9px" ${state.fontSize === '9px' ? 'selected="selected"' : ''}>9</option>
        <option value="10px" ${state.fontSize === '10px' ? 'selected="selected"' : ''}>10</option>
        <option value="11px" ${state.fontSize === '11px' ? 'selected="selected"' : ''}>11</option>
        <option value="12px" ${state.fontSize === '12px' ? 'selected="selected"' : ''}>12</option>
        <option value="14px" ${state.fontSize === '14px' ? 'selected="selected"' : ''}>14</option>
        <option value="16px" ${state.fontSize === '16px' ? 'selected="selected"' : ''}>16</option>
        <option value="18px" ${state.fontSize === '18px' ? 'selected="selected"' : ''}>18</option>
        <option value="20px" ${state.fontSize === '20px' ? 'selected="selected"' : ''}>20</option>
        <option value="22px" ${state.fontSize === '22px' ? 'selected="selected"' : ''}>22</option>
        <option value="24px" ${state.fontSize === '24px' ? 'selected="selected"' : ''}>24</option>
        <option value="26px" ${state.fontSize === '26px' ? 'selected="selected"' : ''}>26</option>
        <option value="28px" ${state.fontSize === '28px' ? 'selected="selected"' : ''}>28</option>
        <option value="32px" ${state.fontSize === '32px' ? 'selected="selected"' : ''}>32</option>
        <option value="36px" ${state.fontSize === '36px' ? 'selected="selected"' : ''}>36</option>
      </select>
    </div>
  `
}


export function createToolbar(state) {
  return (`
      ${createToolbarTextAlign(state)}
      ${createFontSizeChanger(state)}
      ${createToolTextStyles(state)}
      ${createColorPic(state)}
    `)
}