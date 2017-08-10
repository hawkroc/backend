/**
 * Example adapted from Ant Design website:
 *  https://ant.design/components/table/#components-table-demo-edit-cell
 * 
 */

import React from 'react';
import { Input, Icon } from 'antd';

class EditableCell extends React.Component {
  // Manage own internal state.
  state = {
    value: this.props.value,
    editable: false,
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChangeConfirmed) {
      this.props.onChangeConfirmed(this.state.value.trim());
    }
  }

  edit = () => {
    this.setState({ editable: true });
  }
  
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={() => this.check()}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={() => this.check()}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

export default EditableCell;
