import { defineConfig, presetUno } from 'unocss';
import { presetForms } from '@julr/unocss-preset-forms';

export default defineConfig({
	presets: [presetUno(), presetForms()],
	shortcuts: {
		btn: 'px-4 py-2 rounded-lg',
		input: 'px-4 py-2 bg-slate-200 rounded-lg border-transparent'
	}
});
