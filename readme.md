# Stringer

Stringer is lightweight fontware, used to separate string into string file (.str).
It makes your source code cleaner, reusable in many files, and supports multiple languages.

## Syntax

```
// this is comment
---var_1---
string_content

---var_2---
another_content
```

## Feature

- Human read-able syntax
- Key - Value base
- Optimized for storage string text in file
- Support bind var or load another var
- Support for comment with syntax : '// comment content'
- Support for another app
- Support for [Hyron Framework](https://www.npmjs.com/package/hyron) by as a global fontware plugins

## Usage

### Step 1: Installation

By **NPM**:

```shell
npm i @hyron/stringer
```
By **YARN**:

```shell
yarn add @hyron/stringer
```
### Step 2: Declare string values

By default, **stringer** will loads strings from files with **.str** extension in **./strings** directory. And you should use two characters of the language as the filename. _(e.g: vi.str)_

Beside, **stringer** also expects you to profile the fallback file **default.str**.

**Stringer** also has multi languages support, you could use it to store translated strings. Here is an example of strings directory:

```
./strings
  ├── default.str
  ├── en.str
  ├── fr.str
  ...
```

### Step 3: Use stringer

**Stringer** can be used by another app if you want like another library

```js
const Stringer = require("@hyron/stringer");
var stringer = new Stringer();
var printMe = stringer.get("print_my_name", {
    myName : "thangdjw"
});
console.log(printMe);
// TODO: Output here
```

### You are using [Hyron framework](https://www.npmjs.com/package/hyron)?

> **stringer** is a `fontware` used to load strings from the 'this' variable.

With **Hyron framework**, you don't need to explicitly load it.
After install, **Hyron framework** will tries to detect and loads string files from **./strings** directory, and you can used stringer in every declared services.

To get string value, you can use follow syntax:

```js
your_method(){
    // do something useful
    var appName = this.$stringer.get('key_name');
}
```

## API References

#### .setLanguage(lang): void

Set default language. If lang is null, string will be read from **default.json** file. Otherwise, it will be read from **<lang>.str**

**Parameters**

- `lang` _(string)_: language code, it should be exactly two letters. Example: en -> english, vi -> vietnamese. You should ensure that the used language are well reclared in **./strings** directory. For more conventional, you should use country codes defined by *ISO 3166-1 alpha-2*.

#### .set(key, val, lang?): void

Temporarily set string in runtime. The original file is left intact.

**Parameters**

- `key` _(string)_: string key, declared in `.str` file.
- `val` _(object)_: parameters passed in string value.
- `lang` _(string)_: language code, declared in string files.

#### .get (key, args?): string

Fill source string by target string.

Stringer support internal reference represent with syntax: `#[abort-key-name]()`.

- To **UPPERCASE** string, postfix it by a '+' character: `#[abort-key-name]()+`.
- To **lowercase** string, postfix it by a '-' character: `#[abort-key-name]()-`.

Stringer support external reference represent with syntax : `?[var-name]()`. Stringer will replaced this by `args.var_name` with this method.

**Parameters**

- `key` _(string)_: string args key name.
- `args` _(object)_: argument to fill into string.

**Return value**

- _string_: a string that have been filled by args

## Examples

Given **./strings/default.str** file:

```
---webside---
http:\/\/hyron.com

// used to send to user
---email_content---
Dear <?client_name>

Thank you because the registered service of our own at website <#website>
We will constantly improve the quality of our services, to bring satisfaction to you. Hope you like it

<?signature>
```

In **main.js** you could use:

```js
var message = this.$stringer.get("email_content", {
    signature: "THANGPHUNG",
    client_name: "Alex"
});
```

The output

```
Dear Alex

Thank you because the registered service of our own at website http://hyron.com
We will constantly improve the quality of our services, to bring satisfaction to you. Hope you like it

THANGPHUNG
```
