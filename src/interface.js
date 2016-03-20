import React from 'react';
import ReactDOM from 'react-dom';
import {Dispatcher} from 'flux';
import {ReduceStore,Container} from 'flux/utils';
import _ from 'lodash';

import FileList from './components/FileList';

window.RB = window.RB || {};

var app = new Dispatcher();

class FileStore extends ReduceStore
{
  getInitialState() {
    return [
      {
        id: 1,
        name: 'index.html',
        active: true
      },
      {
        id: 2,
        name: 'page2.html'
      }
    ];
  }

  reduce(state, action) {
    switch (action.type) {

      case 'SELECT_FILE':

        if (action.file.active) {
          return state;
        }

        return state.map((file) => {
          if (file === action.file) {
            return _.assign({}, file, {active: true});
          } else if (file.active) {
            return _.assign({}, file, {active: false});
          }
          return file;
        });

      default:
        return state;
    }
  }
}

var fileStore = new FileStore(app);

function attach() {
  var iframe = document.querySelector('.webwrapper > iframe');
  var activeFile = _.find(fileStore.getState(), 'active');
  iframe.src = '/example/' + _.get(activeFile, 'name', 'index.html');

  iframe.onload = function() {
    addScript('/dist/controller.js', iframe.contentWindow.document.body);
  };
}

attach();

fileStore.addListener(attach);

class FileListContainer extends React.Component {
  static getStores() {
    return [fileStore];
  }

  static calculateState(prevState) {
    return {
      files: fileStore.getState(),
    };
  }

  render() {
    return <FileList files={this.state.files} onFileSelect={(file) => app.dispatch({
      type: 'SELECT_FILE',
      file
    })} />;
  }
}

const FileListUI = Container.create(FileListContainer);

RB.init = function(id) {
  ReactDOM.render(<FileListUI />, document.querySelector('.pages'));
};

RB.handle = function(action) {
  console.log('Event from iframe');
  app.dispatch(action);
};

function addScript(src, target) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  target.appendChild(s);
}
