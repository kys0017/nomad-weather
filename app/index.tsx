import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";

import * as Location from 'expo-location';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function Index() {
    const [city, setCity] = useState("Loading...")
    const [location, setLocation] = useState(null)
    const [ok, setOk] = useState(true)

    const ask = async () => {
        const {granted} = await Location.requestForegroundPermissionsAsync()
        if (!granted) {
            setOk(false)
        }
        const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5})
        const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false})
        setCity(location[0].city ?? '')
    }

    useEffect(() => {
        ask()
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
                contentContainerStyle={styles.weather}>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'tomato'
    },
    city: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: "center"
    },
    cityName: {
        fontSize: 68,
        fontWeight: '500'
    },
    weather: {},
    day: {
        width: SCREEN_WIDTH,
        alignItems: "center",
    },
    temp: {
        marginTop: 50,
        fontSize: 178
    },
    description: {
        marginTop: -30,
        fontSize: 60
    }
})
