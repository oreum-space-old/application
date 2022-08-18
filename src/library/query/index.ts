import type { LocationQuery, LocationQueryRaw } from 'vue-router'

const
  HASH_RE = /#/g,
  AMPERSAND_RE = /&/g,
  // SLASH_RE = /\//g,
  EQUAL_RE = /=/g,
  // IM_RE = /\?/g,
  PLUS_RE = /\+/g,
  ENC_BRACKET_OPEN_RE = /%5B/g, // [
  ENC_BRACKET_CLOSE_RE = /%5D/g, // ]
  ENC_CARET_RE = /%5E/g, // ^
  ENC_BACKTICK_RE = /%60/g, // `
  ENC_CURLY_OPEN_RE = /%7B/g, // {
  ENC_PIPE_RE = /%7C/g, // |
  ENC_CURLY_CLOSE_RE = /%7D/g, // }
  ENC_SPACE_RE = /%20/g // }

const isArray = Array.isArray

function commonEncode(text: string | number): string {
    return encodeURI('' + text)
        .replace(ENC_PIPE_RE, '|')
        .replace(ENC_BRACKET_OPEN_RE, '[')
        .replace(ENC_BRACKET_CLOSE_RE, ']')
}

function encodeQueryValue(text: string | number): string {
    return (commonEncode(text)
        // Encode the space as +, encode the + to differentiate it from the space
        .replace(PLUS_RE, '%2B')
        .replace(ENC_SPACE_RE, '+')
        .replace(HASH_RE, '%23')
        .replace(AMPERSAND_RE, '%26')
        .replace(ENC_BACKTICK_RE, '`')
        .replace(ENC_CURLY_OPEN_RE, '{')
        .replace(ENC_CURLY_CLOSE_RE, '}')
        .replace(ENC_CARET_RE, '^'))
}

function encodeQueryKey(text: string): string {
    return encodeQueryValue(text).replace(EQUAL_RE, '%3D')
}

function decode(text: string): string {
    try {
        return decodeURIComponent('' + text)
    }
    catch (err) {
        console.error(`Error decoding "${text}". Using original value`)
    }
    return '' + text
}

export default {
  parse (search: string): LocationQuery {
    const query: LocationQuery = {}
    // avoid creating an object with an empty key and empty value
    // because of split('&')
    if (search === '' || search === '?') {
      return query
    }
    const hasLeadingIM = search[0] === '?'
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')
    for (let i = 0; i < searchParams.length; ++i) {
      // pre decode the + into space
      const searchParam = searchParams[i].replace(PLUS_RE, ' ')
      // allow the = character
      const eqPos = searchParam.indexOf('=')
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos))
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1))
      if (key in query) {
        // an extra variable for ts types
        let currentValue = query[key]
        if (!isArray(currentValue)) {
          currentValue = query[key] = [currentValue]
        }
        currentValue.push(value)
      } else {
        query[key] = value
      }
    }
    return query
  },
  stringify (query?: LocationQueryRaw | null): string {
    let search = ''

    for (let key in query) {
      const value = query[key]
      key = encodeQueryKey(key)
      if (value === null || value === undefined) {
        // only null adds the value
        if (value !== undefined) {
          search += (search.length ? '&' : '') + key
        }
        continue
      }
      // keep null values
      const values = isArray(value)
        ? value.map(v => v && encodeQueryValue(v))
        : [value && encodeQueryValue(value)]

      values.forEach(value => {
        // skip undefined values in arrays as if they were not present
        // smaller code than using filter
        if (value !== undefined) {
          // only append & with non-empty search
          search += (search.length ? '&' : '') + key
          if (value !== null) {
            search += '=' + value
          }
        }
      })
    }
    return search
  }
}
