import { Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "../components/HomeScreen";

export default function App() {
  return (
    <PaperProvider>
      <HomeScreen />
    </PaperProvider>
  );
}
