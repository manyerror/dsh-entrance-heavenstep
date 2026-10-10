# Animation preview

## This project (Heavenstep)

These files are browser-rendered demonstrations of **this** entrance, captured from the
repository's local preview page in headless Chromium via Playwright video recording
(1280 × 720), then encoded with ffmpeg. They contain no private DSH workspace or chat content.

| File | Content | Encoding |
| --- | --- | --- |
| `heavenstep-preview.jpg` | Settled scene, 1280 × 720 | JPEG still frame |
| `heavenstep-entrance.gif` | The layered entrance, 720 × 405 | 3.2 s at 8 fps, 64-colour palette, Bayer dithering |
| `heavenstep-water-exit.gif` | The water-ripple handoff into the workspace, 720 × 405 | 2.4 s at 8 fps, same palette settings |

These are browser captures, **not** native DSH screen recordings and not native-performance
benchmarks. They contain the user-provided hero artwork
(`lib/assets/entrance/20261010/hero.jpg`); no C2PA record was read or asserted for that image
here, and its underlying provenance and rights are not established by this repository.
The media files are **excluded from the MIT software license**; see
[LICENSE-ASSETS](../../LICENSE-ASSETS). Replace them with material you are entitled to use
before redistributing or publishing this version.

## Upstream example (`demo.gif`)

`demo.gif` is the **upstream** `dsh-entrance` demonstration and belongs to the original
example artwork. This entrance does not reference it; it is retained for reference only.

`demo.gif` shows the upstream plugin modules rendered in Chromium on the repository's local
preview page. It includes the layered entrance, overlapping fish leaps, and the complete
2.2-second water-ripple exit into the example workspace. It contains no private DSH workspace
or chat content.

The 720 × 450 preview is sampled at 10 frames per second for 8.1 seconds and encoded with
Pillow using a shared 256-color palette. Identical frames are combined without changing the
duration. The JavaScript animation clock is controlled for capture; the workspace's browser
animation is aligned to the same exit timeline. This is a browser-rendered demonstration, not
a native DSH screen recording or a native-performance benchmark.

Artwork and character attribution follow [NOTICE.md](../../NOTICE.md).

This GIF is **excluded from the MIT software license**, and this repository grants
no artwork license in it; see [LICENSE-ASSETS](../../LICENSE-ASSETS). It contains
AI generated or edited example artwork and the third-party character Yoimiya
(miHoYo / HoYoverse). Disclose the AI generated artwork when publishing this GIF
or recordings containing it, and use the platform's applicable AI labeling
controls. The source PNGs' C2PA records are not automatically inherited by a
browser capture or GIF conversion. This is an unofficial community demonstration.
