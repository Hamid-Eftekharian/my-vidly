import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "./common/Paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroup";
import MovieTable from "./MovieTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sort: { sortCulomn: "", order: "" },
  };

  componentDidMount() {
    let genres = [{ _id: 123, name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ currentPage: 1, selectedGenre: genre });
  };

  handleSort = (sortCulomn) => {
    // if (this.state.sort.sortCulomn === sortCulomn) {
    let order = this.state.sort.order === "asc" ? "desc" : "asc";
    // else
    // {let order = 'asc'};

    let sort = { sortCulomn, order };
    const movies = _.orderBy(this.state.movies, sortCulomn, order);
    this.setState({ movies, sort });
  };

  render() {
    // const { length: count } = this.state.movies;
    const {
      pageSize,
      selectedGenre,
      currentPage,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre.name !== "All Genres"
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    if (filtered.length === 0)
      return <p>There are no movies in the database.</p>;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            textProperty="name"
            valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
