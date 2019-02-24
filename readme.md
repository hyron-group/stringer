# Introduction

Stringer is lightweight fontware, used to separate string into string file (.str)
It makes your source code cleaner, reusable in many files, and supports multiple languages

syntax :

```
// this is comment
---var_1---
string_content

---var_2---
another_content
```

# Feature

-   Human read-able syntax
-   Key - Value base
-   Optimized for storage string text in file
-   Support bind var or load another var
-   Support for comment with syntax : '// comment content'
-   Support for another app
-   Support for [Hyron Framework](https://www.npmjs.com/package/hyron) by as a global fontware plugins

# Usage

## **Step 1 : Install**

With **NPM** :
```
npm i @hyron/stringer
```
With **YARN** :
```
yarn add @hyron/stringer
```

## **Step 2 : Declare string values**

By default, hyron will load string from ``strings`` dir with file extendsion is `.str`. And file name you should to used language code with 2 character.

Besides, stringer also needs to declare the file **default.str** to used. The variable in this file will be loaded automatically at runtime, or if the language is incorrectly set

Stringer also support for multi language, you could used it for store translate value inside


```
./strings
  ├── default.str
  ├── en.str
  ├── fr.str
  ...
```

## **Step 3 : Use stringer**

Stringer can be used by another app if you want like another library

```js
const Stringer = require("@hyron/stringer");

var stringer = new Stringer();

var printMe = stringer.get("print_my_name", {
    myName : "thangdjw"
})

console.log(printMe);
```

### **If used from [Hyron framework](https://www.npmjs.com/package/hyron)**

> ### **stringer** is a ``fontware`` used to load strings from the 'this' variable.

With the hyron framework, you don't need to declare to use.

After install, Hyron will auto detect and load string file from ./strings directory, and you can used stringer in every service declared

To get string, used follow syntax

```js
your_method(){
    // do something useful
    var appName = this.$stringer.get('key_name');
}
```

# API Referenced

> ## **setLanguage** ( lang ) : void

Set language default. if lang is null, string will read from default.json file. else, it will read from [lang].str

### **params**

- **lang** ( string ) : language code, it should be 2 digits. Example : en -> english, vi -> vietnamese. This code need coincides with the declared file in the strings directory

> ## **set** ( key, val, lang? ) : void

set string like temporary in runtime

### **params**

- **key** ( string ) : string key, declared in .``str`` file
- **val** ( object ) : parameters passed in string value
- **lang** ( string ) : language code, declared in ``strings`` file

> ## **get** ( key, args? ) : string


Fill source string by target string.

Stringer support internal reference represent with syntax : <#[abort-key-name]()>.

- To **Uppercase** string, used followed by '+' char ( <#[abort-key-name]()+> )
- To **Lowercase** string, used follow by '-' char ( <#[abort-key-name]()-> )

Stringer support external reference represent with syntax : <?[var-name]()>. Stringer will replaced this by args.var_name with this method

### param :

-   **key** ( string ) : string args key name
-   **args** ( object - option ) : argument to fill to string

### **return**

- **string** : a string that have been filled by args


# Example

example :
./strings/default.str

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

main.js

```js
var message = this.$stringer.get("email_content", {
    signature: "THANGPHUNG",
    client_name: "Alex"
});
/*
`Dear Alex

Thank you because the registered service of our own at website http://hyron.com
We will constantly improve the quality of our services, to bring satisfaction to you. Hope you like it

THANGPHUNG
`
*/
```
