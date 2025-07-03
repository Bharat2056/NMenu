const uploadData = async () => {
  try {
    console.log("Starting data upload...");

    // Upload Restaurants
    for (let i = 0; i < restaurants.length; i++) {
      const restaurant = restaurants[i];
      const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`);
      await setDoc(docRef, restaurant);
      console.log(`✅ Uploaded restaurant_${i + 1}`);
    }

    // Upload Carousel Images
    console.log("Uploading carousel images...");
    for (let i = 0; i < carouselImages.length; i++) {
      const image = carouselImages[i];
      const docRef = doc(collection(db, "carousel"), `carousel_${i + 1}`);
      await setDoc(docRef, image);
      console.log(`✅ Uploaded carousel_${i + 1}`);
    }

    // Upload Slots
    console.log("Uploading slots...");
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const docRef = doc(collection(db, "slots"), `slot_${i + 1}`);
      await setDoc(docRef, slot);
      console.log(`✅ Uploaded slot_${i + 1}`);
    }

    console.log("🎉 All data uploaded successfully.");
  } catch (e) {
    console.error("❌ Error uploading data:", e);
  }
};

export default uploadData;
