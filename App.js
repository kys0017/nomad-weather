import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${Constants.expoConfig.extra.apiKey}&units=metric`;
    console.log(url);

    const reponse = await fetch(url);
    let json = await reponse.json();
    console.log(json);

    setDays(json.cod === 200 ? json.daily : daily);
  };

  useEffect(() => {
    getWeather();

    console.log("env", process.env.NODE_ENV);
    console.log("apikey", process.env.API_KEY);
    console.log("extra", Constants.manifest.extra);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{ marginTop: 10 }} />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>{day.temp.day}</Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// StyleSheet.create 은 자동완성 기능을 제공
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    /* ScrollView 에는 flex 를 줄 필요가 없다. */
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
});

// default value
const daily = [
  {
    dt: 1646326800,
    sunrise: 1646306882,
    sunset: 1646347929,
    moonrise: 1646309880,
    moonset: 1646352120,
    moon_phase: 0.03,
    temp: {
      // day: 281.63,
      day: (281.63 / 10).toFixed(1),
      min: 271.72,
      max: 282.21,
      night: 271.72,
      eve: 277.99,
      morn: 280.92,
    },
    feels_like: {
      day: 277.83,
      night: 264.72,
      eve: 273.35,
      morn: 277.66,
    },
    pressure: 1016,
    humidity: 55,
    dew_point: 273.12,
    wind_speed: 9.29,
    wind_deg: 3,
    wind_gust: 16.48,
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
    clouds: 49,
    pop: 0.25,
    rain: 0.11,
    uvi: 3.38,
  },
  {
    dt: 1646326800,
    sunrise: 1646306882,
    sunset: 1646347929,
    moonrise: 1646309880,
    moonset: 1646352120,
    moon_phase: 0.03,
    temp: {
      // day: 285.77,
      day: (285.77 / 10).toFixed(1),
      min: 271.72,
      max: 282.21,
      night: 271.72,
      eve: 277.99,
      morn: 280.92,
    },
    feels_like: {
      day: 277.83,
      night: 264.72,
      eve: 273.35,
      morn: 277.66,
    },
    pressure: 1016,
    humidity: 55,
    dew_point: 273.12,
    wind_speed: 9.29,
    wind_deg: 3,
    wind_gust: 16.48,
    weather: [
      {
        id: 500,
        main: "Clouds",
        description: "few clouds",
        icon: "10d",
      },
    ],
    clouds: 49,
    pop: 0.25,
    rain: 0.11,
    uvi: 3.38,
  },
];
