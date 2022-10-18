import React, { Component } from "react";

//columns
//sortedColumn
//onSort

class TableHeader extends Component {
  moveSort = (path) => {
    const sortedColumn = { ...this.props.sortedColumn };
    if (sortedColumn.path === path)
      sortedColumn.order = sortedColumn.order === "asc" ? "desc" : "asc";
    else {
      sortedColumn.path = path;
      sortedColumn.order = "asc";
    }
    this.props.onSort(sortedColumn);
  };

  renderSortIcon(column) {
    const { sortedColumn } = this.props;
    if (column.path !== sortedColumn.path) return null;
    if (sortedColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  }

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.moveSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
