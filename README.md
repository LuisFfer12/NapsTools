# NapsTools

Versão lite e 100% estática do [Triff.Tools](https://github.com/NarcisussX/Triff.Tools-Source), focada em wormhole PvE:

| Rota | Ferramenta |
|---|---|
| `#/sites` | **Wormhole PvE Sites** — waves, DPS, EHP, sig, special (scram/neut/web) e escalations de sites C1–C6 |
| `#/rolling-mass` | **Rolling Mass** — referência de massa para colapsar wormholes |
| `#/fits` | **C5 Ratting Fits** — Golem, Vargur, Paladin e Kronos (Marauders IV/V, com e sem dread), com EFT para copiar e screenshot |
| `#/bookmarks` | **Krab C5 Bookmarking Guide** — onde salvar o bookmark de warp-in em cada anomalia C5, com screenshot |
| `#/systems` | **W-Space Systems** — busca dos 2.603 J-systems (classe, efeito, statics com destino e massa, região, estrela, planetas e luas), com filtros e link direto `#/systems?j=J123456` |

Não tem backend, banco nem chamadas a API: tudo roda no navegador.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173/NapsTools/`.

## Deploy (GitHub Pages)

O workflow em `.github/workflows/deploy.yml` builda e publica a cada push na `main`.

Uma única vez, no GitHub: **Settings → Pages → Source → GitHub Actions**.

O site fica em `https://luisffer12.github.io/NapsTools/`.

> Se renomear o repositório, ajuste `base` em `vite.config.ts`.

## Manutenção

| O que mudar | Onde |
|---|---|
| Fits (após patch de balanceamento) | `src/data/fits.ts` — texto EFT e notas |
| Screenshots dos fits | `src/assets/fits/*.png` |
| Dados dos sites | `public/data/c{1..6}_{combat,datarelic}_sites_clean.json` |
| Bookmarks C5 (texto + imagens) | `src/data/bookmarks.ts` e `src/assets/bookmarks/` |
| Sistemas de wormhole | `public/data/systems.json` (gerado do `enriched_systems.json` do Triff.Tools) |
| Destinos/massa dos statics, efeitos | `src/data/wormholeTypes.ts` |
| Tabela de rolling mass | `src/pages/RollingMass.tsx` |

## Estrutura

```
public/data/          JSONs dos sites (C1–C6)
src/
  data/fits.ts        fits EFT + mapeamento das imagens
  assets/fits/        16 screenshots
  pages/              Home, WormholeSites, RollingMass, RoachFits
  components/         SiteCard, WaveTable, tool-ui
  styles/tool-v2.css  tema visual (herdado do Triff.Tools)
```

## Licença e créditos

GPL-3.0-or-later, a mesma do projeto original. Código, dados dos sites, fits e tema visual vêm do [Triff.Tools](https://github.com/NarcisussX/Triff.Tools-Source) de NarcisussX.

EVE Online e todo material relacionado são marcas registradas da CCP hf.
