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
      <table className='dataTable'>
        <tr className='tableRow'>
          <th className='tableHead'>Product</th>
          <th className='tableHead'>Category</th>
          <th className='tableHead'>Price</th>
          <th className='tableHead'>Popularity</th>
        </tr>
        {
          data &&
          Object.keys(data).map((k)=>{
            return(
              <tr key={k} className="tableRow">
                <td className='tableData'>
                {data[k]["title"]}+" "+{k}
                </td>
                <td className='tableData'>
                {data[k]["subcategory"]}
                </td>
                <td className='tableData'>
                {data[k]["price"]}
                </td>
                <td className='tableData'>
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

