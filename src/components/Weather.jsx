import PropTypes from "prop-types";

function Weather({ cityName, onCityChange }) {
  return (
    <>
      <div className="h-full w-screen bg-slate-900 text-zinc-50 flex justify-center items-center text-center ">
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-lg bg-white/10">
      <div className="w-full mb-1 ">

      <input
            type="text"
            placeholder="Enter your city name"
            value={cityName}
          />

          <button
            type="submit"
            onClick={onCityChange}
          >
            submit
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

Weather.PropTypes = {
  cityName: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};
export default Weather;
