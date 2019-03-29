
[![Build status](https://ci.appveyor.com/api/projects/status/scqq323ay7cilq79?svg=true)](https://ci.appveyor.com/project/thangdjw/stringer)
![Gitter](https://img.shields.io/gitter/room/hyron-group/community.svg)
![npm](https://img.shields.io/npm/dm/@hyron/stringer.svg)


Stringer is lightweight library to separate ``string`` value from ``code``

## Feature

- Support for multi-language
- Human read-able syntax
- Support Internal Reference
- Support Passing Varable
- Support for Comment
- Support for [Hyron Framework](https://www.npmjs.com/package/hyron)


# Syntax

This syntax is applied in the .str file, which helps you define strings in the form of key-value.

.str file support multi-line, single comment line reference internal and load external variables except by the syntax below

```
# single comment line. it will be skip by compiler

---key_name---
string content bellow to next key or end of file

---var_1---
single line content

---var_2---
multi
line
content

---internal_reference---
<#var_1>

---var_loadable---
<?var_name>
```

# Usage

## Step 1: Installation

By **NPM**:
```shell
npm i @hyron/stringer
```

By **YARN**:

```shell
yarn add @hyron/stringer
```

## Step 2: Declare string values

By default, **stringer** will loads strings from files with **.str** extension in **./strings** directory.

You should use [language code](https://www.wikiwand.com/en/Language_code) to named file. _(e.g: vi.str for vietnamese)_

The stringer will load the file default.str by default, unless you [set the default language]()

Here is an example of strings directory:

```
/strings
  ├── default.str
  ├── en.str
  ├── vi.str
  ...
```

strings/default.str
```str
---say_my_name---
Hi, <?myName>
```

## Step 3: Use stringer

**Stringer** can be used by any app like other libraries:

```js
const Stringer = require("@hyron/stringer");
var stringer = new Stringer();

var printMe = stringer.get("say_my_name", {
    myName : "thangphung"
});

console.log(printMe);
// Hi, thangphung
```


### For [Hyron framework](https://www.npmjs.com/package/hyron)

You can use stringer as a plugins in the hyron framework. You just need to install it to use.

Stringer can be access by ``this.$stringer``

```js
sayMyName(){
    return this.$stringer.get('say_my_name');
}
```

# API References

> ## **setLanguage** ( lang ): void

Set default language. If lang is null, string will be read from **default.json** file. Otherwise, it will be read from **< lang >.str**

### **params**

- **lang** ( string ) : language code, that was used to named file in strings/ directory

> ##  **set** ( key, val, lang? ) : void

Temporarily set string in runtime. The original file is left intact.

### **params**

- **key** ( string ) : string key, declared in `.str` file.
- **val** ( string ) : parameters passed in string value.
- **lang** ( string ) : language code, declared in string files.

> ## **get** (key, args?): string

Fill source string by target string.

Stringer support internal reference represent with syntax: `<#abort-key-name>`.

- To **UPPERCASE** string, postfix it by a '+' character: `<#abort-key-name+>`.
- To **lowercase** string, postfix it by a '-' character: `<#abort-key-name->`.

Stringer support external reference represent with syntax : `<?var-name>`. Stringer will replaced this by `args.var_name` with this method.

### **params**

- **key** ( string ) : string args key name.
- **args** ( object ) : argument to fill into string.

### **return**

- **string** : a string that have been filled by args

# Examples

**strings/default.str**

```
---website---
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
var message = stringer.get("email_content", {
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
