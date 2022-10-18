import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovies, saveMovie, getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({
        data: this.mapToView(movie),
      });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/notfound");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
  mapToView(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre.name,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  dropdown() {
    let genreNames = this.state.genres.map((a) => a.name);
    return genreNames;
  }
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };
  async doSubmit() {
    let data = { ...this.state.data };
    let genre = this.state.genres.filter((a) => a.name === data.genre)[0];
    data.genreId = genre._id;
    delete data.genre;
    await saveMovie(data);

    this.props.history.replace("/movies");
  }

  render() {
    return (
      <div className="mr-5 ml-5">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", this.dropdown())}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
