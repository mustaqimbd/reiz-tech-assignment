
function App() {

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <div>
          <button>Ascending</button>
          <button>Descending</button>
        </div>
        <select>
          <option value="filter">Filter</option>
          <option value="area">Area smaller than Lithuania</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div>
        <ul>
          <li>Country : </li>
          <li>Region :</li>
          <li>Area :</li>
        </ul>
      </div>
    </div >
  )
}

export default App
