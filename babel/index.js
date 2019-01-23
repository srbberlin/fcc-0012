class Header extends React.Component {
  constructor(props) {
    super(props);
    this.switchDir = this.switchDir.bind(this);
    this.switchKey = this.switchKey.bind(this);
    this.switchWhich = this.switchWhich.bind(this);
  }
  
  switchDir (e) {
    this.props.sort (!this.props.down, null, null);
  }
  
  switchKey(e) {
    this.props.sort (null, e.target.value, null);
  }

  switchWhich (e) {
    this.props.sort (null, null, e.target.value);
  }
  
  render() {
    return (
      <div id='header'>
        <select onChange={this.switchDir}>
          <option value="down">Down</option>
          <option value="up">Up</option>
        </select>
        <select onChange={this.switchKey}>
          <option value="number">By Number</option>
          <option value="name">By Name</option>
        </select>
        <select onChange={this.switchWhich} >
          <option value="recent">Recent</option>
          <option value="alltime">Alltime</option>
        </select>
      </div>
    );
  }
}

class Row extends React.Component {
  render () {
    let flag = this.props.flag;
    let user = this.props.user;
    let i = this.props.i;
    let img = user.img;
    let name = user.username;
    let value = flag === 'recent' ? user.recent :  user.alltime;
    let colour = i % 2 ? '#eeeeee' : '#ffffff';

    return  (
      <tr style={{ backgroundColor: colour }}>
        <td className='first' >{i + 1}</td>
        <td className='second' >
          <a href={'https://www.freecodecamp.org/' + name} target="_blank">
            <img onMouseOver={this.props.over} onMouseOut={this.props.out}  src={img} style={{height: '20px'}}/>
          </a>
        </td>
        <td className='third' >{name}</td>
        <td className='fourth' >{value}</td>
      </tr>
    );
  }
}

class Caption extends React.Component {
  render() {
    return (
      <caption><img src={this.props.src} style={{margin: '25px', width: '250px'}}/></caption>
    )
  }
}

class Table extends React.Component {
  render() {
    let flag = this.props.which;
    let over = this.props.over;
    let out = this.props.out;
    let src = this.props.src;
    return (
      <table>
        <Caption src={src} />
        <tbody>
          {
            this.props.users.map(
              function (act, i) {
                return (
                  <Row 
                    over={over}
                    out={out}
                    src={src}
                    key={i} 
                    i={i} 
                    flag={flag} 
                    user={act} 
                  />
                )
              }
            )
          }
        </tbody>
      </table>
    );
  }
}

class Root extends React.Component {
  constructor (props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.doSort = this.doSort.bind(this);
    this.sort = this.sort.bind(this);
    this.over = this.over.bind(this);
    this.out = this.out.bind(this);
    this.state = {
      apiRecent: 'https://api.npoint.io/df4d86c7cd7b69ad3603',
      apiAlltime: 'https://api.npoint.io/b56606bb3536eb445851',
      //api: 'https://fcctop100.herokuapp.com/api/fccusers/top/',
      which: 'recent',
      down: true,
      key: 'number',
      users: [],
      src: ''
    };
  }

  getData (which) {
    $.ajax({
      //url: this.state.api + which,
      url: which ==='recent' ? this.state.apiRecent : this.state.apiAlltime,
      dataType: 'json', 
      cache: false,
      success: function(data) {
        this.doSort(this.state.down, this.state.key, which, data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.state.api + this.state.which, status, err.toString());
      }.bind(this)
    });
  }
  
  doSort (down, key, which, data) {
    if (key === 'name') {
      this.setState ({down: down, key: key, which: which, users: data.sort(
        down 
          ? (a, b) => { return b.username.localeCompare(a.username) }
          : (a, b) => { return a.username.localeCompare(b.username); }
      )}); 
    } else if (which === 'recent') { 
      this.setState ({down: down, key: key, which: which, users: data.sort(
        down 
          ? (a, b) => { return b.recent - a.recent }
          : (a, b) => { return a.recent - b.recent; }
      )}); 
    }
    else {
      this.setState ({down: down, key: key, which: which, users: data.sort(
        down 
          ? (a, b) => { return b.alltime - a.alltime }
          : (a, b) => { return a.alltime - b.alltime; }
      )}); 
    };
  }
  
  sort (down, key, which, ) {
    down = down != null ? down : this.state.down;
    key = key != null ? key : this.state.key;
    which = which != null ? which : this.state.which;
    if (which != this.state.which) {
      this.getData(which);
    }
    this.doSort(down, key, which, this.state.users);
  }
  
  over (e) {
    this.setState({src: e.currentTarget.currentSrc});
  }

  out (e) {
    this.setState({src: ''});
  }

  componentWillMount() {
    this.getData(this.state.which);
  }

  render() {
    return (
      <div id='container'>
        <h2>The FreeCodeCamp Leaderboard</h2>
        <Header 
          which={this.state.which}
          down={this.state.down}
          users={this.state.users}
          getData={this.getData}
          sort={this.sort}
        />
        <div id="table">
          <Table 
            over={this.over}
            out={this.out}
            which={this.state.which}
            down={this.state.down}
            users={this.state.users}
            getData={this.getData}
            src={this.state.src}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Root  urlBase="https://fcctop100.herokuapp.com/api/fccusers/"/>,
  document.getElementById('root')
);
