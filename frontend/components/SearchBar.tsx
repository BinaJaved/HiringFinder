import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<Props> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="e.g. AI startups hiring in Canada"
        value={query}
        onChangeText={setQuery}
      />
      <Button
        mode="contained"
        onPress={() => onSearch(query)}
        disabled={!query || loading}
        style={styles.button}
      >
        {loading ? "Searching..." : "Find Companies"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 8 },
  button: { marginBottom: 8 },
});

export default SearchBar;
