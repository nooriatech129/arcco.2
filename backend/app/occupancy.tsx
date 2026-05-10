import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { fetchOccupancy } from "./src/api/occupancy";

export default function OccupancyScreen() {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchOccupancy("gym-1");
      if (!data) {
        setError("Could not load occupancy data");
        setLoading(false);
        return;
      }
      setSlots(data.slots);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );

  if (error) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{error}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={slots}
        keyExtractor={(item) => item.time_slot}
        renderItem={({ item }) => (
          <Text style={{ paddingVertical: 10 }}>
            {item.time_slot} — {item.occupancy_level}%
          </Text>
        )}
      />
    </View>
  );
}