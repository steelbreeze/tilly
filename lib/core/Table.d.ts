import { Operator, Row } from './types';
import { Column } from './Column';
import { Query } from './Query';
/**
 * Represents a table of data, comprising a number of columns.
 */
export declare class Table {
    readonly name: string;
    /** All the columns within the table */
    readonly columns: Array<Column>;
    /**
     * Creates a new instance of the Table class.
     * @param name The name of the table.
     * @param table Another table to copy as a baseline or JSON rendering of a table.
     */
    constructor(name: string, table?: Table);
    /**
     * Adds one or more columns to the table
     * @param columns The new columns to add.
     */
    add(...columns: Array<Column>): void;
    /**
     * Adds a new row of data to the table
     * @param data The row of data to add
     * @returns Returns the row index within the table
     */
    insert(row: Row): void;
    /**
     * Returns the number of rows within the table.
     */
    get rows(): number;
    /**
     * Gets a row for a given index.
     * @param index The index of the row.
     * @param columns The columns from the table to return in the row.
     * @return Returns the row of data
     */
    row(index: number, columns: Array<Column>): Row;
    /**
     * Returns all the row within the table; a row being the columns specified, or if not specified, all colunms.
     * @param columns The columns from the table to return in the row; if omitted, returns all columns.
     */
    select(...columns: Array<Column>): IterableIterator<Row>;
    /**
     * Creates a query to filter the contents of a table based on a predicate.
     * @param operator An Operator object that creates the filter predicate at query execution time.
     */
    where(operator: Operator<number>): Query;
    /**
     * Returns the indexes of all rows in the table with an optional filter criteria.
     * @private
     */
    indexes(operator?: Operator<number>): IterableIterator<number>;
}
