/**
 * Performs a logical not operation of other predicates used within a query.
 * @param predicates A predicate whose result with be negated.
 * @returns Returns the predicate to be used within a query where method.
 */
export declare function not(predicate: (row: number) => boolean): (row: number) => boolean;
