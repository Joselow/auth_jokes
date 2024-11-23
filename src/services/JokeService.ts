import { ServerError } from "../errors/ServerError.js";
import { Joke } from "../interfaces/joke.js";

const END_POINT = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?lang=es'

const getJoke = async () => {
  const response = await fetch(END_POINT);
  const data: Joke = await response.json();

  if (!response.ok) { 
    throw new ServerError(`HTTP error! status: ${response.status}`);
  }

  const myJoke = data.type === 'twopart' 
          ? `${data.setup}, ${data.delivery}`
          : `${data.joke}`

  return myJoke
}

export const JokeService = {
  getJoke
}