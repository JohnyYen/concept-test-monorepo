const fs = require("fs")
const path = require("path")

const packageName = process.argv[2]

if (!packageName) {
  console.error("❌ Debes pasar el nombre del package")
  process.exit(1)
}

const srcDir = path.join(process.cwd(), "packages", packageName)

if (!fs.existsSync(srcDir)) {
  console.error("❌ No existe carpeta src en:", srcDir)
  process.exit(1)
}

const folders = fs.readdirSync(srcDir, { withFileTypes: true })
  .filter(f => f.isDirectory())
  .map(f => `./${f.name}`)

const content =
  folders.map(f => `export * from '${f}'`).join("\n") + "\n"

fs.writeFileSync(path.join(srcDir, "index.ts"), content)

console.log(`✔ Barrel generado para ${packageName}`)