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

      case 'SELECT':

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
      type: 'SELECT',
      file
    })} />;
  }
}

fileStore.addListener(() => {
  var activeFile = _.find(fileStore.getState(), 'active');
  document.querySelector('.webwrapper > iframe').src = '/example/' + _.get(activeFile, 'name', 'index.html');
});

const FileListUI = Container.create(FileListContainer);

RB.init = function(id) {
  ReactDOM.render(<FileListUI />, document.querySelector('.pages'));
};
