import { IResolvers } from 'graphql-tools'
import { mockPlaces } from './mockPlaces'

interface IArgs {
  search: string
}

const handleSearching = (searchTerm: string) => {
  const filteredByCity = mockPlaces.filter(place => place.city.toLowerCase().includes(searchTerm))
  if (filteredByCity.length < 1) {
    return mockPlaces.filter(place => place.country.toLowerCase().includes(searchTerm))
  }
  return filteredByCity
}

const resolverMap: IResolvers = {
  Query: {
    getPlaces(_: void, args: IArgs): Object {
      let places = handleSearching(args.search)
      return {
        places,
        count: places.length,
      };
    },
  },
}

export default resolverMap
