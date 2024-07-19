import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'

const Search = ({setQuery, placeholder}) => {
  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-100 px-4 py-2">
      <Image src="/assets/icons/search.svg" alt="search" width={24} height={24} />
      <Input 
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 bg-gray-100 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}

export default Search