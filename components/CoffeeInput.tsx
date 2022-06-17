import React, {useState} from "react";
import styled from "styled-components";
import {StyleSheet, Text, TextInput} from "react-native";
import { COFFEE_STATUS, useCoffeeContext } from "../context/CoffeeContext";
import { Button } from "react-native-elements";
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";

const Container = styled.View`
    width: 100%;
    flex-direction: row;
`

const Input = styled.TextInput`
  min-height: 50px;
  padding: 4px;
  border-radius: 4px;
  flex: 1;
  margin-bottom: 16px;
`

const coffesRef = collection(getFirestore(), "Coffees");

const CoffeeInput = () => {
    const {addCoffee} = useCoffeeContext();
    const [syrup, setSyrup] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [client, setClient] = useState<string>('');

    async function addCoffeeToDB() {
        await setDoc(doc(coffesRef, "Coffee with " + syrup + " for " + client), {
            name: "Coffee with " + syrup + " for " + client,
            price: price,
            status: COFFEE_STATUS.WAITING
        });
        console.log("Coffee added succesfully to DB!");
    }

    const handleAdd = () => {
        if(syrup && client) {
            addCoffee({
                name: "Coffee with " + syrup + " for " + client,
                price: price,
                status: COFFEE_STATUS.WAITING
            });

            addCoffeeToDB();

            setSyrup('');
            setPrice(0);
            setClient('');
        }
    }

    return (
        <Container style={styles.inputContainer}>
            <Input style={styles.input}
                placeholder={"Syrup"}
                value={syrup}
                onChangeText={setSyrup}>
            </Input>

            <Input style={styles.input}
                placeholder={"Price"}
                value={price}
                onChangeText={setPrice}>
            </Input>

            <Input style={styles.input}
                placeholder={"Client"}
                value={client}
                onChangeText={setClient}>
            </Input>

            <Button title={"Add new coffee"} style={{width:60}} onPress={handleAdd}></Button>
        </Container>
    )
}

const styles = StyleSheet.create({
    editText: {
        fontSize: 32,
        color: 'white',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 20,
        backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer:{
        width: '100%',
        paddingTop: 40,
        flex: 1,
        flexDirection: 'column',
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5,
        height: 50
    },
});

export default CoffeeInput;
