-- ============================================================
-- SECTION 1: INSERT 12 new pets
-- Fixed: removed 'species' column (not in table), English city
-- names, match_percent quoted as text
-- ============================================================

INSERT INTO pets (
  id, name, type, breed, age, gender, size, location,
  match_percent, description, short_description, about, tags, image,
  gallery_images, vaccination_status, energy_level, medical_history,
  special_needs, shelter_name, shelter_address, shelter_phone,
  adoption_fee, adoption_requirements, similar_pet_ids
) VALUES

-- 1. Max – Border Collie – Tel Aviv (Center)
(
  'max', 'Max', 'Border Collie', 'Border Collie', '2 years', 'Male', 'Medium', 'Tel Aviv',
  '91',
  'A brilliant, energetic herding dog who thrives on activity, learning, and a devoted owner.',
  'A brilliant, energetic herding dog who thrives on activity and learning.',
  'Max arrived at the shelter after his owner suffered a medical emergency and could no longer care for an active dog. Despite the upheaval, Max adapted quickly and showed off his impressive vocabulary of commands within the first week. Border Collies are the Einsteins of the dog world, and Max is no exception -- he needs a job to do or a puzzle to solve every day. He excels at agility, frisbee, and any game that lets him run and think at the same time. Max would thrive with an experienced owner who can channel his energy and intelligence into a fulfilling daily routine.',
  ARRAY['Super intelligent', 'High energy', 'Loves agility', 'Needs active home'],
  'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1529286021748-c7f79fdf5350?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Very high - needs 2+ hours of exercise and mental stimulation daily',
  'Neutered, hip screening clear, excellent health',
  'Requires daily mental stimulation to prevent boredom',
  'עמותת אוהבי חיות תל אביב', 'רחוב לה גרדיה 11, תל אביב', '03-555-0101',
  '₪450',
  ARRAY['Active household required', 'Experience with working dog breeds preferred', 'Must be 21 or older'],
  ARRAY['luna', 'rocky', 'nala']
),

-- 2. Nala – German Shepherd – Ramat Gan (Center)
(
  'nala', 'Nala', 'German Shepherd', 'German Shepherd', '4 years', 'Female', 'Large', 'Ramat Gan',
  '88',
  'A loyal, protective companion with a gentle soul and an unwavering devotion to her family.',
  'A loyal, protective companion with a gentle soul and unwavering devotion.',
  'Nala was brought to the shelter when her previous owner moved abroad and made the painful decision to leave her behind. She settled in quickly, earning the trust of every staff member with her gentle, dignified temperament. Despite her imposing size, Nala is an incredibly gentle dog who loves soft ear scratches, slow evening walks, and sitting quietly beside her favorite person. She has solid obedience training and walks beautifully on a leash. Nala is cautious with strangers but forms an unbreakable bond with her family once trust is established. She would do best as the only pet in a home where she can be the undivided center of attention.',
  ARRAY['Loyal companion', 'Protective', 'Obedience trained', 'Prefers to be only pet'],
  'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1597300122534-539571bcc74f?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated and up to date',
  'Medium-high - daily walks and training sessions',
  'Spayed, healthy, degenerative myelopathy screening negative',
  'None',
  'מקלט עיריית רמת גן', 'רחוב ביאליק 29, רמת גן', '03-555-0202',
  '₪500',
  ARRAY['Experience with large breeds preferred', 'No children under 6 in the household', 'Must be 25 or older'],
  ARRAY['duke', 'rex', 'max']
),

-- 3. Leo – Persian Cat – Hod HaSharon (Sharon)
(
  'leo', 'Leo', 'Persian Cat', 'Persian', '6 years', 'Male', 'Medium', 'Hod HaSharon',
  '85',
  'A regal Persian with a silky coat and a laid-back personality, perfect for a quiet household.',
  'A regal Persian with a silky coat and a perfectly laid-back personality.',
  'Leo was brought to the shelter after his owner''s landlord changed the pet policy, leaving Leo without a home through no fault of his own. He arrived carrying himself with all the dignity you''d expect from a Persian -- slow blinking at newcomers, inspecting every corner methodically, and then settling in as if he owned the place. Leo is wonderfully calm, content to drape himself across soft furniture and accept petting sessions on his own schedule. His long, silky coat needs daily combing to stay tangle-free, but for those willing to invest the time, Leo repays with deep purrs and gentle companionship. He would thrive in a quiet adult home where his peaceful nature is truly matched.',
  ARRAY['Calm and regal', 'Indoor cat', 'Needs daily grooming', 'Quiet home preferred'],
  'https://images.unsplash.com/photo-1518791841217-8f162f1912fa?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1559229230-d8c86ea5de44?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1501820488136-72669149e0d7?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Low - gentle play and long peaceful nap sessions',
  'Neutered, routine tear duct cleaning, otherwise healthy',
  'Daily brushing required; eye area needs gentle wiping',
  'עמותת חסד לחיות השרון', 'רחוב הנרקיס 12, הוד השרון', '09-555-0303',
  '₪300',
  ARRAY['Quiet household preferred', 'Indoor-only home required', 'Grooming commitment expected'],
  ARRAY['whiskers', 'simba', 'zoe']
),

