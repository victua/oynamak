// Builds the sports-icon pattern tiles (Tabler Icons, MIT) into public/images.
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync } from 'node:fs';
import {
  IconBallFootball, IconBallAmericanFootball, IconRun, IconBallBasketball,
  IconBallVolleyball, IconCricket, IconSwimming, IconBallTennis,
} from '@tabler/icons-react';

const icons = [IconBallFootball, IconBallAmericanFootball, IconRun, IconBallBasketball, IconBallVolleyball, IconCricket, IconSwimming, IconBallTennis];
const rot = Array.from({ length: 25 }, (_, i) => ((i * 37) % 41) - 20);
const T = 360, N = 5, step = T / N, size = 34;

function tile(color, opacity) {
  let body = '';
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const i = r * N + c;
    const Icon = icons[(r * 3 + c) % icons.length];
    const x = c * step + step / 2 + (r % 2) * (step / 2);
    const cx = x % T, cy = r * step + step / 2;
    const svg = renderToStaticMarkup(createElement(Icon, { size, stroke: 1.5, color }));
    const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    for (const dx of cx > T - size ? [-T, 0] : [0]) {
      body += `<g transform="translate(${cx + dx} ${cy}) rotate(${rot[i]}) translate(${-size / 2} ${-size / 2})" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${T}" height="${T}" viewBox="0 0 ${T} ${T}"><g opacity="${opacity}">${body}</g></svg>`;
}
writeFileSync('public/images/pattern-dark.svg', tile('#ffffff', 0.11));
writeFileSync('public/images/pattern-light.svg', tile('#0B2D61', 0.09));
console.log('ok');
