import React, { Component } from "react";
import _ from "lodash";

class Rentals extends Component {
  state = {
    cats: [
      { owner: "male", name: "Alicia" },
      { owner: "female", name: "Jessi" },
      { owner: "male", name: "Maloos" },
      { owner: "female", name: "Catty" },
    ],
  };

  getSorted = () => {
    const cats = _.orderBy(this.state.cats, ["owner", "name"]);
    // const males = cats.filter((c) => c.owner==='male');
    // const females = cats.filter((c) => c.owner !== 'female')
    this.setState({ cats });
    console.log(cats);
  };

  render() {
    return (
      <div>
        <h1>Rental Pages</h1>
        <ul>
          {this.state.cats.map((item) => (
            <li>
              Cat Owner: {item.owner}, Cat Name: {item.name}
            </li>
          ))}
        </ul>
        <button onClick={() => this.getSorted()}>Get Sorted</button>
      </div>
    );
  }
}

export default Rentals;