-- 4. Zoe – Ragdoll Cat – Herzliya (Sharon)
(
  'zoe', 'Zoe', 'Ragdoll Cat', 'Ragdoll', '1 year', 'Female', 'Medium', 'Herzliya',
  '93',
  'A floppy, blue-eyed beauty who melts into your arms and fills every room with soft purrs.',
  'A floppy, blue-eyed beauty who melts into your arms and purrs constantly.',
  'Zoe was brought to the shelter by a family who discovered their toddler had developed a cat allergy. Despite the difficult circumstances, Zoe arrived as one of the most sociable cats we have ever received -- she immediately began greeting visitors and flopping dramatically onto anyone who offered their lap. True to her Ragdoll nature, she goes completely limp when picked up, earning herself the nickname "noodle cat" among the staff. Zoe loves being carried around the house, watching birds from window perches, and playing with feathery wands. She is young enough to bond quickly and calm enough to suit a wide range of households.',
  ARRAY['Super affectionate', 'Goes floppy when held', 'Great with children', 'Indoor cat'],
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd9f3?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Low-medium - gentle play and lots of cuddle time',
  'Spayed, HCM screening scheduled, currently healthy',
  'None',
  'עמותת "חיות עם לב" הרצליה', 'רחוב סוקולוב 8, הרצליה', '09-555-0404',
  '₪350',
  ARRAY['Indoor-only home required', 'No dogs in the home', 'Must be 18 or older'],
  ARRAY['milo', 'leo', 'penny']
),

-- 5. Nyx – Russian Blue – Jerusalem (Jerusalem)
(
  'nyx', 'Nyx', 'Russian Blue Cat', 'Russian Blue', '3 years', 'Female', 'Small', 'Jerusalem',
  '87',
  'A sleek, silver-coated beauty who chooses her people carefully and loves them fiercely.',
  'A sleek, silver-coated beauty who chooses her people carefully and loves fiercely.',
  'Nyx was found as a stray near the Old City and brought to the shelter, though her gentle nature and comfort around people suggest she was someone''s beloved pet who got lost. She is reserved at first -- Russian Blues are famously cautious with strangers -- but once she decides you''re trustworthy, the loyalty she offers is extraordinary. She follows her favorite person room to room, chirps softly to ask for attention, and loves to sit at eye level and gaze at you with her striking green eyes. Nyx is quiet, clean, and low-shedding, making her an excellent fit for a calm apartment lifestyle. She does best as an only pet or alongside another gentle, calm cat.',
  ARRAY['Reserved but deeply loyal', 'Low shedding', 'Hypoallergenic-friendly', 'Best as only pet'],
  'https://images.unsplash.com/photo-1537430703400-25dc9e06b1bb?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1564929431768-3a6cc5a7e7d5?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1580345124132-de9fbb3c8e94?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1556271532-e7ec4e4de8f4?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Low-medium - calm with periodic bursts of playfulness',
  'Spayed, microchipped, fully healthy',
  'None',
  'אגודת צער בעלי חיים ירושלים', 'רחוב יפו 100, ירושלים', '02-555-0505',
  '₪280',
  ARRAY['Quiet household preferred', 'Indoor-only home required', 'Patient owner willing to allow adjustment time'],
  ARRAY['milo', 'oreo', 'zoe']
),

