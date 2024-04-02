import './App.css';
import React from 'react';
import {useState} from 'react';

function App() {

  const [city,setcity]=useState("");
  const [result,setresult]=useState("");
  const [error,seterror]=useState("");

  const onchangehandler =(e)=>{
    setcity(e.target.value);
  }

const onsubmithandler=(e)=>{
  e.preventDefault();
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city }&appid=5f784d0f78bb0d80b102c1a3aea4a9cc`).then(
  Response=>Response.json()
 ).then(data=> {
  if(data.cod && data.cod === 404){
    seterror("temparature at "+city +" not found")
    setcity("");

  }
  else if(data.main && data.main.temp){
    const kel=data.main.temp;
  const cel=kel-273.15;
  setresult("Temparature at "+city +"\n"+Math.round(cel)+" celcius");
  seterror("");
  }
  else {
    seterror("Temperature data not available for the city.");
    setresult("");
  }
  setcity("");
 })
}
  return (
   <div>
     <center>
     <div className="card">
       <div className="card-body">
       <h5 className="card-title">Weather app</h5>
        <form onSubmit={onsubmithandler}>
          <input type="text" value={city} onChange={onchangehandler}  /> <br/><br/>
          <input type="submit" value="Get Temparature"  name="search"/><br/>
        </form><br/>
        {error && <p>{error}</p>}
            {result && <p>{result}</p>}       </div>
     </div>
     </center>
   </div>
  );
}

export default App;

