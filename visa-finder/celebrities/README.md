# Celebrity images for Spouse Taste Test

Add celebrity images here:

- **male/** — Images for male celebrities (e.g. `1.jpg`, `2.jpg`)
- **female/** — Images for female celebrities (e.g. `1.jpg`, `2.jpg`)

Then add entries to `src/lib/celebrities.ts`:

```ts
male: [
  { id: "m1", name: "Celebrity Name", image: "/celebrities/male/1.jpg" },
],
female: [
  { id: "f1", name: "Celebrity Name", image: "/celebrities/female/1.jpg" },
],
```
