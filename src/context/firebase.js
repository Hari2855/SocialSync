import firestore from '@react-native-firebase/firestore';

export const updateUserData = async (userId, updatedData) => {
  try {
    await firestore().collection('users').doc(userId).update(updatedData);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};
