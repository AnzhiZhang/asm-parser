import {AsmParser} from "./src/lib/asm-parser.js";
import {BaseCompiler} from "./src/lib/fake-base-compiler.js";
import {CppDemangler} from "./src/lib/demangler/cpp.js";
import {ParsedAsmResult} from "./src/types/asmresult/asmresult.interfaces.js";
import {
  ParseFiltersAndOutputOptions
} from "./src/types/features/filters.interfaces.js";

const baseCompiler = new BaseCompiler();
const cppDemangler = new CppDemangler("c++filt", baseCompiler);
const asmParser = new AsmParser();

const args = process.argv;
const filters: ParseFiltersAndOutputOptions = {
  labels: args.includes("--unused_labels"),
  libraryCode: args.includes("--library_code"),
  directives: args.includes("--directives"),
  commentOnly: args.includes("--comment_only"),
  binary: args.includes("--binary"),
  binaryObject: args.includes("--binary")
};

function resultToText(r: ParsedAsmResult) {
  return r.asm.map(line => line.text).join('\n');
}

const stdin = process.openStdin();
let data = "";

stdin.on("data", function (chunk) {
  data += chunk;
});

stdin.on("end", async function () {
  let result = asmParser.process(data, filters);

  result = await cppDemangler.process(result);
  console.log(resultToText(result));
});
