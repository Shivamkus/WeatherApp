import { useState, useEffect } from "react";
import Loader from "../Loader";

const App = () => {
  const [data, setData] = useState(null);
  const [cityName, setCityName] = useState("khandwa");
  const [inputCity, setInputCity] = useState("");
  const date = new Date().toLocaleTimeString();
   const DateToday = new Date().toLocaleDateString();

  const [time, setTime] = useState(date);
  const [todaydate, setTodayDate] = useState(DateToday);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5016cfe8e6c75ec74b7a49a6605bde1e`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setInputCity('')
        console.log(data);
        
      });
  }, [cityName]);


  const newTime = () => {
    const date = new Date().toLocaleTimeString();
    setTime(date);
  };
  setInterval(newTime, 1000);

  const newTodayDate = ()=>{
    const DateToday = new Date().toLocaleDateString();
  setTodayDate(DateToday)
  }
  setInterval(newTodayDate, 1000*60*60)

  
  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();
    setCityName(inputCity);
  };

  if (!data) {
    return <Loader />;
  }

  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const sunriseTime = new Date(data.sys.sunrise * 1000);
  const sunsetTime = new Date(data.sys.sunset * 1000);
  return (
    <>
      <div
        className="h-screen w-screen flex flex-col lg:flex-row justify-center items-center
       bg-[url('https://images.discerningassets.com/image/upload/c_fill,h_1000,w_1000/c_fit,fl_relative,h_1.0,o_100,w_1.0/c_fill,w_4383,h_4383/v1529088444/20180608-4W6A4325_6_7-2-Edit_b8jl00.jpg')]"
      >
        <div
          className="h-[30vh] lg:h-[70vh] w-[90%] lg:w-[25%] flex items-center justify-center shadow-2xl shadow-white p-2 m-2
          bg-slate-700/60 "
        >
         <div className="flex flex-col justify-evenly items-end h-1/2 w-10/12">
         <h2 className="text-4xl text-white flex justify-end items-end">City: {data.name}</h2>
         <h1 className="text-4xl text-white flex justify-end items-end">Country: {data.sys.country}</h1>
         <h1 className="text-4xl text-white flex justify-end items-end">  {todaydate}</h1>

         <h1 className="text-4xl text-white flex justify-end items-end">  {time}</h1>
         </div>

        </div>

        <div
          className="h-[50vh] lg:h-[70vh] w-[90%] lg:w-[45%] border-emerald-950 p-2 m-2 flex flex-col justify-center items-center
          lg:bg-slate-700/80 md:bg-slate-400/50 sm:bg-slate-400/50 bg-slate-900/50 shadow-xl shadow-white"
        >
          <div className=" justify-center items-center">
          <div className="flex justify-center items-center">
            <img
              src={iconUrl}
              alt="Icon of Weather"
              className="w-[50px] lg:w-[100px] bg-neutral-800/30 rounded-full"
            />
          </div>
          <div className=" w-[full] lg:text-right h-2/3 items-end justify-center flex flex-col md:text-right">
            <h1 className="text-2xl lg:text-4xl text-white">
              {Number(data.main.temp - 273.15).toFixed(2)}°C
            </h1>
            <h1 className="text-white text-xl lg:text-2xl">
              Clouds: {data.clouds.all}%
            </h1>
            <h1 className="text-white text-xl lg:text-2xl">
            Sunrise:{ sunriseTime.toLocaleTimeString()}
            </h1>

            <h1 className="text-white text-lg lg:text-2xl">
            Sunset: {sunsetTime.toLocaleTimeString()} 
          </h1>

          <h1 className="text-white text-xl lg:text-2xl">
          Air Pressure: {data.main.pressure} hPa
        </h1>
            <h1 className="text-white text-xl lg:text-3xl">
              Description: {data.weather[0].description}
            </h1>
          </div>
          <div className="mt-1 lg:mt-5">
            <form
              onSubmit={submitData}
              className="flex flex-col lg:flex-row items-center"
            >
              <input
                className="px-4 py-2 lg:px-10 lg:py-3 rounded-xl mb-2 lg:mb-0 lg:mr-2"
                type="text"
                value={inputCity}
                onChange={handleInputChange}
                placeholder="Enter city name"
              />
              <button
                type="submit"
                className="p-2 lg:p-3 bg-slate-900 text-white  rounded-xl"
              >
                Get Weather
              </button>
            </form>
          </div>
        </div>
          </div>
      </div>
    </>
  );
};

export default App;