-- 6. Baxter – Australian Shepherd – Beit Shemesh (Jerusalem)
(
  'baxter', 'Baxter', 'Australian Shepherd', 'Australian Shepherd', '3 years', 'Male', 'Medium', 'Beit Shemesh',
  '89',
  'A colorful, quick-witted Aussie who is always one step ahead and eager to impress.',
  'A colorful, quick-witted Aussie who is always one step ahead and eager to impress.',
  'Baxter came to us when his owner relocated for work and could not take him along. He brought his full personality with him from day one -- herding the other dogs at play time, alerting staff to anything unusual, and winning everyone over with his heterochromatic eyes and merle coat. Baxter is whip-smart and responds to commands with the kind of precision that makes trainers smile. He thrives on structure, regular exercise, and having a clear purpose. He is fantastic with older children and would excel at dog sports, hiking, or any activity that lets him move and think simultaneously. Baxter will reward the right owner with deep loyalty and endless entertainment.',
  ARRAY['Highly intelligent', 'Great at dog sports', 'Loves structure', 'Stunning merle coat'],
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1558929996-da64ba858215?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1551717743-68d29b8cb682?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1605897472359-85e4b94d685d?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'High - needs 90+ minutes of activity daily',
  'Neutered, MDR1 gene tested negative, healthy',
  'None',
  'מקלט בעלי חיות בית שמש', 'רחוב נחל שרש 5, בית שמש', '02-555-0606',
  '₪450',
  ARRAY['Active lifestyle required', 'Fenced yard preferred', 'Experience with herding breeds a plus'],
  ARRAY['luna', 'coco', 'max']
),

-- 7. Mochi – Bengal Cat – Kiryat Bialik (Haifa and Krayot)
(
  'mochi', 'Mochi', 'Bengal Cat', 'Bengal', '2 years', 'Female', 'Medium', 'Kiryat Bialik',
  '84',
  'A wild-looking beauty with a house-cat heart who brings the jungle to your living room.',
  'A wild-looking beauty with a house-cat heart -- brings the jungle to your living room.',
  'Mochi was surrendered by a first-time cat owner who underestimated how much personality comes packed into a Bengal. She is stunning -- a rosette-patterned coat that shimmers in sunlight -- and she knows it. Mochi demands activity, interaction, and enrichment every single day. She loves leash walks (yes, really), puzzle feeders, and anything involving running water. She has a playful, mischievous energy that keeps her owners on their toes, but in the evenings she transforms into a surprisingly cuddly companion who curls up and purrs loudly. Mochi would thrive with an experienced cat owner who is ready for a genuine adventure.',
  ARRAY['Active and curious', 'Loves water play', 'Leash trainable', 'Needs daily enrichment'],
  'https://images.unsplash.com/photo-1615789591457-74a63395c990?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1504006833117-8886a355efbf?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1501820488136-72669149e0d7?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1595924023546-08e8be6a4b50?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Very high - needs interactive play and environmental enrichment daily',
  'Spayed, PK deficiency tested negative, healthy',
  'Requires puzzle feeders and interactive toys to stay mentally engaged',
  'עמותת "אהבה לחיות" קריות', 'רחוב הרצל 22, קריית ביאליק', '04-555-0707',
  '₪400',
  ARRAY['Experience with cats required', 'Indoor-only home required', 'Cannot live with birds or small rodents'],
  ARRAY['oreo', 'penny', 'nyx']
),

-- 8. Duke – Boxer – Haifa (Haifa and Krayot)
(
  'duke', 'Duke', 'Boxer', 'Boxer', '5 years', 'Male', 'Large', 'Haifa',
  '90',
  'A goofy, lovable clown who bounds through life with boundless joy and no concept of personal space.',
  'A goofy, lovable clown who bounds through life with boundless joy.',
  'Duke was brought to the shelter when his owner passed away and no family member could take him in. He was clearly the center of someone''s world -- housebroken, leash trained, and deeply comfortable with people of all ages. Duke has that classic Boxer personality: exuberant, silly, and absolutely certain that every human he meets is his best friend. He will lean against your legs, rest his heavy head in your lap, and look up at you with the most soulful eyes you have ever seen. Duke is patient with children and plays well with other large dogs. He needs a committed owner who can laugh at his antics and match his enthusiasm for life.',
  ARRAY['Goofy and loving', 'Great with kids', 'Very affectionate', 'Loves to lean on people'],
  'https://images.unsplash.com/photo-1546510816-7b2e0a5d9e18?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1591160690555-5d7ca3dd7f2c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Medium-high - daily walks and boisterous play sessions',
  'Neutered, cardiac screening clear, healthy for his age',
  'Sensitive to extreme heat; avoid midday walks in summer',
  'מקלט עיריית חיפה', 'שדרות מוריה 14, חיפה', '04-555-0808',
  '₪400',
  ARRAY['Active household required', 'Climate-controlled home during summer', 'Must be 21 or older'],
  ARRAY['rocky', 'nala', 'baxter']
),

