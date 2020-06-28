import { observable, runInAction, computed, action, decorate } from "mobx";
import { createBrowserHistory } from "history";
import { matchPath } from "react-router-dom";
import { AppRoutes } from "../App";

export const history = createBrowserHistory();

class UrlStore {
  _url = {
    url: history.location.pathname,
    queryString: history.location.search,
  };

  constructor() {
    history.listen((location) => {
      runInAction("changeUrl", () => {
        this._url = { url: location.location.pathname, queryString: location.location.search };
        // console.log(this.routePath, this.params);
      });
    });
  }

  // computed
  get routePath() {
    return this._matchedPath[0];
  }

  // computed
  get params() {
    const params = this._matchedPath[1];
    return mapValues(params, val => (val ? decodeURIComponent(val) : val));
  }

  // computed
  get _matchedPath() {
    for (const path of Object.values(AppRoutes)) {
      const match = matchPath(this._url.url, { path, exact: true });
      if (match) {
        return [path, match.params];
      }
    }
    throw new Error(`Unknown route ${this._url.url}`);
  }

  //action
  pushUrl(url) {
    if (url.url !== this._url.url) {
      if (url.url !== history.location.pathname + history.location.search) {
        // Update history only if it is not up to date
        history.push(url.url);
        return true;
      }
    }
    return false;
  }
}

function mapValues(obj, fn) {
  const entries = Object.entries(obj).map(([key, val]) => [key, fn(val)]);
  return Object.fromEntries(entries);
}

decorate(UrlStore, {
  _url: observable,
  routePath: computed,
  _matchedPath: computed,
  pushUrl: action,
});

export const urlStore = new UrlStore();
