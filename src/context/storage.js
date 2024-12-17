import storage from '@react-native-firebase/storage';

export const uploadImageToStorage = async uri => {
  try {
    const filename = uri.split('/').pop();
    const reference = storage().ref(filename);
    await reference.putFile(uri);
    const url = await reference.getDownloadURL();
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