-- 9. Sandy – Canaan Dog – Eilat (South)
(
  'sandy', 'Sandy', 'Canaan Dog', 'Canaan Dog', '2 years', 'Female', 'Medium', 'Eilat',
  '82',
  'An agile, ancient Israeli breed with sharp instincts and a heart that bonds deeply to her chosen person.',
  'An agile, ancient Israeli breed with sharp instincts and deep devotion to her person.',
  'Sandy is a Canaan Dog -- Israel''s own native breed, as ancient as the land itself. She was brought in by a hiker who found her wandering near the Eilat mountains, clearly healthy and socialized but without identification. The Canaan Dog is unlike any other breed: independent, alert, and extraordinarily perceptive. Sandy reads the room with uncanny accuracy, adjusting her energy to match those around her. She is playful and affectionate with people she trusts, but takes time to warm up to strangers -- a trait deeply embedded in the breed''s desert-watchdog heritage. Sandy deserves an experienced, patient owner who respects her intelligence and gives her the gentle consistency she needs to truly flourish.',
  ARRAY['Israeli native breed', 'Alert and perceptive', 'Bonds deeply', 'Experienced owner preferred'],
  'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1512361436605-a484bebb9c81?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1511895426328-dc8714191011?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1542315192-1f61a1792f33?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Medium-high - daily outdoor activity, best in early morning or evening',
  'Spayed, microchipped, excellent health',
  'Walks best in cooler hours during hot weather',
  'עמותת "חיות אילת"', 'רחוב אורנים 5, אילת', '08-555-0909',
  '₪380',
  ARRAY['Experience with independent breeds required', 'Fenced yard preferred', 'Must be 21 or older'],
  ARRAY['bella', 'coco', 'baxter']
),

-- 10. Thor – Siberian Husky – Kiryat Shmona (Upper Galilee)
(
  'thor', 'Thor', 'Siberian Husky', 'Siberian Husky', '3 years', 'Male', 'Large', 'Kiryat Shmona',
  '86',
  'A striking wolf-like dog with icy blue eyes, boundless energy, and an operatic howl.',
  'A striking wolf-like dog with icy blue eyes, boundless energy, and an operatic howl.',
  'Thor came to the shelter when his owners moved to a small city apartment and realized they could no longer meet his considerable exercise needs. He is in peak physical condition -- muscular, gleaming coat, utterly magnificent -- and he knows how to use those piercing blue eyes to get exactly what he wants. Thor is a typical Husky: dramatic, mischievous, stubborn when he chooses to be, and capable of more love than you''d expect from a dog that looks like he belongs in the wilderness. He gets along well with other dogs and is wonderful with older children. Thor would absolutely thrive in the cooler northern climate of the Galilee and needs an owner with patience, humor, and a very sturdy fence.',
  ARRAY['Striking blue eyes', 'High energy', 'Good with other dogs', 'Needs secure yard'],
  'https://images.unsplash.com/photo-1617895153857-82fe79b53a3d?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1605726706479-4c59e8edaca6?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1549221987-25a490f65d34?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1617859047452-8510bcf207fd?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Very high - needs 2+ hours of vigorous daily exercise',
  'Neutered, eye exam clear, healthy',
  'Cannot tolerate extreme heat; thrives in cooler climates',
  'מקלט חיות גליל עליון', 'רחוב תל חי 18, קריית שמונה', '04-555-1010',
  '₪500',
  ARRAY['Experience with Nordic breeds required', 'Securely fenced yard mandatory', 'Must be 21 or older'],
  ARRAY['rocky', 'max', 'duke']
),

