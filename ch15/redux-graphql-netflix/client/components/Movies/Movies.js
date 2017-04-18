const React = require('react')
const { connect } = require('react-redux')
const { Link } = require('react-router')
const axios = require('axios')
const clean = require('clean-tagged-string').default
const {
  fetchedMovies
} = require('modules/movies')
const styles = require('./Movies.css')

class Movies extends React.Component {
  componentWillMount() {
    const query = clean`{
      movies {
        title,
        cover
      }
    }`

    axios.get(`/q?query=${query}`).then(response => {
      this.props.fetchedMovies(response)
    })
  }

  render() {
    const {
      children,
      movies = [],
      params = {}
    } = this.props

    return (
      <div className={styles.movies}>
        <div className={params.id ? styles.listHidden : styles.list}>
          {movies.map((movie, index) => (
            <Link
              key={index}
              to={`/movies/${index + 1}`}>
              <div
                className={styles.movie}
                style={{backgroundImage: `url(${movie.cover})`}} />
            </Link>
          ))}
        </div>
        {children}
      </div>
    )
  }
}

module.exports = connect(({movies}) => ({
  movies: movies.all
}), {
  fetchedMovies
})(Movies)