const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, 'public/images/containers');
const outPath = path.join(__dirname, 'components/ContainerIllustration.tsx');

const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));

let components = `import React from 'react';\n\n`;
let switchCases = ``;

files.forEach(file => {
  let content = fs.readFileSync(path.join(svgDir, file), 'utf-8');
  
  const svgMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (!svgMatch) return;
  
  let inner = svgMatch[1];
  
  // Replace kebab-case to camelCase
  inner = inner.replace(/([a-z]+)-([a-z]+)=/g, (match, p1, p2) => p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + "=");
  // Re-run for cases like font-variant-numeric -> fontVariantNumeric
  inner = inner.replace(/([a-z]+)-([a-z]+)=/g, (match, p1, p2) => p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + "=");
  
  inner = inner.replace(/class=/g, 'className=');

  const componentName = file.replace('.svg', '').split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Icon';
  // If starts with number, prepend Svg
  const validName = /^[0-9]/.test(componentName) ? 'Svg' + componentName : componentName;

  components += `export function ${validName}(props: React.SVGProps<SVGSVGElement>) {\n`;
  components += `  return (\n`;
  components += `    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" {...props}>\n`;
  components += `      ${inner}\n`;
  components += `    </svg>\n`;
  components += `  );\n`;
  components += `}\n\n`;

  switchCases += `    case "/images/containers/${file}":\n`;
  switchCases += `      return <${validName} {...props} />;\n`;
});

components += `export function ContainerIllustration({ image, className }: { image: string; className?: string }) {\n`;
components += `  const props = { className, role: "img", "aria-hidden": true };\n`;
components += `  switch (image) {\n`;
components += switchCases;
components += `    default:\n`;
components += `      return null;\n`;
components += `  }\n`;
components += `}\n`;

fs.writeFileSync(outPath, components);
console.log('Generated components/ContainerIllustration.tsx');
