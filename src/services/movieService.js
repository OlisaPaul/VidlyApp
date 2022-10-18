import http from "./httpService";

function movieUrl(id) {
  return `/movies/${id}`;
}

export function getMovies() {
  return http.get(`/movies`);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  } else {
    return http.post(`/movies`, movie);
  }
}
