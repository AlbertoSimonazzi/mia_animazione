# 📁 Cartella PNG Components

Questa cartella contiene le immagini PNG trasparenti dei componenti 3D, esportate dai modelli GLB.

## 🎯 Come Generare i PNG

### Passo 1: Apri PNG Exporter
```
http://localhost/mia_animazione/png-exporter.html
```

### Passo 2: Configura Export
- **Vista**: Isometrica 30° (consigliato per stile VISIOTT)
- **Risoluzione**: 1024x1024 (default)
- **Background**: Trasparente

### Passo 3: Esporta
- Click su **"Esporta Tutti i PNG"** per batch automatico
- Oppure esporta singolarmente ogni componente
- I file vengono scaricati automaticamente

### Passo 4: Salva qui
Sposta tutti i PNG in questa cartella:
```
images/components/
├── 70000001.png
├── 70000002.png
├── 70000003.png
├── 70000004.png
├── 70000006.png
├── 70000008.png
└── 70000010.png
```

## 📝 File Richiesti

| File | Descrizione |
|------|-------------|
| 70000001.png | Componente 1 |
| 70000002.png | Componente 2 |
| 70000003.png | Componente 3 |
| 70000004.png | Componente 4 |
| 70000006.png | Componente 5 |
| 70000008.png | Componente 6 |
| 70000010.png | Componente 7 |

**Totale**: 7 file PNG (nota: 70000005, 07, 09 non esistono)

## ⚙️ Specifiche Consigliate

### Dimensioni
- **Risoluzione**: 1024x1024 pixels
- **Formato**: PNG con alpha channel (trasparenza)
- **Peso**: ~100-200KB per file (compressi)

### Vista Camera
- **Isometrica 30°**: Vista tecnica professionale (come VISIOTT)
- **Frontale**: Vista piatta semplice
- **Custom**: Personalizza rotazione nel tool

### Qualità
- **Anti-aliasing**: Attivo (bordi smooth)
- **Lighting**: Ottimizzato per flatness
- **Trasparenza**: Background alpha 100%

## 🚀 Utilizzo PNG

Una volta generati, i PNG vengono usati da:

1. **animation-2d-simple.html** - Animazione CSS/JS base
2. **animation-2d-lottie-ready.html** - Export per Lottie/After Effects

## ❓ Troubleshooting

### "PNG non vengono scaricati"
- Controlla permessi browser per download automatici
- Usa browser moderno (Chrome, Firefox, Edge)
- Prova export singolo invece di batch

### "PNG hanno sfondo nero"
- Verifica "Background: Trasparente" nel tool
- Controlla che il browser supporti alpha channel

### "Qualità PNG bassa"
- Aumenta risoluzione a 2048x2048
- Verifica che anti-aliasing sia attivo
- Riprova export con zoom diverso

## 📖 Link Utili

- [PNG Exporter Tool](../../png-exporter.html)
- [Animazione 2D Simple](../../animation-2d-simple.html)
- [Lottie Export](../../animation-2d-lottie-ready.html)
- [Guida Lottie](../../LOTTIE-GUIDE.md)
