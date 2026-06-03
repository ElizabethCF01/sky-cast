import cloudyGif from "../assets/cloudy.gif"
import drizzleGif from "../assets/drizzle.gif"
import foggyGif from "../assets/foggy.gif"
import partlyCloudyGif from "../assets/partly-cloudy.gif"
import rainGif from "../assets/rain.gif"
import showersGif from "../assets/showers.gif"
import snowStormGif from "../assets/snow-storm.gif"
import snowGif from "../assets/snow.gif"
import stormGif from "../assets/storm.gif"
import sunGif from "../assets/sun.gif"

export function getWeatherInfo(code: number): { label: string; gif: number } {
  if (code === 0) return { label: "Clear", gif: sunGif }
  if (code === 1) return { label: "Mainly clear", gif: partlyCloudyGif }
  if (code === 2) return { label: "Partly cloudy", gif: partlyCloudyGif }
  if (code === 3) return { label: "Overcast", gif: cloudyGif }
  if (code === 45 || code === 48) return { label: "Fog", gif: foggyGif }
  if (code >= 51 && code <= 57) return { label: "Drizzle", gif: drizzleGif }
  if (code >= 61 && code <= 67) return { label: "Rain", gif: rainGif }
  if (code >= 71 && code <= 77) return { label: "Snow", gif: snowGif }
  if (code >= 80 && code <= 82) return { label: "Showers", gif: showersGif }
  if (code === 85 || code === 86)
    return { label: "Snow showers", gif: snowStormGif }
  if (code >= 95) return { label: "Thunderstorm", gif: stormGif }
  return { label: "Unknown", gif: sunGif }
}
