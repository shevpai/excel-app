import { $ } from "@core/dom";
import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { shouldResize, isCell, matrix, nextSelector } from "./table.function";
import { TableSelection } from "./TableSelection";
import { defaultStyles } from "../../constants";
import * as actions from "@/redux/actions";
import { parse } from "../../core/utils";

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      subscribe: ["colState", "rowState"],
      ...options,
    });
    this.rowsCount = 50;
  }

  toHTML() {
    return createTable(this.rowsCount, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$subscribe("formula:input", (text) => {
      this.selection.current.attr("data-value", text);
      this.selection.current.textContent(parse(text));

      this.updateTextInStore(text);
    });

    this.$subscribe("formula:done", () => this.selection.current.focus());
    this.$subscribe("header:done", () => this.selection.current.focus());

    this.$subscribe("toolbar:applyStyle", (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.ids,
        })
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell.data.value.trim());
    this.$dispatch(
      actions.changeStyles($cell.getStyles(Object.keys(defaultStyles)))
    );
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      throw new Error("Resize error", e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      event.preventDefault();
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else if (event.ctrlKey) {
        this.selection.selectGroupByOne($target);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ["Tab", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id, this.rowsCount));
      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }

  onInput(event) {
    this.$emit("table:input", $(event.target).data.value.trim());
    this.selection.current.attr("data-value", $(event.target).getTC);
    this.updateTextInStore($(event.target).getTC);
  }
}
