tsexport type OccupancySlot = {
  time_slot: string;
  occupancy_level: number;
};

export type OccupancyResponse = {
  location_id: string;
  slots: OccupancySlot[];
};

const BASE_URL = "http://localhost:8000";

export async function fetchOccupancy(locationId: string): Promise<OccupancyResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/occupancy?location_id=${locationId}`);
    if (!res.ok) return null;
    const data = (await res.json()) as OccupancyResponse;
    if (!Array.isArray(data.slots)) return null;
    return data;
  } catch {
    return null;
  }
}