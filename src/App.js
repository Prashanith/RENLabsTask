import './App.css';
import React,{useEffect} from 'react';
import axios from 'axios'
import ViewData from './components/viewData';

function App() {
  return (
    <div className="App">
      <ViewData/>
      {/* <API/> */}
    </div>
  );
}

export default App;

function API() {
  const [data, setData] = React.useState(null)

  async function getData() {
    try {
      const res = await axios.get('https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json');
      setData(res.data.products); 
      console.log(res.data);     
    } catch (error) {
      console.log(error);
      setData(null);      
    }    
  }
  useEffect(() => {
    getData(); 
  }, [])

  return (
    <div>
      <table>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Popularity</th>
        </tr>
        {
          data &&
          Object.keys(data).sort(function compareFn(a, b) { return parseInt(data[a]["popularity"])-parseInt(data[b]["popularity"])}).map((k)=>{
            return(
              <tr key={k}>
                <td>
                {data[k]["title"]}+" "+{k}
                </td>
                <td>
                {data[k]["subcategory"]}
                </td>
                <td>
                {data[k]["price"]}
                </td>
                <td>
                {data[k]["popularity"]}
                </td>
              </tr>
            );
          })
        }
      </table>
    </div>
  )
}

