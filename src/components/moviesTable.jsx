import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (a) => <Link to={`/movies/${a._id}`}>{a.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (a) => (
        <Like onClick={() => this.props.onLike(a)} liked={a.liked} />
      ),
    },
  ];

  constructor() {
    super();
    const user = auth.getCurrentUser();
    //console.log(user)
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  deleteColumn = {
    key: "delete",
    content: (a) => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(a._id)}
      >
        Delete
      </button>
    ),
  };

  render() {
    const { sortedColumn, movies, onSort, onLike, onDelete, onClick } =
      this.props;

    return (
      <Table
        sortedColumn={sortedColumn}
        onSort={onSort}
        rows={movies}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
