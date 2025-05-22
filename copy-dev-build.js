const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  console.log("src exist", src, fs.existsSync(src))
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child =>
      copyRecursiveSync(path.join(src, child), path.join(dest, child))
    );
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Map build folders to expected root paths
const paths = {
  'build/cjs': 'cjs',
  'build/esm5': 'esm5',
  'build/esm2015': 'esm2015',
  'build/types': 'types',
};

Object.entries(paths).forEach(([src, dest]) => {
  copyRecursiveSync(path.resolve(__dirname, '.', src), path.resolve(__dirname, '.', dest));
});