/* eslint-disable @typescript-eslint/no-var-requires */
import { compilerOptions } from './tsconfig.json';
import { register } from 'tsconfig-paths';

const baseUrl = './build';
register({
	baseUrl,
	paths: compilerOptions.paths,
});