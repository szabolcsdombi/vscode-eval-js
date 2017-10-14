# Evaluate selection in-place

![preview](preview.gif)

Evaluate selection **in-place** using safeEval in vscode.

## Commands

- Evaluate and replace selection
- Evaluate selection in global context

## Example

Paste the lines in an empty editor then select them. The extension is dealing only with the selected lines, **not** the entire file.

1. Run "Evaluate selection in global context" on the following lines.

```js
a = 1
b = 2
c = "hello"
```

2. Run "Evaluate and replace selection" on the following lines.

```js
1+1
a*10+b
c+"world"
i
i
i
```

3. You should get the following lines.

```js
2
102
helloworld
3
4
5
```

## Links

- [Github](https://github.com/cprogrammer1994/vscode-evaluate-selection-inplace)
- [Download page](https://marketplace.visualstudio.com/items?itemName=cprogrammer1994.eval-selection)
- [Change log](CHANGELOG.md)
