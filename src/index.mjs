import plugin from './plugin.mjs';

import js from './configs/js.mjs';
import ts from './configs/ts.mjs';
import wxMp from './configs/wx-mp.mjs';
import uni2 from './configs/uni2.mjs';
import vue2 from './configs/vue2.mjs';
import vue3 from './configs/vue3.mjs';

plugin.configs = {
  js,
  ts,
  wxMp,
  uni2,
  vue2,
  vue3,
};

export default plugin;
