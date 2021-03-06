import { Router } from "./Router";
import { Page } from "../page/Page";
import { ActiveRoute } from "./ActiveRoute";

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement("div");
    root.innerHTML = "dashboard";
    return root;
  }
}

class ExcelPage extends Page {
  getRoot() {
    const root = document.createElement("div");
    root.innerHTML = "excel";
    return root;
  }
}

describe("Router", () => {
  let router;
  let $root;

  beforeEach(() => {
    $root = document.createElement("div");
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    });
  });

  test("should be defined", () => {
    expect(router).toBeDefined();
    expect(DashboardPage).toBeDefined;
    expect(ExcelPage).toBeDefined;
    expect(ActiveRoute).toBeDefined;
  });

  test("should render Dashboard page", () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        router.changePageHandler();
      }, 500);

      setTimeout(() => {
        expect($root.innerHTML).toBe("<div>dashboard</div>");
        expect($root.innerHTML).not.toBe("<div>excel</div>");
        resolve();
      }, 1000);
    });
  });
});
