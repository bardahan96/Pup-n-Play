import { useState } from "react";

export default function AddressAutocomplete({ onSelectLocation }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) return setSuggestions([]);

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    const coordinates = {
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
    };
    onSelectLocation(coordinates);
  };

  // חישוב של מרחק - נוסיף את זה לקומפוננטה של אילת בהמך
  function calculateDistanceInKm(coord1, coord2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // רדיוס כדור הארץ בק״מ
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lon - coord1.lon);

    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
  //

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="הקלד כתובת" style={{ width: "100%", padding: "8px" }} />
      {suggestions.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {suggestions.map((place) => (
            <li key={place.place_id} onClick={() => handleSelect(place)} style={{ cursor: "pointer", padding: "6px 0" }}>
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
