const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

function minifyJsonFiles(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      minifyJsonFiles(filePath);
    } else if (file.endsWith('.json') && file !== 'package.json') {
      try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const minified = JSON.stringify(JSON.parse(raw));
        fs.writeFileSync(filePath, minified, 'utf8');
        console.log(`Minified: ${path.relative(distDir, filePath)} (${raw.length} -> ${minified.length} bytes)`);
      } catch (err) {
        console.error(`Failed to minify: ${filePath}`, err);
      }
    }
  }
}

function writePackageJson(subDir, type) {
  const targetDir = path.join(distDir, subDir);
  if (fs.existsSync(targetDir)) {
    const pkgPath = path.join(targetDir, 'package.json');
    fs.writeFileSync(pkgPath, JSON.stringify({ type }, null, 2) + '\n', 'utf8');
    console.log(`Created ${path.relative(distDir, pkgPath)} with type: ${type}`);
  }
}

function fixEsmFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fixEsmFiles(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;

      // 1. Fix static JSON imports to include "with { type: 'json' }"
      const staticJsonRegex = /(import\s+(?:[\w*\s{},]+)\s+from\s+['"][^'"]+\.json['"])(?!\s*with)/g;
      if (staticJsonRegex.test(content)) {
        content = content.replace(staticJsonRegex, "$1 with { type: 'json' }");
        changed = true;
      }

      // 2. Fix dynamic JSON imports to include "{ with: { type: 'json' } }"
      const dynamicJsonRegex = /import\s*\(\s*(['"][^'"]+\.json['"])\s*(?!\s*,)\)/g;
      if (dynamicJsonRegex.test(content)) {
        content = content.replace(dynamicJsonRegex, "import($1, { with: { type: 'json' } })");
        changed = true;
      }

      // 3. Fix relative imports missing .js extension or index.js
      content = content.replace(/(from\s+['"]|import\s*\(\s*['"])((\.\/|\.\.\/)[^'"]+)(['"])/g, (match, prefix, specifier, _, suffix) => {
        if (/\.(js|json|mjs|cjs)$/.test(specifier)) {
          return match;
        }
        const targetPath = path.resolve(path.dirname(filePath), specifier);
        if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
          changed = true;
          return `${prefix}${specifier.replace(/\/+$/, '')}/index.js${suffix}`;
        }
        if (fs.existsSync(targetPath + '.js')) {
          changed = true;
          return `${prefix}${specifier}.js${suffix}`;
        }
        changed = true;
        return `${prefix}${specifier}.js${suffix}`;
      });

      // 4. Fix any exports missing extension (e.g., export * from './utils')
      content = content.replace(/(export\s+(?:[\w*\s{},]+)\s+from\s+['"])((\.\/|\.\.\/)[^'"]+)(['"])/g, (match, prefix, specifier, _, suffix) => {
        if (/\.(js|json|mjs|cjs)$/.test(specifier)) {
          return match;
        }
        const targetPath = path.resolve(path.dirname(filePath), specifier);
        if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
          changed = true;
          return `${prefix}${specifier.replace(/\/+$/, '')}/index.js${suffix}`;
        }
        if (fs.existsSync(targetPath + '.js')) {
          changed = true;
          return `${prefix}${specifier}.js${suffix}`;
        }
        changed = true;
        return `${prefix}${specifier}.js${suffix}`;
      });

      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ESM specifiers in: ${path.relative(distDir, filePath)}`);
      }
    }
  }
}

console.log('Minifying JSON assets in dist folder...');
minifyJsonFiles(distDir);
console.log('JSON minification complete!');

console.log('Writing package.json markers for ESM and CommonJS outputs...');
writePackageJson('esm', 'module');
writePackageJson('react/esm', 'module');
writePackageJson('cjs', 'commonjs');
writePackageJson('react/cjs', 'commonjs');
console.log('Package markers complete!');

console.log('Post-processing ESM output...');
fixEsmFiles(path.join(distDir, 'esm'));
fixEsmFiles(path.join(distDir, 'react/esm'));
console.log('ESM post-processing complete!');
