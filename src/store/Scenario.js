import {types, flow, getRoot, getSnapshot} from 'mobx-state-tree';
import {Step} from "./Step";
import {Terminal} from "./Terminal";
import io from 'socket.io-client';
const uuidv4 = require('uuid/v4');

export const Scenario = types
  .model('Scenario', {
    title: '',
    description: '',
    steps: types.array(Step),
    terminals: types.array(Terminal),
  }).volatile(self => ({
    socket: io.connect('//ws.katacoda.com', {
      transports: ["websocket"],
      timeout: 120 * 1e3,
      reconnection: false,
      query: 'dockerimage=dind&course=docker&id=deploying-first-container&originalPathwayId='
    })
  })).views(self => ({

  })).actions(self => {

    return {
      afterCreate() {
        self.terminals.push({})

        self.socket.on('data', function (data) {
          self.terminals[0].terminal.write(data.data)
        });
      },
      setTitle(title) {
        self.title = title;
      },
      setDescription(desc) {
        self.description = desc;
      }
    }
  });
