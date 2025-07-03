import AsyncStorage from '@react-native-async-storage/async-storage';
import { slots } from '../store/restaurants';

const restaurantData = slots;

const uploadData = async () => {
  try {
    // Save the entire slots array under a single key
    await AsyncStorage.setItem('slots', JSON.stringify(restaurantData));
    console.log('Data uploaded to local storage');
  } catch (e) {
    console.log('Error uploading data', e);
  }
};

export default uploadData;
