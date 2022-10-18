import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, sortedColumn, columns, rows }) => {
  return (
    <table className="table mr-4">
      <TableHeader
        onSort={onSort}
        sortedColumn={sortedColumn}
        columns={columns}
      />
      <TableBody rows={rows} columns={columns} />
    </table>
  );
};

export default Table;
