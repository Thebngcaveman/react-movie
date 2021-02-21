import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import MovieItem from "./MovieItem";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { rows: [] };
  }

  componentDidMount(){
    this.search('schin')
  }

  search = (keyword) => {
    console.log(keyword);
    let dataArray = [];
    let url =
      "https://api.themoviedb.org/3/search/movie?api_key=17df88d70ef916d51b26c5021f5d8c28&query="+keyword;
    axios.get(url).then((result) => {
      console.log(JSON.stringify(result.data.results));
      result.data.results.forEach((item) => {
        item.poster_src = "https://image.tmdb.org/t/p/w185"+item.poster_path
        dataArray.push(item);
      });
      this.setState({ rows: dataArray });
    });
  };

  render() {
    return (
      <div className="App">
        <table className="NavBar">
          <tbody>
            <tr>
              <td>
                <img src="https://cdn.auth0.com/blog/react-js/react.png" width="50" />
              </td>
              <td>Code POGGERS</td>
            </tr>
          </tbody>
        </table>
        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "100%",
            paddingLeft: 15,
          }}
          placeholder="Enter your movie"
          onChange={(event) => {
            this.search(event.target.value);
          }}
        />
        {this.state.rows.map((item) => (
          <MovieItem movie={item}/>
        ))}
      </div>
    );
  }
}
