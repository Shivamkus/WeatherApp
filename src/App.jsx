import { useState, useEffect } from "react";
import Loader from "../Loader";

const App = () => {
  const [data, setData] = useState(null);
  const [cityName, setCityName] = useState("khandwa");
  const [inputCity, setInputCity] = useState("");
  const date = new Date().toLocaleTimeString();

  const [time, setTime] = useState(date);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5016cfe8e6c75ec74b7a49a6605bde1e`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [cityName]);

  console.log(time);

  const newTime = () => {
    const date = new Date().toLocaleTimeString();
    setTime(date);
  };
  setInterval(newTime, 1000);

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

  return (
    <>
      <div
        className="h-screen w-screen flex flex-col lg:flex-row justify-center items-center
        bg-cover bg-[url('https://images.discerningassets.com/image/upload/c_fill,h_1000,w_1000/c_fit,fl_relative,h_1.0,o_100,w_1.0/c_fill,w_4383,h_4383/v1529088444/20180608-4W6A4325_6_7-2-Edit_b8jl00.jpg')]"
      > 
      
      
      <div
          className="h-[30vh] lg:h-[70vh] w-[90%] lg:w-[25%] flex items-center justify-center shadow-2xl shadow-white p-2 m-2
          bg-slate-700/60 "
        >
         <div className="flex flex-col justify-evenly items-end h-1/2 w-10/12">
         <h2 className="text-4xl text-white flex justify-end items-end">City: {data.name}</h2>
         <h1 className="text-4xl text-white flex justify-end items-end">Country: {data.sys.country}</h1>

         <h1 className="text-4xl text-white flex justify-end items-end">  {time}</h1>
         </div>
         </div>

        <div
          className="h-[50vh] lg:h-[70vh] w-[90%] lg:w-[45%] border-emerald-950 p-2 m-2 flex flex-col justify-center items-center
          bg-cover bg-blend-color-burn
          bg-[url('https://images.discerningassets.com/image/upload/c_fill,h_1000,w_1000/c_fit,fl_relative,h_1.0,o_100,w_1.0/c_fill,w_4383,h_4383/v1529088444/20180608-4W6A4325_6_7-2-Edit_b8jl00.jpg')]
          backdrop-blur-lg"
        >
          <div className="flex justify-center items-center">
            <img
              src={iconUrl}
              alt="Icon of Weather"
              className="w-[50px] lg:w-[100px] bg-neutral-800 rounded-full"
            />
          </div>
          <div className=" w-[full] lg:text-right md:text-right">
            <h1 className="text-2xl lg:text-4xl text-white">
              {Number(data.main.temp - 273.15).toFixed(2)}°C
            </h1>
            <h1 className="text-white text-md lg:text-xl">
              Clouds: {data.clouds.all}%
            </h1>
            <h1 className="text-white text-md lg:text-xl">
              Air Pressure: {data.main.pressure} hPa
            </h1>
            <h1 className="text-white text-md lg:text-xl">
              Description: {data.weather[0].description}
            </h1>
          </div>
          <div className="mt-4 lg:mt-10">
            <form
              onSubmit={submitData}
              className="flex flex-col lg:flex-row items-center"
            >
              <input
                className="px-4 py-2 lg:px-10 lg:py-3 rounded-md mb-2 lg:mb-0 lg:mr-2"
                type="text"
                value={inputCity}
                onChange={handleInputChange}
                placeholder="Enter city name"
              />
              <button
                type="submit"
                className="p-2 lg:p-3 bg-slate-900 text-white  rounded-md"
              >
                Get Weather
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
