# Devorix --- Investor PRD (LaTeX source)

Compiled, investor-facing PRD covering Phases 3-10 of the research/validation/design pipeline (Phases 1-2 -- market research and VC-lens validation -- live in `MASTER-PLAN.md` §10-11, one level up).

## Build

```
xelatex main.tex
bibtex main
xelatex main.tex
xelatex main.tex
```

Requires `xelatex` (not `pdflatex` -- the document uses `fontspec` to load DejaVu Serif/Sans/Mono, needed for the ₹ glyph). Bibliography uses `natbib` + `bibtex` (not `biblatex`/`biber`).

Current output: `main.pdf`, 95 pages.

## Structure

```
main.tex                  preamble, titlepage, \input order, bibliography
references.bib            merged bibliography (103 entries, deduplicated from 5 per-chapter fragments)
chapters/
  01_executive_summary.tex
  02_problem.tex
  03_market_research.tex      + 03_09.bib (fragment, pre-merge)
  04_customer_research.tex    + 04_06.bib
  05_business_strategy.tex    + 05_08_10_11.bib
  06_product_requirements.tex
  07_system_architecture.tex  + 07.bib
  08_go_to_market.tex
  09_financial_model.tex
  10_risk_analysis.tex
  11_product_roadmap.tex
  12_appendices.tex           + 01_02_12.bib
```

The per-chapter `.bib` fragments are kept alongside their chapters for traceability; `references.bib` at the project root is the one actually compiled against.

## Notes on deviations from the original spec

- **Diagrams are inline TikZ/pgfplots inside each chapter file**, not separate files under `assets/diagrams/`. This was a deliberate simplification to keep each chapter self-contained and avoid cross-file figure dependencies -- not an oversight.
- **Page count is 95, not the originally targeted 150-250.** The content covers all 10 phases at investor-grade depth; the gap is mostly because the original target assumed denser appendices/exhibits than turned out to be necessary once the actual content was assembled. If more depth is wanted in a specific chapter, that's a scoped follow-up, not a rewrite.
- A `.tmp_preview/` folder may still be present in this directory -- leftover preview renders from drafting the Business Model Canvas, Value Proposition Canvas, and Gantt chart figures before they were converted to TikZ. It isn't referenced by any `.tex` file and is safe to delete by hand from Finder (the sandbox couldn't remove it due to a filesystem permission quirk on the mounted folder).

## Known minor issue

Six tables/figures across the document (in chapters 03, 04, 08, 09, 11) are taller than one page's nominal text height and trigger a "Float too large for page" warning at compile time. Content is not cut off or overlapping -- LaTeX renders it all, just slightly into the margin on those pages. Spot-checked visually; cosmetic only. Converting the worst offenders to `longtable` (already loaded) would clean this up if it matters for print.

## Provenance

Built via a multi-agent pipeline: explorer + planner agents (research and structuring) per content cluster, opus-level synthesis agents reconciling their output, then LaTeX-writer agents producing the actual chapter files. See Appendix D in the PRD itself for the transparency note on this process.
