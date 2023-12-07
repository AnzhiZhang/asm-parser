# asm-parser

> This repo is extracted from [compiler-explorer](https://github.com/compiler-explorer/compiler-explorer)
>
> I only included the cpp demangler, PR is welcomed.

Categorises and filters assembly in a way that's understood by Compiler Explorer.

Possible filters as command line parameters:

* `--binary` changes to the Binary mode filtering that's based on the assembly output from GNU Objdump
* `--unused_labels` try to filter out functions that aren't strongly used
* `--directives` filter out .directives
* `--library_code` try to filter out functions that belong in other libraries that are used (filtering is based on filepaths)
* `--comment_only` filter out comments

## Example usage

The filename has to be `example.*`

Feeding an objdump via stdin into asm-parser:

```bash
gcc -g -S -masm=intel -o - example.cpp | npm run --silent parse -- --unused_labels --library_code --directives --comment_only > example.asm
```

```bash
gcc -g -S -masm=intel -o - example.cpp | asm-parser-win.exe --unused_labels --library_code --directives --comment_only > example.asm
gcc -g -S -masm=intel -o - example.cpp | ./asm-parser-linux --unused_labels --library_code --directives --comment_only > example.asm
gcc -g -S -masm=intel -o - example.cpp | ./asm-parser-macos --unused_labels --library_code --directives --comment_only > example.asm
```
