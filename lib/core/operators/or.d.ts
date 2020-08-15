import { Predicate } from '../types';
/**
 * Performs a logical or operation of other predicates used within a query.
 * @param predicates An arbitory number of predicates, any of which can return true for this predicate to return true.
 * @returns Returns the predicate to be used within a query where method.
 */
export declare function or(...predicates: Array<Predicate<number>>): Predicate<number>;
