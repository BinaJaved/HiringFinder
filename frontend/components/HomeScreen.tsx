import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { fetchCompanies } from "../api/backend";
import CompanyCard from "../components/CompanyCard";
import SearchBar from "../components/SearchBar";
import { Company } from "../types";

const HomeScreen: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setCompanies([]);
    try {
      const result = await fetchCompanies(query);
      setCompanies(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ width: "100%" }} behavior="padding">
        <SearchBar onSearch={handleSearch} loading={loading} />
        {loading && <ActivityIndicator animating size="large" />}
        {error && <Text style={styles.error}>{error}</Text>}
      </KeyboardAvoidingView>

      <FlatList
        data={companies}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        renderItem={({ item }) => <CompanyCard company={item} />}
        style={{ width: "100%", marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", alignItems: "center" },
  error: { color: "red", marginTop: 10 },
});

export default HomeScreen;
