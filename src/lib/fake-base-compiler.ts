import {
  ExecutionOptions,
} from '../types/compilation/compilation.interfaces.js';
import * as exec from './exec.js';

export class BaseCompiler {
  async exec(filepath: string, args: string[], execOptions: ExecutionOptions) {
    // Here only so can be overridden by compiler implementations.
    return await exec.execute(filepath, args, execOptions);
  }
}
