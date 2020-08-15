import { Queryable } from './Queryable';
import { Column } from './Column';
import { Predicate } from './types';

/**
 * Represents a query used to select a subset of the rows and columns of a table.
 */
export class Query extends Queryable {
	/**
	 * The predicate that this query will use to restrict the number of rows from source table.
	 */
	private predicate: Predicate;

	/**
	 * The columns that will be returned by this query.
	 */
	private allColumns: Iterable<Column>;

	/**
	 * Created a new instance of the query class.
	 * @param queryable Another queryable object to use as the source for this query.
	 */
	public constructor(private readonly source: Queryable) {
		super();

		this.predicate = (index: number) => true;
		this.allColumns = [];
	}

	/**
	 * Defines the columns that will be returned by this query.
	 * @param columns The set of columns from the underlying soure that will be returned by this query.
	 */
	public select(...columns: Column[]): this {
		this.allColumns = columns;

		return this;
	}

	/**
	 * Defines the filter critera that will be applied to rows retrieved from the source.
	 * @param predicate A boolean predicate built using the supplied column oriented predicates ([[equals]], [[list]], [[like]], [[and]], [[or]], etc.).
	 */
	public where(predicate: Predicate): this {
		this.predicate = predicate;

		return this;
	}

	/**
	 * Returns the set of columns that this query will return when executed.
	 */
	public columns(): Iterable<Column> {
		return this.allColumns;
	}

	/**
	 * Returns the row indices that this query will return when executed.
	 */
	public *indices(): Iterable<number> {
		for (const index of this.source.indices()) {
			if (this.predicate(index)) {
				yield index;
			}
		}
	}
}
