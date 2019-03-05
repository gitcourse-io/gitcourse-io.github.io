import React from 'react';
import { measure } from '@pinyin/measure';
import {inject} from 'mobx-react';
import 'xterm/dist/xterm.css';
import {Terminal as Xterm} from 'xterm';
import * as fit from "xterm/lib/addons/fit/fit";
Xterm.applyAddon(fit);
// const Div = measure('div');

class Term extends React.Component {
  constructor(props) {
    super(props);

    this.dom = React.createRef();
  }

  componentDidMount() {

    this.props.scenario.terminals[0].terminal.open(this.dom);
    this.props.scenario.terminals[0].terminal.fit();
  }

  resize = () => {
    // if (this.props.terminal.terminal)
    //   this.props.terminal.terminal.fit()
  }

  render() {
    return (
        <div ref={dom => this.dom = dom} style={{width: '100%', height: '100%'}}></div>

    )
  }
}

export default inject('store')(Term);
