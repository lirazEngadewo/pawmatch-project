import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ORGANIZATIONS = [
  { id: 1,  name: 'Northern Animals Association', city: 'Safed',          region: 'Upper Galilee',       lat: 32.965, lng: 35.497, phone: '04-682-1234' },
  { id: 2,  name: 'Warm Home for Animals',        city: 'Kiryat Shmona',  region: 'Upper Galilee',       lat: 33.207, lng: 35.570, phone: '04-694-3456' },
  { id: 3,  name: 'Youth Village Association',    city: 'Tiberias',       region: 'Lower Galilee',       lat: 32.795, lng: 35.530, phone: '04-671-2345' },
  { id: 4,  name: 'Animal Lovers of Nazareth',    city: 'Nazareth',       region: 'Lower Galilee',       lat: 32.699, lng: 35.303, phone: '04-657-4321' },
  { id: 5,  name: 'Haifa Adoption Association',   city: 'Haifa',          region: 'Haifa and Krayot',    lat: 32.794, lng: 34.989, phone: '04-852-1234' },
  { id: 6,  name: 'Paws and Hearts',              city: 'Kiryat Bialik',  region: 'Haifa and Krayot',    lat: 32.835, lng: 35.090, phone: '04-873-4567' },
  { id: 7,  name: 'Loving Home for Animals',      city: 'Herzliya',       region: 'Sharon',              lat: 32.167, lng: 34.844, phone: '09-954-3210' },
  { id: 8,  name: 'Sharon Association',           city: 'Hod HaSharon',   region: 'Sharon',              lat: 32.154, lng: 34.896, phone: '09-741-2345' },
  { id: 9,  name: 'Tel Aviv Adoption',            city: 'Tel Aviv',       region: 'Center',              lat: 32.087, lng: 34.782, phone: '03-723-4567' },
  { id: 10, name: 'Animals of Ramat Gan',         city: 'Ramat Gan',      region: 'Center',              lat: 32.082, lng: 34.814, phone: '03-612-3456' },
  { id: 11, name: 'Jerusalem Adoption Association', city: 'Jerusalem',    region: 'Jerusalem',           lat: 31.768, lng: 35.214, phone: '02-623-4567' },
  { id: 12, name: 'Warm Home Beit Shemesh',       city: 'Beit Shemesh',   region: 'Jerusalem',           lat: 31.745, lng: 34.987, phone: '02-991-2345' },
  { id: 13, name: 'Shephelah Animals',            city: 'Rehovot',        region: 'Shephelah',           lat: 31.894, lng: 34.808, phone: '08-934-5678' },
  { id: 14, name: 'Animal Lovers of Rishon',      city: 'Rishon LeZion',  region: 'Shephelah',           lat: 31.964, lng: 34.804, phone: '03-951-2345' },
  { id: 15, name: 'Negev Association',            city: "Be'er Sheva",    region: 'South',               lat: 31.243, lng: 34.791, phone: '08-623-4567' },
  { id: 16, name: 'Eilat Animals',                city: 'Eilat',          region: 'South',               lat: 29.557, lng: 34.952, phone: '08-631-2345' },
];

const pawIcon = L.divIcon({
  className: 'leaflet-paw-icon',
  html: `<div class="paw-icon-circle">🐾</div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -42],
});

function IsraelMap({ height = '500px', compact = false }) {
  const { t } = useTranslation();

  return (
    <section className={`israel-map-section${compact ? ' israel-map-section--compact' : ''}`}>
      <div className="israel-map-header">
        <p className="eyebrow">{t('map.eyebrow')}</p>
        <h2 className="israel-map-title">{t('map.title')}</h2>
        <p className="israel-map-subtitle">{t('map.subtitle')}</p>
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
                <div className="map-popup">
                  <h4 className="map-popup-name">{org.name}</h4>
                  <p className="map-popup-row"><span>{t('map.city')}:</span> {org.city}</p>
                  <p className="map-popup-row"><span>{t('map.region')}:</span> {org.region}</p>
                  <p className="map-popup-row"><span>{t('map.phone')}:</span> {org.phone}</p>
                  <button type="button" className="map-popup-btn">{t('map.contact')}</button>
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
