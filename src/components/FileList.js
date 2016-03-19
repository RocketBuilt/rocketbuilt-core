import React, {PropTypes} from 'react';
import cn from 'classnames/dedupe';

class FileRow extends React.Component
{
  render() {
    return <li className={cn({active: this.props.file.active})} ><a href="#" onClick={(e) => {
      e.preventDefault();
      this.props.onClick(this.props.file);
    }}>{this.props.file.name}</a></li>;
  }
}

export default class FileList extends React.Component
{
  render() {
    return <ul>{this.props.files.map((file) => <FileRow key={file.id} file={file} onClick={this.props.onFileSelect} />)}</ul>;
  }
}

FileList.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bol
  }).isRequired).isRequired
};
