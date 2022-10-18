import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import Pagination from "./common/pagination";
import { getGenres } from "../services/genreService";
import { paginate } from "./common/utils/paginate";
import SearchBox from "./common/searchBox";
import Genre from "./genre";
import MoviesTable from "./moviesTable";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    activePage: 1,
    genre: [],
    data: { search: "" },
    sortedColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data } = await getGenres();
    const genre = [{ name: "All Genre" }, ...data];
    this.setState({
      movies,
      genre,
    });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  };

  handlePagination = (page) => {
    this.setState({
      activePage: page,
    });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((a) => a._id !== movie);
    this.setState({
      movies,
    });
    try {
      await deleteMovie(movie);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast("This movie has already been deleted");
      this.setState({
        movies: originalMovies,
      });
    }
  };
  handleGenre = (genre) => {
    const data = { ...this.state.data };
    data.search = "";
    this.setState({
      selectedGenre: genre,
      activePage: 1,
      data,
    });
  };

  handleSort = (sortedColumn) => {
    this.setState({
      sortedColumn,
    });
  };

  handleChange = ({ currentTarget: input }) => {
    let data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({
      data,
      selectedGenre: "",
      activePage: 1,
    });
  };
  getPageData() {
    const {
      pageSize,
      movies: allMovies,
      activePage,
      selectedGenre,
      sortedColumn,
      data,
    } = this.state;
    const re = new RegExp(data.search, "i");
    let filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((a) => a.genre._id === selectedGenre._id)
        : data.search
        ? allMovies.filter((a) => re.test(a.title))
        : allMovies;

    const sorted = _.orderBy(
      filtered,
      [sortedColumn.path],
      [sortedColumn.order]
    );

    const movies = paginate(sorted, activePage, pageSize);
    return { totalCount: filtered.length, movies };
  }

  render() {
    const { pageSize, activePage, genre, selectedGenre, sortedColumn, data } =
      this.state;

    const { totalCount, movies } = this.getPageData();

    const { user } = this.props;


    return (
      <div>
        <div className="row">
          <div className="col col-2 m-2">
            <Genre
              genre={genre}
              handleGenre={this.handleGenre}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col">
            {user && (
              <Link to={"/movies/new"}>
                <button className="btn btn-primary">New Movie</button>
              </Link>
            )}
            <p>
              {this.state.movies.length === 0
                ? "There are no movies in the database."
                : "Showing " + totalCount + " movies in the database."}
            </p>
            <SearchBox value={data.search} onChange={this.handleChange} />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortedColumn={sortedColumn}
              onDelete={this.handleDelete}
              onClick={this.props.onClick}
              user={user}
            />
            <Pagination
              pageSize={pageSize}
              pageCount={totalCount}
              activePage={activePage}
              handlePage={this.handlePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
