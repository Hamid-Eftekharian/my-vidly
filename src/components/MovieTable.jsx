import React, { Component } from "react";
import Like from "./common/like";
import _ from "lodash";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  renderCell = (movie, column) => {
    if (column.content) return column.content(movie);

    return _.get(movie, column.path);
  };

  render() {
    const { movies, sort, onSort } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            {this.columns.map((column) => (
              <th
                key={column.path || column.key}
                onClick={() => onSort(column.path)}
                className="clickable"
              >
                {column.label}
                {column.path === sort.sortCulomn && (
                  <i
                    className={
                      sort.order === "asc"
                        ? "fa fa-angle-up"
                        : "fa fa-angle-down"
                    }
                  ></i>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              {this.columns.map((column) => (
                <td key={movie._id + (column.path || column.key)}>
                  {this.renderCell(movie, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MovieTable;
