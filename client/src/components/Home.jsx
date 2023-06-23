import React from 'react'
import Offers from './HomeComponents/Offers'

const Home = () => {
  return (
    <div className="m-3">
        <div>
            <h3 className="mt-3">Current events</h3>
            <Offers/>
        </div>
    </div>
  )
}

export default Home