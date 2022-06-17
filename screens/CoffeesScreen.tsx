import { async } from "@firebase/util";
import { StackScreenProps } from "@react-navigation/stack";
import React, {useState} from "react";
import { Button } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
import Coffee from "../components/Coffee";
import CoffeeInput from "../components/CoffeeInput";
import CoffeeContext, { COFFEE_STATUS, ICoffee } from "../context/CoffeeContext";
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where} from "firebase/firestore";
import { StyleSheet } from 'react-native';

const Container=styled.View`
  padding: 8px;
  height: 100%;
  width: 100%;
`;

const Space=styled.View`
  width: 100%;
  height: 8px;
`

const ButtonCustom=styled.Button`
  padding-top: 160px;
  color: #fff;
`;

const coffesRef = collection(getFirestore(), "Coffees");

const CoffeesScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const [coffees, setCoffees]=useState<ICoffee[]>([]);
    const addCoffee=(newCoffee: ICoffee) => {
        setCoffees([...coffees, newCoffee]);
    }

    async function showCoffees() {
        // const docRef = doc(coffesRef, "Cof2");
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        // addCoffee({
        //     name: docSnap.data().name,
        //     price: docSnap.data().price,
        //     status: docSnap.data().status
        // });
        // } else {
        // // doc.data() will be undefined in this case
        // console.log("No such document!");
        // }


        const q = query(coffesRef);

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            addCoffee({
                    name: doc.data().name,
                    price: doc.data().price,
                    status: doc.data().status
                });
            console.log("New coffee!");
            console.log(doc.data());
            
        });
        console.log("All coffees were brought!");
    }

    // async function addCoffeeT() {
    //     await setDoc(doc(coffesRef, "Cof2"), {
    //         name: "CoffeeTest",
    //         price: 1.4,
    //         status: COFFEE_STATUS.PREPARING
    //     });
        
    // }

    return (
        <Container>
            <CoffeeContext.Provider value={{addCoffee}}>
                <CoffeeInput></CoffeeInput>

                <FlatList
                    keyExtractor={(_, index:number)=>index.toString()}
                    data={coffees}
                    renderItem={({item, index}) => (
                        <Coffee coffee={item} index={index}></Coffee>
                    )}></FlatList>
            </CoffeeContext.Provider>
            <ButtonCustom title={"Show existing coffees"} onPress={() => {showCoffees()}}></ButtonCustom>
            {/* <Button title={"Test add coffee"} onPress={() => {addCoffeeT()}}></Button> */}
        </Container>
    )
}

export default CoffeesScreen;
