import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCells(row, column) {
    if (column.content) return column.content(row);
    else {
      return _.get(row, column.path);
    }
  }
  renderKey(row, column) {
    return row.id + (column.path || column.key);
  }

  render() {
    const { rows, columns } = this.props;
    return (
      <tbody>
        {rows.map((row) => (
          <tr key={row.title}>
            {columns.map((column) => (
              <td key={this.renderKey(row, column)}>
                {this.renderCells(row, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
TableBody.defaultProps = {
  id: "_id",
};
