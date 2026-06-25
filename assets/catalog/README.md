# Isler Product Image Catalog

Images extracted at **full original quality** directly from the three source Excel
workbooks supplied by the Isler team (not screenshots — pulled losslessly from the
files' embedded media):

- `final_Hobs_excel.xlsx`
- `non gas cooktops excel.xlsx`
- `Isler Gas Cooktops.xlsx`

**59 images total.** See `manifest.csv` for every file with its pixel dimensions and byte size.

## Folder structure

```
catalog/
├── hobs/
│   ├── good/            Model-mapped hob images (named by Isler model code)
│   ├── better/
│   ├── best/
│   ├── tablet-hobs/
│   └── _hero-photos/    31 high-resolution studio product shots (hob-01..31)
├── non-gas-cooktops/
│   ├── infrared/        Model-mapped (named by Isler model code)
│   └── _hero-photos/    5 hi-res shots (infrared / induction / hybrid) (cooktop-01..05)
├── gas-cooktops/        gas-cooktop-Domestic-3B / -4B
├── competitor-reference/  Competitor brand shots from the Excel comparison tables
├── manifest.csv
└── README.md
```

## Naming & mapping notes

- **Model-code names** (e.g. `IS-H3-Series-1002.png`) were derived by reading each
  picture's anchor position in the spreadsheet and matching it to the model code in
  that column. These are reliable. Where a model had multiple photos, a `-2` suffix is used.
- **`_hero-photos/`** are the premium high-res studio photographs (up to ~1500 px wide).
  They were embedded in the sheets without cell anchors, so they could **not** be
  auto-matched to a specific model code. They are named sequentially (`hob-01`, …).
  The Isler team can rename these to model codes by sight if needed.
- **`competitor-reference/`** images come from the "AMAZON" / brand-comparison sections
  of the workbooks (Hindware, Glen, Elica, Kaff, etc.) — kept for reference, named by
  source sheet + original cell anchor.
- **Gas cooktops** use Excel's newer image-in-cell format; the two images map to the
  `Domestic-3B` and `Domestic-4B` models.
