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
-   Support for [Hyron Framework](https://www.npmjs.com/package/hyron) by default

# Usage

> ## npm i @hyron/stringer

## **Note** : If used for other app

stringer can be used by another app if you want now

```js
const Stringer = require("@hyron/tringer");

var instance = new Stringer();
console.log("\nresult : \n" + instance.get("var_2", { name: "default var" }));
```

## If used as hyron fontware

After install, hyron will auto detect and load string file from ./strings directory

You should separate string into many files with name is language code. example :

```
strings
  ├── default.str
  ├── en.str
  ├── fr.str
  ...
```

To get string, used follow syntax

```js
your_method(){
    // ... do something
    var appName = this.$stringer.get('app_name');
}
```

# API Referenced

> ## **setLanguage**( lang ) : void

Set language default. if lang is null, string will read from default.json file. else, it will read from [lang].str

### **params**

- **lang** ( string ) : language code, it should be 2 digits. Example : en -> english, vi -> vietnamese. This code need coincides with the declared file in the strings directory

> ## **set**( key, val, lang? ) : string

set string as temporary

### **params**

- **key** ( string ) : string key, declared in .``str`` file
- **val** ( object ) : parameters passed in string value
- **lang** ( string ) : language code, declared in ``strings`` file

> ## **get** ( key, args? ) : string

### param :

-   **key** ( string ) : string args key name
-   **args** ( object - option ) : argument to fill to string
-   

Fill source string by target string. represent by ref <#[key]()>.
if ref followed by '+' ( <#[key]()+> ), string replaced will become uppercase.

If ref followed by '-' ( <#[key]()-> ), string replaced will become lowercase.

If ref is <?[var_name]()> then it will replaced by args.var_name
example :
./strings/default.str

```
---webside---
http://hyron.com

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
