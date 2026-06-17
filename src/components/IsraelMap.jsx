import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ORGANIZATIONS = [
  { id: 1,  name: 'עמותת חיות הצפון',       city: 'צפת',            region: 'גליל עליון',      lat: 32.965, lng: 35.497, phone: '04-682-1234' },
  { id: 2,  name: 'בית חם לחיות',            city: 'קריית שמונה',    region: 'גליל עליון',      lat: 33.207, lng: 35.570, phone: '04-694-3456' },
  { id: 3,  name: 'עמותת כפר הנוער',         city: 'טבריה',          region: 'גליל תחתון',      lat: 32.795, lng: 35.530, phone: '04-671-2345' },
  { id: 4,  name: 'אוהבי בעלי חיים',         city: 'נצרת',           region: 'גליל תחתון',      lat: 32.699, lng: 35.303, phone: '04-657-4321' },
  { id: 5,  name: 'עמותת חיפה לאימוץ',       city: 'חיפה',           region: 'חיפה והקריות',    lat: 32.794, lng: 34.989, phone: '04-852-1234' },
  { id: 6,  name: 'כפות ולבבות',             city: 'קריית ביאליק',   region: 'חיפה והקריות',    lat: 32.835, lng: 35.090, phone: '04-873-4567' },
  { id: 7,  name: 'בית אוהב לחיות',          city: 'הרצליה',         region: 'השרון',           lat: 32.167, lng: 34.844, phone: '09-954-3210' },
  { id: 8,  name: 'עמותת השרון',             city: 'הוד השרון',      region: 'השרון',           lat: 32.154, lng: 34.896, phone: '09-741-2345' },
  { id: 9,  name: 'אימוץ תל אביב',           city: 'תל אביב',        region: 'מרכז',            lat: 32.087, lng: 34.782, phone: '03-723-4567' },
  { id: 10, name: 'חיות ברמת גן',            city: 'רמת גן',         region: 'מרכז',            lat: 32.082, lng: 34.814, phone: '03-612-3456' },
  { id: 11, name: 'עמותת ירושלים לאימוץ',    city: 'ירושלים',        region: 'ירושלים',         lat: 31.768, lng: 35.214, phone: '02-623-4567' },
  { id: 12, name: 'בית חם בית שמש',          city: 'בית שמש',        region: 'ירושלים',         lat: 31.745, lng: 34.987, phone: '02-991-2345' },
  { id: 13, name: 'חיות השפלה',              city: 'רחובות',         region: 'שפלה',            lat: 31.894, lng: 34.808, phone: '08-934-5678' },
  { id: 14, name: 'אוהבי חיות ראשל"צ',      city: 'ראשון לציון',    region: 'שפלה',            lat: 31.964, lng: 34.804, phone: '03-951-2345' },
  { id: 15, name: 'עמותת הנגב',              city: 'באר שבע',        region: 'דרום',            lat: 31.243, lng: 34.791, phone: '08-623-4567' },
  { id: 16, name: 'חיות אילת',               city: 'אילת',           region: 'דרום',            lat: 29.557, lng: 34.952, phone: '08-631-2345' },
];

const pawIcon = L.divIcon({
  className: 'leaflet-paw-icon',
  html: `<div class="paw-icon-circle">🐾</div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -42],
});

function IsraelMap({ height = '500px', compact = false }) {
  return (
    <section className={`israel-map-section${compact ? ' israel-map-section--compact' : ''}`}>
      <div className="israel-map-header">
        <p className="eyebrow">רשת האימוץ שלנו</p>
        <h2 className="israel-map-title">עמותות האימוץ ברחבי הארץ</h2>
        <p className="israel-map-subtitle">לחצו על הסמנים לפרטים נוספים</p>
      </div>

      <div className="israel-map-container">
        <MapContainer
          center={[31.5, 35.0]}
          zoom={7}
          style={{ height, width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {ORGANIZATIONS.map((org) => (
            <Marker key={org.id} position={[org.lat, org.lng]} icon={pawIcon}>
              <Popup>
                <div className="map-popup" dir="rtl">
                  <h4 className="map-popup-name">{org.name}</h4>
                  <p className="map-popup-row"><span>עיר:</span> {org.city}</p>
                  <p className="map-popup-row"><span>איזור:</span> {org.region}</p>
                  <p className="map-popup-row"><span>טלפון:</span> {org.phone}</p>
                  <button type="button" className="map-popup-btn">צור קשר</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}

export default IsraelMap;
