# Anton's Story Quest (asq)

A reading app for Anton (8). He picks a book, reads one short chapter (75–100 words), then
answers two questions about it. Correct answers earn Robux, which a parent pays out for real.

## How it works

- **Bookshelf**: five books (Dinosaurs, Trains, Big Machines at Work, the Universe, Volcanoes),
  five chapters each, with a progress bar per book.
- **Reading**: big, easy-to-read font (Atkinson Hyperlegible). Tap any word to hear it (browser
  speech synthesis).
- **Questions**: two multiple-choice questions per chapter, answers shuffled. He can open the story
  again while answering. A wrong answer gets a second try; after two wrong tries the answer is shown.
- **Stars**: 3 stars if every question was right first try, 2 if some, 1 otherwise. Best result is kept.
- **Robux**: 5 R$ for a first-try answer, 2 R$ on the second try (both adjustable). Each question
  pays only once, so re-reading is for practice. All 25 chapters are worth 250 R$ at the default rate.

### Robux payout

Roblox has no way for an app to send Robux to a child's account, so the app keeps a balance and
a parent pays it out: buy Robux (a Roblox gift card, or in the Roblox app), then open
**👪 Parents** at the bottom of the page (a multiplication question keeps Anton out), enter the
amount and press **Mark as paid**. The parent page also shows totals, a history and the reward rates.

Progress lives in the browser's local storage, so it is per device and per browser.

## The texts

The chapters are written for this app, at a second-grade reading level, so they can live in a
public repository. Copyrighted children's books can't be copied in, and public-domain books (e.g.
on Project Gutenberg) are too old: hard language and outdated science (dinosaurs especially).

Add a book by appending to `BOOKS` in `books.js`: each chapter has `title`, `text` (blank lines
separate paragraphs) and `questions`, where the **first** choice is the correct one.

Real books on the same topics to read together:

- *Dinosaurs* by Kathleen Weidner Zoehfeld (National Geographic Readers)
- *Planets* by Elizabeth Carney (National Geographic Readers)
- *Volcanoes* by Anne Schreiber (National Geographic Readers)
- *Dinosaurs Before Dark* by Mary Pope Osborne (Magic Tree House #1)

## Running locally

No build step: open `index.html` in a browser, or `python3 -m http.server` and visit
http://localhost:8000.

## Deploying on the home cluster

asq runs on the home k3s cluster (platform repo `~/workspace/k8s`) as a static site served by
nginx, in namespace `asq`, at http://computer.local:8082 for the LAN and WireGuard.

```sh
deploy/deploy.sh
```

The script refuses to run with uncommitted changes. It builds the image for the last commit outside
`k8s/`, pushes it to the cluster registry as `localhost:5000/asq:git-<commit>`, sets that tag in
`k8s/kustomization.yaml` and applies `k8s/`. Commit the tag change afterwards.

The pod needs no internet, so the namespace has default deny plus DNS and doesn't use the egress
proxy. The fonts come from Google Fonts in the browser; without internet the page falls back to the
system font.
