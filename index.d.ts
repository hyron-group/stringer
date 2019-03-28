declare class Stringer {
    /**
     * Fill source string by target string.
     * 
     * Stringer support internal reference represent with syntax : <#[abort-key-name]()>.
     * 
     * - To **Uppercase** string, used followed by '+' char ( <#[abort-key-name]()+> )
     * - To **Lowercase** string, used follow by '-' char ( <#[abort-key-name]()-> )
     * 
     * Stringer support external reference represent with syntax : <?[var-name]()>. Stringer will replaced this by args.var_name with this method
     * 
     * ### param :
     * -   **key** ( string ) : string args key name
     * -   **args** ( object - option ) : argument to fill to string
     * 
     * ### **return**
     * - **string** : a string that have been filled by args
     */
    get(key: string, args: object): string;

    /**
     * set string like temporary in runtime
     * 
     * ### **params**
     * - **key** ( string ) : string key, declared in .``str`` file
     * - **val** ( object ) : parameters passed in string value
     * - **lang** ( string ) : language code, declared in ``strings`` file

     */
    set(key: string, val: string, lang?: string): void;

    /**
     * Set language default. if lang is null, string will read from default.json file. else, it will read from [lang].str
     * 
     * ### **params**
     * - **lang** ( string ) : language code, it should be 2 digits. Example : en -> english, vi -> vietnamese. This code need coincides with the declared file in the strings directory
     */
    setLanguage(lang: string): void;
}

export = Stringer;