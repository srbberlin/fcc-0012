"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.switchDir = _this.switchDir.bind(_this);
    _this.switchKey = _this.switchKey.bind(_this);
    _this.switchWhich = _this.switchWhich.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: "switchDir",
    value: function switchDir(e) {
      this.props.sort(!this.props.down, null, null);
    }
  }, {
    key: "switchKey",
    value: function switchKey(e) {
      this.props.sort(null, e.target.value, null);
    }
  }, {
    key: "switchWhich",
    value: function switchWhich(e) {
      this.props.sort(null, null, e.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "header" },
        React.createElement(
          "select",
          { onChange: this.switchDir },
          React.createElement(
            "option",
            { value: "down" },
            "Down"
          ),
          React.createElement(
            "option",
            { value: "up" },
            "Up"
          )
        ),
        React.createElement(
          "select",
          { onChange: this.switchKey },
          React.createElement(
            "option",
            { value: "number" },
            "By Number"
          ),
          React.createElement(
            "option",
            { value: "name" },
            "By Name"
          )
        ),
        React.createElement(
          "select",
          { onChange: this.switchWhich },
          React.createElement(
            "option",
            { value: "recent" },
            "Recent"
          ),
          React.createElement(
            "option",
            { value: "alltime" },
            "Alltime"
          )
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var Row = function (_React$Component2) {
  _inherits(Row, _React$Component2);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
  }

  _createClass(Row, [{
    key: "render",
    value: function render() {
      var flag = this.props.flag;
      var user = this.props.user;
      var i = this.props.i;
      var img = user.img;
      var name = user.username;
      var value = flag === 'recent' ? user.recent : user.alltime;
      var colour = i % 2 ? '#eeeeee' : '#ffffff';

      return React.createElement(
        "tr",
        { style: { backgroundColor: colour } },
        React.createElement(
          "td",
          { className: "first" },
          i + 1
        ),
        React.createElement(
          "td",
          { className: "second" },
          React.createElement(
            "a",
            { href: 'https://www.freecodecamp.org/' + name, target: "_blank" },
            React.createElement("img", { onMouseOver: this.props.over, onMouseOut: this.props.out, src: img, style: { height: '20px' } })
          )
        ),
        React.createElement(
          "td",
          { className: "third" },
          name
        ),
        React.createElement(
          "td",
          { className: "fourth" },
          value
        )
      );
    }
  }]);

  return Row;
}(React.Component);

var Caption = function (_React$Component3) {
  _inherits(Caption, _React$Component3);

  function Caption() {
    _classCallCheck(this, Caption);

    return _possibleConstructorReturn(this, (Caption.__proto__ || Object.getPrototypeOf(Caption)).apply(this, arguments));
  }

  _createClass(Caption, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "caption",
        null,
        React.createElement("img", { src: this.props.src, style: { margin: '25px', width: '250px' } })
      );
    }
  }]);

  return Caption;
}(React.Component);

var Table = function (_React$Component4) {
  _inherits(Table, _React$Component4);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      var flag = this.props.which;
      var over = this.props.over;
      var out = this.props.out;
      var src = this.props.src;
      return React.createElement(
        "table",
        null,
        React.createElement(Caption, { src: src }),
        React.createElement(
          "tbody",
          null,
          this.props.users.map(function (act, i) {
            return React.createElement(Row, {
              over: over,
              out: out,
              src: src,
              key: i,
              i: i,
              flag: flag,
              user: act
            });
          })
        )
      );
    }
  }]);

  return Table;
}(React.Component);

var Root = function (_React$Component5) {
  _inherits(Root, _React$Component5);

  function Root(props) {
    _classCallCheck(this, Root);

    var _this5 = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

    _this5.getData = _this5.getData.bind(_this5);
    _this5.doSort = _this5.doSort.bind(_this5);
    _this5.sort = _this5.sort.bind(_this5);
    _this5.over = _this5.over.bind(_this5);
    _this5.out = _this5.out.bind(_this5);
    _this5.state = {
      api: 'https://fcctop100.herokuapp.com/api/fccusers/top/',
      which: 'recent',
      down: true,
      key: 'number',
      users: [],
      src: ''
    };
    return _this5;
  }

  _createClass(Root, [{
    key: "getData",
    value: function getData(which) {
      $.ajax({
        url: this.state.api + which,
        dataType: 'json',
        cache: false,
        success: function (data) {
          this.doSort(this.state.down, this.state.key, which, data);
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.state.api + this.state.which, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: "doSort",
    value: function doSort(down, key, which, data) {
      if (key === 'name') {
        this.setState({ down: down, key: key, which: which, users: data.sort(down ? function (a, b) {
            return b.username.localeCompare(a.username);
          } : function (a, b) {
            return a.username.localeCompare(b.username);
          }) });
      } else if (which === 'recent') {
        this.setState({ down: down, key: key, which: which, users: data.sort(down ? function (a, b) {
            return b.recent - a.recent;
          } : function (a, b) {
            return a.recent - b.recent;
          }) });
      } else {
        this.setState({ down: down, key: key, which: which, users: data.sort(down ? function (a, b) {
            return b.alltime - a.alltime;
          } : function (a, b) {
            return a.alltime - b.alltime;
          }) });
      };
    }
  }, {
    key: "sort",
    value: function sort(down, key, which) {
      down = down != null ? down : this.state.down;
      key = key != null ? key : this.state.key;
      which = which != null ? which : this.state.which;
      if (which != this.state.which) {
        this.getData(which);
      }
      this.doSort(down, key, which, this.state.users);
    }
  }, {
    key: "over",
    value: function over(e) {
      this.setState({ src: e.currentTarget.currentSrc });
    }
  }, {
    key: "out",
    value: function out(e) {
      this.setState({ src: '' });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getData(this.state.which);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "container" },
        React.createElement(
          "h2",
          null,
          "The FreeCodeCamp Leaderboard"
        ),
        React.createElement(Header, {
          which: this.state.which,
          down: this.state.down,
          users: this.state.users,
          getData: this.getData,
          sort: this.sort
        }),
        React.createElement(
          "div",
          { id: "table" },
          React.createElement(Table, {
            over: this.over,
            out: this.out,
            which: this.state.which,
            down: this.state.down,
            users: this.state.users,
            getData: this.getData,
            src: this.state.src
          })
        )
      );
    }
  }]);

  return Root;
}(React.Component);

ReactDOM.render(React.createElement(Root, { urlBase: "https://fcctop100.herokuapp.com/api/fccusers/" }), document.getElementById('root'));