'use strict';
const e = React.createElement;

class NavBar extends React.Component {
    constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("NavBar rendered");
    return e("nav", null, "testi", e(NavOption, null))
  }

}


class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}


//Navigaatiopalkin yksittäinen valinta
class NavOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("element");
    let container = e("div", null, "testi");
    container.appendChild(e("a", href="testi"), "testi");
    return container;
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(LikeButton), domContainer);

const navContainer = document.getElementById("#navbar");
ReactDOM.render(e(NavBar), domContainer);

