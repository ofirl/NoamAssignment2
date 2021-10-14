import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import UserRow from './../UserRow'


const FilteredDataProvider = (props) => {
  /** VARS **/
  const {
    children,
    data,
    filters,
    ...rest
  } = props
  const [filteredData, setFilteredData] = useState(data)


  /** EFFECTS **/
  useEffect(() => {
    // console.log('setFilteredData envoked with', { data, filters }) //DEBUG

    setFilteredData(
      _.filter(data ?? [],
        row => (
          _.every(Object.entries(filters ?? {}),
            ([key, value]) => (
              value && value !== [] && value !== {}
                ? value instanceof Function
                  ? value(row[key], row)
                  : row[key] === value
                : true
            ))
        ))
    )
  }, [filters, data])


  /** RENDER **/
  return (
    filteredData.map((user, i) => (
      <UserRow
        key={i}
        user={user}
      />
    ))
    
    // React.Children.map(children, child =>
    //   React.cloneElement(child, {
    //     data: filteredData,
    //     ...rest,
    //   })
    // )
  )
}

/** EXPORT **/
export default FilteredDataProvider