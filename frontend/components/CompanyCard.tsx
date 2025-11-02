import React from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { Company } from "../types";

interface Props {
  company: Company;
}

const CompanyCard: React.FC<Props> = ({ company }) => {
  const handlePress = () => {
    if (company.url) {
      Linking.openURL(company.url).catch(err =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.name}>{company.name}</Text>
        <Text>{company.roles}</Text>
        <Text style={styles.location}>{company.location}</Text>

        {company.url ? (
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.url}>{company.url}</Text>
          </TouchableOpacity>
        ) : null}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  name: { fontWeight: "700", fontSize: 16 },
  location: { color: "#555" },
  url: { color: "#1a73e8", textDecorationLine: "underline" },
});

export default CompanyCard;
