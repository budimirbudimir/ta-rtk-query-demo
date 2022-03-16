import React, { ChangeEventHandler, ReactEventHandler, useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'

import { incremented, amountAdded } from './features/counter/counterSlice'
import { Dog, useFetchDogsQuery } from './features/dogs/dogsSlice'

import './App.css'

const dogStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

interface IHeaderProps {
  count: number
  handleClick: () => void
}
interface ISelectorProps {
  numDogs: number
  setNumDogs: (num: number) => void
}
interface IContentProps {
  data: Dog[]
}

const Header = ({ count, handleClick }: IHeaderProps) => {
  return (
    <>
      <p>Hello Vite + React!</p><p>
        <button type="button" onClick={handleClick}>
          count is: {count}
        </button>
      </p>
    </>
  )
}

const Selector = ({ numDogs, setNumDogs }: ISelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setNumDogs(Number(e.target.value))

  return (
    <div>
      <p>Items to fetch:</p>
      <select value={numDogs} onChange={handleChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  )
}

const Content = ({ data }: IContentProps) => {
  return (
    <div>
      <p>Number of dogs fetched: {data.length}</p>
      <div>
          {data.map(dog => (
            <div key={dog.id} style={dogStyles}>
              <div style={{ width: 200 }}>{dog.name}</div>
              <div>
                <img src={dog.image.url} alt={dog.name} width={200} />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

const App = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  const [numDogs, setNumDogs] = useState(10)
  const { data = [], isFetching } = useFetchDogsQuery(numDogs)

  const handleClick = () => {
    // dispatch(incremented())
    dispatch(amountAdded(5))
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header count={count} handleClick={handleClick} />
        
        <Selector numDogs={numDogs} setNumDogs={setNumDogs} />
        
        {isFetching ? 'loading...' : <Content data={data} />}
      </header>
    </div>
  )
}

export default App
