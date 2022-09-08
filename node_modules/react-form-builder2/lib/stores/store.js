"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _beedle = _interopRequireDefault(require("beedle"));

var _requests = require("./requests");

var _saveUrl;

var _onPost;

var _onLoad;

var store = new _beedle["default"]({
  actions: {
    setData: function setData(context, data, saveData) {
      context.commit('setData', data);
      if (saveData) this.save(data);
    },
    load: function load(context, _ref) {
      var _this = this;

      var loadUrl = _ref.loadUrl,
          saveUrl = _ref.saveUrl,
          data = _ref.data;
      _saveUrl = saveUrl;

      if (_onLoad) {
        _onLoad().then(function (x) {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach(function (y) {
              return x.push(y);
            });
          }

          _this.setData(context, x);
        });
      } else if (loadUrl) {
        (0, _requests.get)(loadUrl).then(function (x) {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach(function (y) {
              return x.push(y);
            });
          }

          _this.setData(context, x);
        });
      } else {
        this.setData(context, data);
      }
    },
    create: function create(context, element) {
      var data = context.state.data;
      data.push(element);
      this.setData(context, data, true);
    },
    "delete": function _delete(context, element) {
      var data = context.state.data;
      data.splice(data.indexOf(element), 1);
      this.setData(context, data, true);
    },
    updateOrder: function updateOrder(context, elements) {
      var newData = elements.filter(function (x) {
        return x && !x.parentId;
      });
      elements.filter(function (x) {
        return x && x.parentId;
      }).forEach(function (x) {
        return newData.push(x);
      }); // console.log('setAsChild', newData);

      this.setData(context, newData, true);
    },
    save: function save(data) {
      if (_onPost) {
        _onPost({
          task_data: data
        });
      } else if (_saveUrl) {
        (0, _requests.post)(_saveUrl, {
          task_data: data
        });
      }
    }
  },
  mutations: {
    setData: function setData(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.data = payload;
      return state;
    }
  },
  initialState: {
    data: []
  }
});

store.setExternalHandler = function (onLoad, onPost) {
  _onLoad = onLoad;
  _onPost = onPost;
};

var _default = store;
exports["default"] = _default;