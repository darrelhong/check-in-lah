import { defineConfig, presetUno } from 'unocss';
import { presetForms } from '@julr/unocss-preset-forms';

export default defineConfig({
	presets: [presetUno(), presetForms()],
	shortcuts: {
		btn: 'px-4 py-2 rounded-lg disabled:opacity-75 bg-blue-600 text-white',
		input: 'px-4 py-2 bg-slate-200 rounded-lg border-transparent'
	}
});
