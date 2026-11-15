# Image prompts (Google Flow)

Generate each image, export as JPG/PNG, convert to WebP (~1600px wide, under 250 KB), save to `public/images/<file>.webp`, then set the path in `src/lib/site-images.ts`.

**Style prefix** (paste at the start of every prompt):
> Authentic documentary-style photograph, natural light, shallow depth of field, vibrant but realistic colour, deep navy blue and white accents with small touches of red in clothing and equipment, no text, no logos, no watermarks, no brand names.

**Always add to the end:** `Photorealistic, 35mm lens, high detail. Avoid: distorted hands, extra fingers, warped faces, garbled text, stock-photo posing.`

| Key | File | Ratio | Where it appears |
|---|---|---|---|
| hero | hero.webp | 16:9 | Home hero banner |
| about | about.webp | 3:4 | Home "About us" and About page hero |
| about2 | about2.webp | 3:4 | Home "About us" second tile |
| framework | framework.webp | 4:3 | Home "Our process" |
| leadership | leadership.webp | 4:5 | About page team cards |
| events | events.webp | 4:3 | Events page and cards |
| sol-products-equipment | sol-products-equipment.webp | 4:3 | Solution 01 |
| sol-strategic-partnerships | sol-strategic-partnerships.webp | 4:3 | Solution 02 |
| sol-international-exchange | sol-international-exchange.webp | 4:3 | Solution 03 |
| sol-sports-tourism | sol-sports-tourism.webp | 4:3 | Solution 04 |
| sol-sports-innovation | sol-sports-innovation.webp | 4:3 | Solution 05 |

## Prompts

**hero (16:9)**
A group of seven Kenyan youth footballers in navy blue and white kits standing together on a red-earth pitch at golden hour, smiling and confident, arms around each other, a grass stadium stand and acacia trees softly blurred behind them. Wide cinematic composition with empty space on the right.

**about (3:4)**
A Kenyan football coach in his 40s, wearing a navy tracksuit and a whistle, holding a clipboard and smiling as he looks at young players training behind him on a dusty community pitch in Nairobi, warm late-afternoon light.

**about2 (3:4)**
Close-up of a black African teenage girl footballer lacing her boots on the touchline, a worn white match ball beside her, navy kit, determined expression, soft morning light on a Kenyan school field.

**framework (4:3)**
Overhead and slightly angled view of a sports equipment table at an academy in Kenya: new white and navy match footballs, training cones, bibs, goalkeeper gloves and a laptop showing a team lineup, two African staff members reviewing a checklist together.

**leadership (4:5)**
Professional portrait of a confident Kenyan woman in her 30s in a navy blazer over a white shirt, standing at the edge of a football pitch with the stadium softly blurred behind, calm smile, natural light. (Generate four variations: a Kenyan man in his 40s, a Kenyan woman in her 30s, a Kenyan man in his 30s, a Kenyan woman in her 40s. Same style and background.)

**events (4:3)**
A lively youth football tournament in Kenya: two teams in navy and white versus red kits competing mid-action on a grass pitch, a crowd of spectators on a simple stand behind, scouts with clipboards at the touchline, bright midday light.

**sol-products-equipment (4:3)**
A Kenyan sports shop owner and a young footballer inspecting a brand-new white match ball in a bright warehouse with shelves of boots, kits and training gear in navy and white, both smiling.

**sol-strategic-partnerships (4:3)**
Four African sports administrators and club officials in smart-casual clothes shaking hands and signing a partnership document at a table beside a football pitch, a trophy and navy and white banners in the background, Nairobi skyline softly visible.

**sol-international-exchange (4:3)**
A mixed group of young African and international footballers and a coach on a training pitch, exchanging a team scarf, a bus with a "tour" feel parked behind, backpacks and travel bags, friendly interaction, golden light.

**sol-sports-tourism (4:3)**
A visiting international team in navy tracksuits training at high altitude in the Great Rift Valley in Kenya, green hills and a wide valley in the background, local Kenyan hosts in bright shukas welcoming them at the edge of the pitch, dramatic sky.

**sol-sports-innovation (4:3)**
A Kenyan analyst and a young athlete reviewing performance data on a tablet beside a track, a GPS tracker vest and a small drone camera visible, modern but grounded, evening floodlights, navy and white palette.

## Tips for Flow
- Generate 4 variations per prompt and keep the most natural-looking faces and hands.
- Keep kits plain navy, white or red so no real club or brand is implied.
- If faces look too polished, add: "slightly imperfect, candid, not posed".
- After each batch, tell me the file names and I will wire them into `site-images.ts`.
