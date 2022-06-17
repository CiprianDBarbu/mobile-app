import React from "react";
import {StyleSheet, Text} from "react-native";
import styled from "styled-components";
import { COFFEE_STATUS, ICoffee } from "../context/CoffeeContext";
import { View } from "./Themed";

const Title = styled.Text`
font-weight: bold;
text-align: center;
`;

const labelMap: { [key in COFFEE_STATUS]: string } = {
    [COFFEE_STATUS.WAITING]: "WAITING",
    [COFFEE_STATUS.PREPARING]: "PREPARING",
    [COFFEE_STATUS.DONE]: "DONE"
}

const Coffee: React.FC<{ coffee: ICoffee, index: number }> = ({coffee, index}) => {
    const {status, name, price} = coffee;
    return (
        <View style={styles.container}>
            <Title>{name}</Title>
            <Text>{price}</Text>
            <Text>{labelMap[status]}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        borderStyle: "solid",
        borderColor: "black",
        backgroundColor: "white",
        borderRadius:1,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:4
    }
});

export default Coffee;
