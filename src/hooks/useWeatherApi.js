import { useEffect } from "react";
import { useState } from "react";

function useWeatherApi (cityName) {

    const [city, setCity] = useState("khandwa");
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5016cfe8e6c75ec74b7a49a6605bde1e`)
    .then((res) => res.json())
    .then((res)=>setCity(res.cityName));
     console.log((res) => res.json());
     
    console.log(city);
  },[city, cityName]) ;

  return city

}

export default useWeatherApi