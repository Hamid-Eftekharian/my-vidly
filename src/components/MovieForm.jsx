import React, { Component } from "react";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import Joi from "joi-browser";
import Input from "./common/input";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Component {
  state = {
    movie: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    title: Joi.required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(100).label("Rate"),
  };

  componentDidMount = () => {
    const movie = this.state.movie;
    if (this.props.match.params.id) {
      let movieSpec = getMovie(this.props.match.params.id);
      movie.title = movieSpec.title;
      movie.genre = movieSpec.genre.name;
      movie.numberInStock = movieSpec.numberInStock;
      movie.dailyRentalRate = movieSpec.dailyRentalRate;
      this.setState({ movie });
      console.log(movie);
    } else {
      const genres = getGenres();
      this.setState({ genres });
      console.log(genres);
    }
  };

  validate = () => {
    const result = Joi.validate(this.state.accounts, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((item) => {
      errors[item.path[0]] = item.message;
    });
    console.log(errors);
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    saveMovie(this.state.movie);
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = this.schema[name];
    const { error } = Joi.validate(obj, schema);

    if (!error) return null;
    return error.details[0].message;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = this.state.errors;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const movie = this.state.movie;
    movie[input.name] = input.value;
    this.setState({ movie, errors });
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            value={this.state.movie.title}
            label="Title"
            onChange={this.handleChange}
            error={this.state.errors.title}
          />
          <Input
            name="genre"
            value={this.state.movie.genre}
            label="Genre"
            onChange={this.handleChange}
            error={this.state.errors.genre}
          />
          <Input
            name="numberInStock"
            value={this.state.movie.numberInStock}
            label="Stock"
            onChange={this.handleChange}
            error={this.state.errors.numberInStock}
          />
          <Input
            name="dailyRentalRate"
            value={this.state.movie.dailyRentalRate}
            label="Rate"
            onChange={this.handleChange}
            error={this.state.errors.dailyRentalRate}
          />

          <button
            className="btn btn-primary m-2"
            onClick={() => this.props.history.push("/movies")}
          >
            Save Movie
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
