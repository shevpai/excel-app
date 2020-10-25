export class TableSelection {
  static className = "selected";

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
    this.current = $el;
  }

  clear() {
    this.group.forEach(($cell) => $cell.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup($group) {
    this.clear();
    this.group = $group;
    this.group.forEach(($cell) => $cell.addClass(TableSelection.className));
  }

  selectGroupByOne($el) {
    this.group.push($el);
    this.group.forEach(($cell) => $cell.addClass(TableSelection.className));
  }

  get ids() {
    return this.group.map(($el) => $el.id());
  }

  applyStyle(style) {
    this.group.forEach(($cell) => $cell.css(style));
  }
}
