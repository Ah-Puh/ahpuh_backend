import request from "request"
import pool  from "../../config/database.js"
import { selectLatandLon } from "./dayDao.js"
import mysql from "mysql2/promise"
import axios from "axios"

export const surfingIndex = async (req) => {
    const beach_id = req.query.beach_id;
    const connection = await pool.getConnection(async conn => conn);
    const {lat, lon} = await selectLatandLon(connection, beach_id);
    connection.release();
    const apiURL1 = `https://api.open-meteo.com/v1/forecast?latitude=${Number(lat)}&longitude=${Number(lon)}&daily=temperature_2m_max,rain_sum,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&windspeed_unit=ms&timezone=Asia%2FTokyo&forecast_days=7`
    const apiURL2 = `https://marine-api.open-meteo.com/v1/marine?latitude=${Number(lat)}&longitude=${Number(lon)}&daily=swell_wave_height_max,swell_wave_direction_dominant,swell_wave_period_max&timezone=Asia%2FTokyo`
    const params1 = await getWeatherParams(apiURL1);
    const params2 = await getWeatherParams(apiURL2);
    const {time:time, temperature_2m_max:temperature, rain_sum:rain_sum, windspeed_10m_max:windspeed, winddirection_10m_dominant:wind_direction } = params1.data.daily;
    const {time:time2, swell_wave_height_max:wave_height, swell_wave_direction_dominant:wave_direction, swell_wave_period_max:wave_period} = params2.data.daily;
    
    const res = {time:time, index: await carcIndex(lat, lon, temperature, rain_sum, windspeed, wind_direction, wave_height, wave_direction, wave_period)};
    console.log(res);
    return res;
}

const getWeatherParams = async (url) => {
    try{
        return await axios.get(url);
    } catch (err){
        console.error(err);
    }
}

const getWaveParams = async (url) => {
    try{
        return await axios.get(url);
    } catch (err){
        console.error(err);
    }
}

const carcIndex = async (lat, lon, temperature, rain_sum, windspeed, wind_direction, wave_height, wave_direction, wave_period) => {
    let index = [0, 0, 0, 0, 0, 0, 0];
    let p = -1

    if (lat <= 35.158) p = 0; //남해
    else if (lon >= 127.269) p = 1; //동해
    else p = 2; //서해

    for (let i = 0; i < 7; i++){
        if (0<wave_height[i] && wave_height[i]<=0.5) index[i] += 1;
        else if (0.5 < wave_height[i] && wave_height[i]<=1.0) index[i] += 2;
        else if (1.0<wave_height[i] && wave_height[i]<=1.5) index[i] += 3;
        else if (1.5<wave_height[i] && wave_height[i]<=2.0) index[i] += 4;
        else index[i] -= 3;
        
        if (temperature[i]<=20) index[i] += 1;
        else if (20<temperature[i]&&temperature[i]<=25) index[i] += 2;
        else if (25<temperature[i]&&temperature[i]<=30) index[i] += 3;
        else if (30<temperature[i]&&temperature[i]<=35) index[i] += 2;
        else  index[i] += 1;

        if (rain_sum[i] <= 5) index[i] += 5;
        else if (5 < rain_sum[i] && rain_sum[i] <= 10) index[i] += 3;
        else index[i] += 1;

        if (0 < windspeed[i] &&windspeed[i]<= 2.5) index[i] += 4;
        else if (2.5 < windspeed[i] &&windspeed[i]<= 5.0) index[i] += 3;
        else if (5.0 < windspeed[i] &&windspeed[i]<= 7.5) index[i] += 2;
        else index[i] += 1

        if (wave_period[i] <= 6) index[i] += 4;
        if (6 < wave_period[i]&&wave_period[i] <= 8) index[i] += 3;
        if (8 < wave_period &&wave_period[i]<= 10) index[i] += 2;    
        else index[i] += 1

        if (p == 0 && 90 <= wave_direction[i] && wave_direction[i]<= 270) index[i] += 5;
        if (p == 1 && 0 <= wave_direction[i] && wave_direction[i]<= 180) index[i] += 5;
        if (p == 2 && 180 <= wave_direction[i] && wave_direction[i]<= 360) index[i] += 5;

        if (p == 0 && 90 <= wind_direction[i] && wind_direction[i]<= 270) index[i] -= 5;
        if (p == 1 && 0 <= wind_direction[i] && wind_direction[i]<= 180) index[i] -= 5;
        if (p == 2 && 180 <= wind_direction[i] && wind_direction[i]<= 360) index[i] -= 5;
    }

    for(let i =0; i<7;i++){
        if(-4 <= index[i] && index[i] < 2) index[i] = 1;
        if(2 <= index[i] && index[i] < 8) index[i] = 2;
        if(8 <= index[i] && index[i] < 14) index[i] = 3;
        if(14 <= index[i] && index[i] < 20) index[i] = 4;
        else index[i] = 5
    }

    return index;
}
/*
{
    "latitude":52.52,
    "longitude":13.419998,
    "generationtime_ms":0.47600269317626953,
    "utc_offset_seconds":32400,
    "timezone":"Asia/Tokyo",
    "timezone_abbreviation":"JST",
    "elevation":38.0,
    "current_weather":
        {
            "temperature":20.9,
            "windspeed":6.32,
            "winddirection":275.0,
            "weathercode":61,
            "is_day":1,
            "time":"2023-07-03T21:00"
        },
    "daily_units":
        {
            "time":"iso8601",
            "temperature_2m_max":"°C",
            "rain_sum":"mm",
            "windspeed_10m_max":"m/s",
            "winddirection_10m_dominant":"°"
        },
    "daily":
        {
            "time":["2023-07-03","2023-07-04","2023-07-05","2023-07-06","2023-07-07","2023-07-08","2023-07-09"],
            "temperature_2m_max":[21.6,23.8,23.9,24.0,26.6,27.4,30.3],
            "rain_sum":[0.10,0.00,0.60,0.00,0.00,0.00,0.00],
            "windspeed_10m_max":[6.32,5.54,4.88,4.00,2.14,2.82,3.72],
            "winddirection_10m_dominant":[254,242,247,246,329,94,113]}}
        */