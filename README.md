# Oynamak Sports Group

Public marketing site plus the internal Operations console (`/ops`) for lead
management and in-place editing of the public pages.

Next.js 15 (App Router, `output: "standalone"`), Firebase Auth, Firestore.

## Running locally

```bash
npm install
npm run dev          # http://localhost:9002
```

No `.env` file is needed. The Admin SDK authenticates through Application
Default Credentials, so a one-off `gcloud auth application-default login` is
the only setup — the dev server then reads and writes live data.

## Checks

```bash
npm run typecheck    # tsc --noEmit — the build does NOT typecheck (see next.config.ts)
npm run check:pages  # fails if src/lib/site-pages.ts drifts from the real routes
npm run build        # note: this stops a running `npm run dev`
```

## Firebase

`tungacoke` is a **shared** Firebase project — its `(default)` Firestore
database carries another product's production data. Oynamak uses the named
`oynamak` database only, and `firebase.json` deliberately targets that database
so a misdirected rules deploy fails loudly instead of overwriting someone else's
rules.

```bash
firebase deploy --only firestore --project tungacoke
```

Access control is one rule: you can use the console if you have a
`users/{uid}` document with `status: 'Active'`. There is no self-signup and no
role model — accounts are minted only from `/ops/users` by someone already in.

## Deploying

Cloud Run in the `gonogasport` project, same as the other Tunga products:

```bash
gcloud builds submit --config cloudbuild.yaml --project gonogasport
```

Live at https://oynamak-uurxypxfoa-uc.a.run.app. When a custom domain is
mapped, update `_SITE_URL` in `cloudbuild.yaml` so `sitemap.xml`, `robots.txt`
and the Open Graph tags point at it.

The runtime service account (`488826928406-compute@developer.gserviceaccount.com`)
needs `roles/datastore.user` **and** `roles/firebaseauth.admin` on `tungacoke`
— without the latter every sign-in fails, since session cookies and user
management go through the Identity Toolkit.
