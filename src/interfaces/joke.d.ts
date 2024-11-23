export type Joke =  {
  error: boolean
  category: string
  type: 'twopart' 
  setup: string
  delivery: string
  flags: Flags
  safe: boolean
  id: number
  lang: string
} | 
{
  error: boolean
  category: string
  type: 'single'
  joke: string
  flags: Flags
  safe: boolean
  id: number
  lang: string
}

export interface Flags {
  nsfw: boolean
  religious: boolean
  political: boolean
  racist: boolean
  sexist: boolean
  explicit: boolean
}
