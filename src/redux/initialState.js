import { defaultStyles } from "../constants";
import { clone } from "../core/utils";

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: "",
  headerState: "",
  currentStyles: { ...defaultStyles },
  lastViewed: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentText: "",
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