-- 11. Olive – Domestic Longhair – Nazareth (Lower Galilee)
(
  'olive', 'Olive', 'Domestic Longhair Cat', 'Domestic Longhair', '4 years', 'Female', 'Small', 'Nazareth',
  '88',
  'A soft, tufted beauty with an old-soul calm who chooses one person to adore completely.',
  'A soft, tufted beauty with an old-soul calm who chooses one person to adore completely.',
  'Olive was brought to the shelter after her elderly owner entered a care facility. She spent most of her life as a devoted companion to a quiet household, and that upbringing shows in everything she does -- the careful, composed way she explores a new space, the steady purr she offers once she finally trusts you, the way she settles beside her person like a warm shadow. Olive is not a cat who gives her affection freely, but when she does, it is deeply felt. She would flourish in a calm adult home where she can take her time adjusting and eventually claim the lap of someone who will love her back just as quietly and completely.',
  ARRAY['Quietly devoted', 'One-person cat', 'Indoor cat', 'Calm home needed'],
  'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1516750930166-ed88ab1adb61?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'Low - gentle play and long peaceful stretches',
  'Spayed, dental scaling done, healthy',
  'Weekly brushing for her medium-length coat',
  'עמותת "רחמים לחיות" נצרת', 'רחוב אל-בשארה 7, נצרת', '04-555-1111',
  '₪250',
  ARRAY['Quiet home preferred', 'Indoor-only home required', 'Must be 21 or older'],
  ARRAY['simba', 'whiskers', 'leo']
),

-- 12. Rex – Labrador Mix – Rehovot (Shephelah)
(
  'rex', 'Rex', 'Labrador Mix', 'Labrador Mix', '18 months', 'Male', 'Large', 'Rehovot',
  '92',
  'A friendly, tail-wagging bundle who greets the world with enthusiasm and zero reservations.',
  'A friendly, tail-wagging bundle who greets the world with enthusiasm and zero reservations.',
  'Rex was surrendered as a young dog when his family''s new baby made caring for an energetic large dog overwhelming. He arrived at the shelter full of energy and goodwill, making friends with every staff member within hours. Rex has the classic Labrador personality -- open, joyful, enthusiastic -- amplified with a hint of mystery from his mixed heritage. He is already house-trained, responds well to basic commands, and has a natural patience that makes him great with older children and calm with other dogs. Rex would be perfectly happy with a long morning run, an afternoon of fetch, and an evening curled up at your feet. He is the kind of dog who makes every day feel like a good day.',
  ARRAY['Friendly and open', 'House trained', 'Loves fetch', 'Great family dog'],
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1611003229186-1e4e48ed33e3?auto=format&fit=crop&w=400&q=80'
  ],
  'Fully vaccinated',
  'High - enthusiastic about all forms of exercise',
  'Neutered, hip screening clear, healthy',
  'None',
  'עמותת "כלב נאמן" רחובות', 'רחוב הרצל 56, רחובות', '08-555-1212',
  '₪420',
  ARRAY['Active household required', 'Fenced yard or daily park visits', 'Must be 18 or older'],
  ARRAY['luna', 'rocky', 'bella']
);


-- ============================================================
-- SECTION 2: UPDATE existing 10 pets – Hebrew → English city names
-- ============================================================

UPDATE pets SET location = 'Tel Aviv'         WHERE id = 'milo';
UPDATE pets SET location = 'Herzliya'         WHERE id = 'luna';
UPDATE pets SET location = 'Rishon LeZion'    WHERE id = 'bella';
UPDATE pets SET location = 'Haifa'            WHERE id = 'simba';
UPDATE pets SET location = 'Be''er Sheva'     WHERE id = 'rocky';
UPDATE pets SET location = 'Jerusalem'        WHERE id = 'daisy';
UPDATE pets SET location = 'Tiberias'         WHERE id = 'oreo';
UPDATE pets SET location = 'Safed'            WHERE id = 'coco';
UPDATE pets SET location = 'Ramat Gan'        WHERE id = 'whiskers';
UPDATE pets SET location = 'Beit Shemesh'     WHERE id = 'penny';


-- ============================================================
-- SECTION 3: UPDATE user_preferences – Hebrew → English region names
-- Adjust the column name below if yours differs (e.g. preferred_regions,
-- region, location_preference, etc.)
-- ============================================================

UPDATE user_preferences
SET preferred_location = CASE preferred_location
  WHEN 'מרכז'            THEN 'Center'
  WHEN 'השרון'           THEN 'Sharon'
  WHEN 'ירושלים'         THEN 'Jerusalem'
  WHEN 'חיפה והקריות'    THEN 'Haifa and Krayot'
  WHEN 'דרום'            THEN 'South'
  WHEN 'גליל עליון'      THEN 'Upper Galilee'
  WHEN 'גליל תחתון'      THEN 'Lower Galilee'
  WHEN 'שפלה'            THEN 'Shephelah'
  ELSE preferred_location  -- leave any other values untouched
END
WHERE preferred_location IN (
  'מרכז', 'השרון', 'ירושלים', 'חיפה והקריות',
  'דרום', 'גליל עליון', 'גליל תחתון', 'שפלה'
);
