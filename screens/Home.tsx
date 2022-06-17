import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { signOut, getAuth } from 'firebase/auth';
import { StackScreenProps } from '@react-navigation/stack';
import styled from "styled-components";

const auth = getAuth();

const Spacer=styled.View`
    width: 100%;
    height: 16px;
`;

const ButtonCustom=styled.Button`
    width: 200px;
    background: #fff;
`;

const HomeScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user?.email}!</Text>

      <ButtonCustom title="Go to coffees" style={styles.button} onPress={() => navigation.navigate("Coffees")}></ButtonCustom>
      <Spacer></Spacer>
      <ButtonCustom title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    marginTop: 10,
    width: 200,
    backgroundColor: "red"
  },
  
  text: {
    marginBottom: 150,
    fontSize: 20,
  }
});

export default HomeScreen;
