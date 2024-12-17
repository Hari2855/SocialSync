import React, {createContext, useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const userDoc = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .get();
        const userData = userDoc.exists ? userDoc.data() : {};

        const userProfile = {
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL || userData.photo,
          phone: userData.phone || '',
          address: userData.address || '',
        };
        setUser(userProfile);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUser = async updatedData => {
    setUser(prevUser => ({...prevUser, ...updatedData}));
    await firestore().collection('users').doc(user.id).update(updatedData);
  };

  const logoutUser = async () => {
    await auth().signOut();
    setUser(null);
  };

  if (isLoading) {
    return null;
  }

  return (
    <UserContext.Provider value={{user, updateUser, logoutUser}}>
      {children}
    </UserContext.Provider>
  );
};
