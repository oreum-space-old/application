type Protocol = 'http' | 'https'

type Extension = 'com' | 'net' | 'space' | 'ru'

type Url =
  `${ Protocol }://${ string }` |
  `${ Protocol }://${ string }/${ string }` |
  `${ Protocol }://${ string }/${ string }?${ string }` |
  '' |
  `/${ string }` |
  `?${ string }` |
  `/${ string }?${ string }` |
  `${ Protocol }://${ string }:${ number }` |
  `${ Protocol }://${ string }:${ number }/${ string }` |
  `${ Protocol }://${ string }:${ number }/${ string }?${ string }` |
  `${ Protocol }://${ string }.${ Extension }` |
  `${ Protocol }://${ string }.${ Extension }/${ string }` |
  `${ Protocol }://${ string }.${ Extension }/${ string }?${ string }`

export default Url
