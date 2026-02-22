const fs = require("fs");
const path = require("path");

const root = process.cwd();

/* ---------------- HELPERS ---------------- */

function writeJSON(filePath, obj) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
    console.log("✔ Created:", filePath);
}

function appendIfMissing(filePath, lines) {
    if (!fs.existsSync(filePath)) {
        console.log("⚠ index.ts not found:", filePath);
        return;
    }

    let content = fs.readFileSync(filePath, "utf8");

    let changed = false;
    for (const line of lines) {
        if (!content.includes(line)) {
            content += "\n" + line;
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log("✔ Updated:", filePath);
    } else {
        console.log("✓ Already up to date:", filePath);
    }
}

function patchDartPubspec(pubspecPath) {
    if (!fs.existsSync(pubspecPath)) {
        console.log("❌ pubspec.yaml no encontrado:", pubspecPath);
        return;
    }

    let content = fs.readFileSync(pubspecPath, "utf8");

    // reemplazos seguros
    content = content
        .replace(/^name:\s*.*/m, "name: dart_client")
        .replace(/^description:\s*.*/m, "description: API client")
        .replace(/^version:\s*.*/m, "version: 1.0.0")
        .replace(/sdk:\s*['"].*?['"]/, 'sdk: ">=3.0.0 <4.0.0"');

    fs.writeFileSync(pubspecPath, content);
    console.log("✅ pubspec.yaml actualizado");
}

/* ---------------- PATHS ---------------- */

const apiStubsDir = path.join(root, "packages/api-stubs");
const nextClientDir = path.join(root, "packages/next-client");
const dartClientDir = path.join(root, "packages/dart-client");

/* ---------------- API STUBS ---------------- */

writeJSON(path.join(apiStubsDir, "package.json"), {
    name: "@workspace/api-stubs",
    version: "1.0.0",
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
        build: "tsc"
    },
    peerDependencies: {
        "@nestjs/common": "^10",
        rxjs: "^7"
    },
    devDependencies: {
        "@nestjs/common": "^11.1.14",
        rxjs: "^7.8.2",
        typescript: "^5"
    }
});

appendIfMissing(
    path.join(apiStubsDir, "index.ts"),
    [
        "export * from './api'",
        "export * from './controllers'",
        "export * from './models'"
    ]
);

/* ---------------- NEXT CLIENT ---------------- */

writeJSON(path.join(nextClientDir, "package.json"), {
    name: "@workspace/next-client",
    private: true,
    version: "1.0.0",
    scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start"
    }
});

/* ---------------- DART CLIENT ---------------- */

writeJSON(path.join(dartClientDir, "package.json"), {
    name: "@workspace/dart-client",
    private: true,
    version: "1.0.0",
    scripts: {
        dev: "dart run",
        build: "dart compile exe bin/main.dart"
    }
});

console.log("\n🚀 API setup complete.");

const dartClientPath = path.join(
  process.cwd(),
  "packages",
  "dart-client",
  "pubspec.yaml"
);

patchDartPubspec(dartClientPath);