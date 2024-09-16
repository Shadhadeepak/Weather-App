
import { useState,useEffect } from 'react';
import './App.css';
import cloudy from './assets/cloudy.png'
import drizzle from './assets/drizzle.png'
import humidity from './assets/humidity.png'
import rain from './assets/rain (1).png'
import search from './assets/search.png'
import snow from './assets/snow.png'
import wind from './assets/wind.png'
import clearIcon from './assets/clearSun.png'
const WeatherDetails=({icon,temps,city,country,lat,long,humi,wind1})=>{
 return(
  <>
      <div className='image'>
          <img src={icon} alt="image" width="30px" height="30px" />
      </div>
      <div className="temp">{temps}°C</div>
        <div className="cityName">{city}</div>
          <div className="country">{country}</div>
            <div className="cord">
              <div><span className="lat">Latitude   </span><span>{lat}</span></div>
                <div><span className="long">Longitude   </span><span>{long}</span></div>
            </div>
            <div className="data-container">
              <div className="element">
                <img src={humidity} alt="humidity" className='icon' width="75px" height="75px"/>
                  <div className="data">
                    <div className="humidity-percentage">{humi} %</div>
                    <div className="humidity-text">Humidity</div>
                  </div>
              </div>
              <div className="element">
                <img src={wind} alt="wind" className='icon' width="75px" height="75px"/>
                  <div className="data">
                    <div className="wind-percentage">{wind1} Km/h</div>
                    <div className="wind-text">wind</div>
                  </div>
              </div>
            </div>
  </>
 )
}
    









function App() {

  const[text,setText]=useState('chennai')
  const[icon,setIcon]=useState(snow)
  const[temps,setTemps]=useState(0)
  const[city,setCity]=useState('chennai')
  const[country,setCountry]=useState('IN')
  const[lat,setlat]=useState(0)
  const[long,setlong]=useState(0)
  const[humi,setHumi]=useState(0)
  const[wind1,setWind]=useState(0)
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const weatherIconMap = {
    "Old": clearIcon,
    "01n": clearIcon,
    "02d": cloudy,
    "02n": cloudy,
    "03d": drizzle,
    "03n": drizzle ,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    };
const SearchFun=async ()=>{
  setLoading(true)
  let cityApi=''
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=6c24dfa6cbed376ca46f72f500ba30cc&units=metric`
    try{
       
        let res= await fetch(url)
        let data=await res.json()
        if (data.SyntaxError == "") {
          console.error("City not found");
          setCityNotFound(true)
          setLoading(false)
          return


          }
          // console.log(data.days.hours)
          setHumi (data.main.humidity);
          setWind(data.wind. speed);
          setTemps (Math.floor(data.main.temp));
          setCity(data.name);
          setCountry(data.sys.country);
          setlat(data.coord.lat);
          setlong(data.coord.lon);
          const weatherIconCode = data.weather[0].icon;
          setIcon ( clearIcon);
          setCityNotFound(false)

    } 
    catch(error){
      console.log('error occured :'+error.message);
    }
    finally{
        setLoading(false)
    }
  }
  const handleCity=(e)=>{
    setText(e.target.value)

  }
  const handleOnKeyDown=(e)=>{
    if(e.key === 'Enter'){
      SearchFun()
    }

  }
  useEffect (function () {
    SearchFun();
    }, []); 

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" name="" id="" className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleOnKeyDown}/>
          
        <div className="searchIcon">
          <img src={search} alt="Search" width="30px" height="30px" onClick={()=>{SearchFun()}}/>
        </div>
      </div>
      < WeatherDetails  icon={icon} temps={temps} city={city} country={country} lat={lat} long={long} humi={humi} wind1={wind1}/>

    <p className='copyright'> Desingned by <span>Shadha deepak</span></p>

    </div>
  );
}

export default App;
