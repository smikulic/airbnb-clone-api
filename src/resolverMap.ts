import { IResolvers } from 'graphql-tools'
import { mockPlaces } from './mockPlaces'

type PlaceType = {
  id: string
  host: string
  beds: number
  name: string
  city: string
  price: string
  rating: string
  country: string
  details: string
  slides: Array<string>
  imageUrl: string
}

interface IArgs {
  search: string
  pageSize: number
  pageIndex: number
}

const handleSearching = (places: Array<PlaceType>, args: IArgs) => {
  const searchTerm = args.search.toLowerCase()
  const filteredByCity = places.filter(place => place.city.toLowerCase().includes(searchTerm))
  if (filteredByCity.length < 1) {
    return places.filter(place => place.country.toLowerCase().includes(searchTerm))
  }
  return filteredByCity
}

const handlePagination = (places: Array<PlaceType>, args: IArgs) => {
  const pageSize = args.pageSize || 20
  const pageIndex = args.pageIndex || 1
  return places.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
}

const resolverMap: IResolvers = {
  Query: {
    getPlaces(_: void, args: IArgs): Object {
      let places = handleSearching(mockPlaces, args)
      const count = places.length
      places = handlePagination(places, args)
      
      return {
        places,
        count,
      };
    },
  },
}

export default resolverMap
